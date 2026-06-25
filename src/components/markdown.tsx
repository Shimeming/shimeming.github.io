import 'highlight.js/styles/atom-one-dark.css';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import type { Components } from 'react-markdown';

// Extract the plain text of a hast node tree (used for note: detection)
function nodeText(node: unknown): string {
  if (!node) return '';
  const n = node as { type?: string; value?: string; children?: unknown[] };
  if (n.type === 'text') return n.value ?? '';
  return (n.children ?? []).map(nodeText).join('');
}

// Custom blockquote component: if text starts with "note:" render a margin note.
const BlockquoteOverride: Components['blockquote'] = ({ node, children }) => {
  const raw = nodeText(node as unknown);
  if (/^\s*note:/i.test(raw)) {
    // Strip the leading "note:" token from all text for display
    const stripped = raw.replace(/^\s*note:\s*/i, '').trim();
    return (
      <aside className='not-prose my-4 border-l-2 border-accent pl-3 font-caveat text-accent lg:float-right lg:clear-right lg:-mr-44 lg:ml-6 lg:w-40 lg:border-l-2 lg:pl-3 lg:text-sm'>
        {stripped}
      </aside>
    );
  }
  return (
    <blockquote className='my-4 border-l-4 border-primary/30 pl-4 text-muted italic'>
      {children}
    </blockquote>
  );
};

const MarkdownWrapper = ({
  content,
  className = '',
}: {
  content: string
  className?: string
}) => {
  return (
    <div className={`prose dark:prose-invert max-w-[68ch] ${className}`}>
      <Markdown
        rehypePlugins={[rehypeRaw, [rehypeHighlight, { ignoreMissing: true }]]}
        components={{ blockquote: BlockquoteOverride }}
      >
        {content}
      </Markdown>
    </div>
  );
};

export default MarkdownWrapper;
