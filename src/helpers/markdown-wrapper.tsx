import Markdown, { type Components } from 'react-markdown';
// import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';

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
          className="!m-0"
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
