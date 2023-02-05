import { css } from '@emotion/css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { VscCopy } from 'react-icons/vsc';
import { MouseEventHandler, useState } from 'react';
import { mq } from 'src/utils/constants';
const newTheme = {
  'comment': {
    color: '#7C9C7C'
  },
  'prolog': {
    color: '#7C7C7C'
  },
  'doctype': {
    color: '#7C7C7C'
  },
  'cdata': {
    color: '#7C7C7C'
  },
  'punctuation': {
    color: '#c5c8c6'
  },
  '.namespace': {
    Opacity: '.7'
  },
  'property': {
    color: '#96CBFE'
  },
  'keyword': {
    color: '#96CBFE'
  },
  'tag': {
    color: '#96CBFE'
  },
  'class-name': {
    color: '#9999F6',
    textDecoration: 'underline'
  },
  'boolean': {
    color: '#99CC99'
  },
  'constant': {
    color: '#ffCC99'
  },
  'symbol': {
    color: '#f92672'
  },
  'deleted': {
    color: '#f92672'
  },
  'number': {
    color: '#FF73FD'
  },
  'selector': {
    color: '#A8FF60'
  },
  'attr-name': {
    color: '#A8FF60'
  },
  'string': {
    color: '#A8FF60'
  },
  'char': {
    color: '#A8FF60'
  },
  'builtin': {
    color: '#A8FF60'
  },
  'inserted': {
    color: '#A8FF60'
  },
  'variable': {
    color: '#C6C5FE'
  },
  'operator': {
    color: '#EDEDED'
  },
  'entity': {
    color: '#FFFFB6',
    cursor: 'help'
  },
  'url': {
    color: '#96CBFE'
  },
  '.language-css .token.string': {
    color: '#87C38A'
  },
  '.style .token.string': {
    color: '#87C38A'
  },
  'atrule': {
    color: '#F9EE98'
  },
  'attr-value': {
    color: '#F9EE98'
  },
  'function': {
    color: '#DAD085'
  },
  'regex': {
    color: '#E9C062'
  },
  'important': {
    color: '#fd971f',
    fontWeight: 'bold'
  },
  'bold': {
    fontWeight: 'bold'
  },
  'italic': {
    fontStyle: 'italic'
  }
};

const theme = {
  'hljs': {
    display: 'block',
    overflowX: 'auto',
    padding: '0.8rem',
    color: '#abb2bf',
    background: 'rgba(40, 44, 52,.8)', //'#282c34'
    fontSize: '.8rem'
  },
  'hljs-comment': {
    color: '#5c6370',
    fontStyle: 'italic'
  },
  'hljs-quote': {
    color: '#5c6370',
    fontStyle: 'italic'
  },
  'hljs-doctag': {
    color: '#c678dd'
  },
  'hljs-keyword': {
    color: '#c678dd'
  },
  'hljs-formula': {
    color: '#c678dd'
  },
  'hljs-section': {
    color: '#e06c75'
  },
  'hljs-name': {
    color: '#e06c75'
  },
  'hljs-selector-tag': {
    color: '#e06c75'
  },
  'hljs-deletion': {
    color: '#e06c75'
  },
  'hljs-subst': {
    color: '#e06c75'
  },
  'hljs-literal': {
    color: '#56b6c2'
  },
  'hljs-string': {
    color: '#98c379'
  },
  'hljs-regexp': {
    color: '#98c379'
  },
  'hljs-addition': {
    color: '#98c379'
  },
  'hljs-attribute': {
    color: '#98c379'
  },
  'hljs-meta-string': {
    color: '#98c379'
  },
  'hljs-built_in': {
    color: '#e6c07b'
  },
  'hljs-class .hljs-title': {
    color: '#e6c07b'
  },
  'hljs-attr': {
    color: '#d19a66'
  },
  'hljs-variable': {
    color: '#d19a66'
  },
  'hljs-template-variable': {
    color: '#d19a66'
  },
  'hljs-type': {
    color: '#d19a66'
  },
  'hljs-selector-class': {
    color: '#d19a66'
  },
  'hljs-selector-attr': {
    color: '#d19a66'
  },
  'hljs-selector-pseudo': {
    color: '#d19a66'
  },
  'hljs-number': {
    color: '#d19a66'
  },
  'hljs-symbol': {
    color: '#61aeee'
  },
  'hljs-bullet': {
    color: '#61aeee'
  },
  'hljs-link': {
    color: '#61aeee',
    textDecoration: 'underline'
  },
  'hljs-meta': {
    color: '#61aeee'
  },
  'hljs-selector-id': {
    color: '#61aeee'
  },
  'hljs-title': {
    color: '#61aeee'
  },
  'hljs-emphasis': {
    fontStyle: 'italic'
  },
  'hljs-strong': {
    fontWeight: 'bold'
  }
};

interface CodeProps {
  children: string;
  language: string;
}

function CopyAndLangLabel({
  language,
  code
}: {
  language: string;
  code: string;
}) {
  const [text, setText] = useState('Copy');
  const [hovered, setHovered] = useState(false);
  const reset = () => {
    setText('Copy');
    setHovered(false);
  };
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
      onClick={() => {
        if (navigator.clipboard) {
          navigator.clipboard.writeText(code);
          setText('Copied!');
        }
        setTimeout(reset, 1000);
      }}
      title="Copy to clipboard"
      className={css`
        ${mq.mobile} {
          width: 2.9rem;
          height: 2.9rem;
          font-size: 1rem;
        }
        display: flex;
        width: auto;
        height: 1.5rem;
        border-radius: 0.25rem;
        color: rgba(255, 255, 255, 0.6);
        font-size: 0.6rem;
        padding: 0.3rem 0.5rem;
        position: absolute;
        right: 0.5rem;
        top: 0.5rem;
        background: rgba(0, 0, 0, 0.1);
        border: 2px solid rgba(255, 255, 255, 0.1);
        transition: border 0.2s ease-in-out, background 0.2s ease-in-out;

        &:hover {
          color: rgba(105, 205, 255, 0.6);
          background: rgba(0, 0, 0, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.2);
        }
      `}
    >
      <span
        className={css`
          position: absolute;
          left: calc(50% - 0.5rem);
          padding: 0.5rem;
          top: -2rem;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          color: rgba(255, 255, 255, 0.6);
          border-radius: 0.25rem;
          opacity: 1;
          transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out;
          transform: translateY(${hovered ? 0 : -25}px);
          opacity: ${hovered ? 1 : 0};
          pointer-events: none;
          @media (max-width: 600px) {
            top: -3.5rem;
            padding: 1rem;
            left: calc(50% - 4rem);
          }
        `}
      >
        {text}
      </span>

      <span>{language?.toUpperCase()}</span>
    </button>
  );
}

export default function Code({ children, language }: CodeProps) {
  let code = children.trim();
  const hideLineNumbers = code.split('\n').length < 2;
  return (
    <div className="code-fence mb-6 relative">
      <CopyAndLangLabel language={language} code={code} />
      <SyntaxHighlighter
        showLineNumbers={!hideLineNumbers}
        language={language}
        style={newTheme as any}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
