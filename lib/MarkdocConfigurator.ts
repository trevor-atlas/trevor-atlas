import React from 'react';
import Markdoc from '@markdoc/markdoc';
import {
  ConfigType as MarkdocWritableInternalConfig,
  NodeType,
  ConfigFunction,
  MaybePromise,
  RenderableTreeNodes,
  ValidationError,
  SchemaAttribute,
  Node,
  RenderableTreeNode
} from '@markdoc/markdoc/dist/src/types';

type Config = {
  nodes: NonNullable<Partial<Record<NodeType, MarkdocSchema>>>;
  tags: NonNullable<Record<string, MarkdocSchema>>;
  variables: NonNullable<MarkdocWritableInternalConfig['variables']>;
  functions: NonNullable<MarkdocWritableInternalConfig['functions']>;
  partials: NonNullable<MarkdocWritableInternalConfig['partials']>;
  validation: NonNullable<
    Required<MarkdocWritableInternalConfig['validation']>
  >;
};

type MarkdocSchema<R extends string = string> = {
  children?: string[];
  attributes?: Record<string, SchemaAttribute>;
  selfClosing?: boolean;
  inline?: boolean;
  transform?(node: Node, config: Config): MaybePromise<RenderableTreeNodes>;
  validate?(node: Node, config: Config): MaybePromise<ValidationError[]>;
} & (
  | {
      render: R;
    }
  | {
      render?: undefined;
    }
);

type ReactComponent = (...args: any[]) => JSX.Element | React.ComponentType;
type SchemaWithComponent = MarkdocSchema & { render: string };

export class MarkdocConfigurator {
  private static instance: MarkdocConfigurator;
  /*
   * this this is a map of:
   * the keys of the MarkdocConfig['nodes'] object (These are predefined by markdoc as 'heading', 'image', etc.)
   * The MarkdocConfig['tags'] objects 'render' property (These are user defined, and are the names of the Components that are used to render them)
   * -> TO a component. A Record<nodetypes & tags 'render' value, thing that will be rendered> */
  private components: Record<string, ReactComponent> = {};

  //@ts-ignore
  private config: Config = {
    // tags: {},
    // nodes: {},
    variables: {}
    // functions: {},
    // partials: {},
    // validation: {
    // validateFunctions: false
    // }
  };

  // Use this to get the MarkdocConfigurator instance
  public static getInstance(): MarkdocConfigurator {
    if (!MarkdocConfigurator.instance) {
      MarkdocConfigurator.instance = new MarkdocConfigurator();
    }
    return MarkdocConfigurator.instance;
  }

  private constructor(config: Partial<Config> = {}) {
    this.config = { ...this.config, ...config };
  }

  /**
   * https://markdoc.dev/docs/tags
   *
   * Add a Tag that renders a custom component.
   *
   * @param name the name to be used in your .md files to refer to this tag
   * @param tagDef the definition of the tag (children, attributes, etc.)
   * @param component the component to be rendered
   * @returns this MarkdocConfigurator
   * @throws Error if the tag already exists
   * @throws Error if the tag name is not valid
   * @throws Error if the tag name is already a Node
   * @example
   * import { MarkdocConfigurator } from '@markdoc/react';
   * import { MyComponent } from './MyComponent';
   *
   * const configurator = MarkdocConfigurator.getInstance();
   * configurator.addTag('mytag', {  }, MyComponent);
   *
   * // in your .md file:
   * {% mytag %}
   * ...
   * {% mytag /%} */
  public addTag = (
    name: Lowercase<string>,
    tagDef: Omit<MarkdocSchema, 'render'>,
    component: ReactComponent
  ): MarkdocConfigurator => {
    const componentName: string =
      typeof component === 'function'
        ? component.name
        : // @ts-expect-error - get the name of a class component
          component.constructor.name;
    const tag: SchemaWithComponent = {
      ...tagDef,
      render: componentName
    };
    this.config.tags[name] = tag;
    this.components[tag.render] = component;
    return this;
  };

  /**
   * https://markdoc.dev/docs/nodes
   *
   * Add a Node that renders basic HTML elements. (no custom components)
   *
   * Nodes are elements that Markdoc inherits from Markdown.
   * Nodes enable you to customize how your document renders without using any custom syntax—it consists entirely of Markdown.
   * @param name NodeTypes are the names of the nodes that are predefined by Markdoc. E.G. 'heading', 'image', etc.
   * @param nodeDef the definition of the node
   * @example addNode('image', {...})
   * enables custom code for images -> ![My alt](https://some-image/path) */
  public addNode = (
    name: NodeType,
    nodeDef: Omit<MarkdocSchema, 'render'>
  ): MarkdocConfigurator => {
    this.config.nodes[name] = nodeDef;
    return this;
  };

  /**
   * https://markdoc.dev/docs/nodes
   *
   * Add a Node that renders a React Component.
   *
   * Nodes are elements that Markdoc inherits from Markdown.
   * Nodes enable you to customize how your document renders without using any custom syntax—it consists entirely of Markdown.
   * @param name NodeTypes are the names of the nodes that are predefined by Markdoc. E.G. 'heading', 'image', etc.
   * @param nodeDef the definition of the node
   * @param component the component to be rendered for this node
   * @example addNode('fence', {...}, CodeHighlighter)
   * enables custom code highlighting for markdoc fences -> ```ts const thing = {}``` */
  public addComponentNode = (
    name: NodeType,
    nodeDef: Omit<MarkdocSchema, 'render'>,
    component: ReactComponent
  ): MarkdocConfigurator => {
    const componentName: string =
      typeof component === 'function'
        ? component.name
        : // @ts-expect-error - get the name of a class component
          component.constructor.name;
    const node: SchemaWithComponent = { ...nodeDef, render: componentName };
    this.config.nodes[name] = node;
    this.components[node.render] = component;
    return this;
  };

  /**
   * https://markdoc.dev/docs/variables
   *
   * Add a variable for use in your markdown files
   * @param name variable name
   * @param variable variable value
   * @returns this MarkdocConfigurator
   * @example
   * setVariable('a', 1) -> {% if $a %} ... {% endif %}
   */
  public setVariable = (name: string, variable: any): MarkdocConfigurator => {
    this.config.variables[name] = variable;
    return this;
  };

  /**
   * https://markdoc.dev/docs/functions#and/or/not
   *
   * @param name string
   * @param fn Function
   * @returns this MarkdocConfigurator
   * @example
   * addFunction('and', (a, b) => a && b) -> {% if and($a, $b) %} ... {% endif %}
   * addFunction('or', (a, b) => a || b) -> {% if or($a, $b) %} ... {% endif %} */
  public addFunction = (
    name: string,
    fn: ConfigFunction
  ): MarkdocConfigurator => {
    this.config.functions[name] = fn;
    return this;
  };

  /**
   * https://markdoc.dev/docs/partials
   *
   * @param name string
   * @param partial string
   * @returns this MarkdocConfigurator
   * @example
   * addPartial('myPartial', `# Hello World`) -> {% partial file="myPartial" %} -> Hello World */
  public addPartial = (name: string, partial: string): MarkdocConfigurator => {
    this.config.partials[name] = partial;
    return this;
  };

  /**
   * Get a copy of the current config
   *
   * @returns a copy of the current config
   * @example
   * const config = MarkdocConfigurator.getInstance().getConfig();
   * returns -> { tags: {}, nodes: {}, variables: {}, functions: {}, partials: {}, validation: { validateFunctions: false } } */
  public getConfig = (): typeof this.config => {
    return this.config;
  };

  /**
   * Get a copy of the current components
   *
   * @returns a copy of the current components
   * @example
   * const components = MarkdocConfigurator.getInstance().getComponents();
   * returns -> { MyComponent: MyComponent, MyOtherComponent: MyOtherComponent } */
  public getComponents = (): typeof this.components => {
    return this.components;
  };

  /**
   * transforms a markdoc file's content string into a Markdoc Node or array of Nodes and Tags.
   * This can then be passed to MarkdocConfigurator.transform to get a Markdoc AST, and ultimately be rendered.
   *
   * @param content string
   * @returns nodes Node | Node[]
   * @example
   * const nodes = MarkdocConfigurator.getInstance().parse(`# Hello World`);
   * returns -> { type: 'heading', depth: 1, children: ['Hello World'] } */
  public parse = (content: string): Node => {
    return Markdoc.parse(content);
  };

  /**
   * transforms a Node or array of Nodes into a Markdoc AST
   *
   * @param content Node | Node[]
   * @returns ast RenderableTreeNodes
   * @example
   * const nodes = MarkdocConfigurator.getInstance().transform(`# Hello World`);
   * const ast = MarkdocConfigurator.getInstance().transform(nodes);
   * returns -> { type: 'heading', depth: 1, children: ['Hello World'] } */
  public transform = (content: Node | Node[]): RenderableTreeNodes => {
    // @ts-expect-error content is a Node or Node[] and this confuses Markdoc.transform's overloaded type
    return Markdoc.transform(content, this.getConfig());
  };

  /**
   * takes RenderableTreeNodes and renders it to a React component tree
   *
   * @param ast RenderableTreeNodes
   * @param react typeof React
   * @returns React.ReactElement
   * @example
   * const ast = MarkdocConfigurator.getInstance().transform(`# Hello World`);
   * const react = MarkdocConfigurator.getInstance().renderReact(ast, React);
   * returns -> <h1>Hello World</h1> */
  public renderReact = (ast: RenderableTreeNodes, react: typeof React) => {
    return Markdoc.renderers.react(ast, react, {
      components: this.getComponents()
    });
  };

  /**
   * takes RenderableTreeNodes and renders it to HTML
   * @param content RenderableTreeNodes
   * @returns string
   * @example
   * const nodes = MarkdocConfigurator.getInstance().parse(`# Hello World`);
   * const ast = MarkdocConfigurator.getInstance().transform(nodes);
   * const htmlString = MarkdocConfigurator.getInstance().renderHtml(ast); */
  public renderHtml = (content: RenderableTreeNodes) => {
    Markdoc.renderers.html(content);
  };
}
