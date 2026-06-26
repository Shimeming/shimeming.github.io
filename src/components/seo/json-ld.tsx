/**
 * Renders a JSON-LD structured-data block. Server-only; the script is baked
 * into the static HTML so crawlers see it without running JS.
 */
const JsonLd = ({ data }: { data: Record<string, unknown> }): React.JSX.Element => (
  <script
    type='application/ld+json'
    // JSON.stringify output is safe here: it's our own data, not user input.
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

export default JsonLd;
