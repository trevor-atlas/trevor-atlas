---
title: "TSLint is going to be deprecated this year, here's what you can do about it"
date: '2019-08-13'
---

If you've done any work with typescript, it's likely you've come across the [TSLint](https://palantir.github.io/tslint/) project. TSLint is a Typescript specific linting tool that ensures you and your team write high quality code that conforms to a particular style.  

> The strategic direction of the TypeScript team is to enable “types on every desk, in every home, for every JS developer”. In other words, the direction is to incrementally enrich the JavaScript developer experience with TypeScript features like types and /assets analysis until, maybe, the TypeScript and JavaScript developer experience converge.
> 
> [Palantir on Medium](https://medium.com/palantir/tslint-in-2019-1a144c2317a9)

![](/assets/2019/08/index.png)

Up til now, TSLint has been the primary way to keep typescript code bases in check.  
But in 2019, the Typescript team decided to put their efforts into expanding ESLint with support for typescript.  
With this decision made, Palantir has decided to sunset TSLint and do away with the project entirely.

> 🚧 warning TSLint will be deprecated some time in 2019. [See this issue for more details](https://github.com/palantir/tslint/issues/4534)
> 
> Palantir on Github

With this change coming soon, it's important to update your projects to keep up code quality. With this post we'll go over that migration process step by step.

## Setup

First things first, we need to install ESLint and a couple extra dependencies to get things working.

First up is @typescript-eslint/parser

this module takes typescript code and produces an Abstract Syntax Tree, or AST for that code.

We then use the @typescript-eslint/eslint-plugin to parse that AST for ESLint rules!

```bash
npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

Once that's installed, we need to create a `.eslintrc` file in the root of our project and add the following code to it:

```json
{
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
    "parserOptions": {
      "project": "./tsconfig.json",
      "includes": [
        "src/**/*.ts"
      ]
  }
}
```

This does a couple things.

- First, we are telling ESLint to use the Typescript specific parser we installed earlier.
- We then add the typescript-eslint plugin and extend the recommended default rulesets. (that last part is optional, you can also create any configuration you want in the rules section)
- finally, we are setting up some specific options that tell ESLint what files to scan through, and where our tsconfig.json is

Please note that this is just extending the default rulesets and will not handle migrating your existing TSLint settings. you will need to add a 'rules' section to the above config and manually add each rule or the equivalent.

You can find a list of the ESLint Typescript [supported rules here](https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin#supported-rules)

## Configure your Editor

### VScode

You will need to add a configuration option in VScode's settings so that it knows to run ESLint on typescript files:

```json
"eslint.validate": [
  "javascript",
  "javascriptreact",
  "typescript",
  "typescriptreact"
]
```

## Intellij

Open the settings window and navigate to:

preferences > Language & Frameworks > JavaScript > Code Quality Tools > ESlint

- choose manual ESLint Configuration
- set the ESLint package field to ~/path/to/project/node\_modules/eslint

After following these steps, you should be able to see ESlint start highlighting your code that violates the rules automatically!

[Further reading](https://github.com/typescript-eslint/typescript-eslint)
