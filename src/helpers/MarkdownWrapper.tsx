import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

const MarkdownWrapper = ({
  content,
  className = '',
}: {
  content: string
  className?: string
}) => {
  return (
    <ReactMarkdown
      className={`prose dark:prose-invert ${className}`}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownWrapper;
