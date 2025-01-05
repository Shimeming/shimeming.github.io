import Markdown, { ExtraProps, Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx';
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript';
import scss from 'react-syntax-highlighter/dist/esm/languages/prism/scss';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import markdown from 'react-syntax-highlighter/dist/esm/languages/prism/markdown';
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json';

const languages = [
  ['tsx', tsx],
  ['typescript', typescript],
  ['scss', scss],
  ['bash', bash],
  ['markdown', markdown],
  ['json', json],
];

languages.forEach((language) => {
  SyntaxHighlighter.registerLanguage(language[0], language[1]);
});

const MarkdownWrapper = ({
  content,
}: {
  content: string
}) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents: Components = {
    code({ children, className, ...rest }) {
      const match = /language-(\w+)/.exec(className || '');

      return match ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={match[1]}
          PreTag="div"
          // children={String(children).replace(/\n$/, '')}
          {...rest}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code {...rest} className={className}>
          {children}
        </code>
      );
    },
  };

  return (
    <Markdown
      className='prose dark:prose-invert mx-auto font-sanstc'
      rehypePlugins={[rehypeRaw]} // , rehypeHighlight
      components={MarkdownComponents}
    >
      {content}
    </Markdown>
  );
};

export default MarkdownWrapper;
