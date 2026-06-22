import 'highlight.js/styles/atom-one-dark.css';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';

const MarkdownWrapper = ({
  content,
  className = '',
}: {
  content: string
  className?: string
}) => {
  return (
    <div className={`prose dark:prose-invert max-w-none ${className}`}>
      <Markdown
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownWrapper;
