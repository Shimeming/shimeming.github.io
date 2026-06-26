import { type Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Container from '@/components/layout/container';
import LinkIcon from '@/components/link-icon';
import MarkdownWrapper from '@/components/markdown';
import BackLink from '@/components/ui/back-link';
import FigurePlate from '@/components/ui/figure-plate';
import Reveal from '@/components/ui/reveal';
import { getProject, getProjectSlugs } from '@/lib/projects';

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.metadata.projectName,
    description: project.metadata.description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      type: 'article',
      title: project.metadata.projectName,
      description: project.metadata.description,
      url: `/projects/${slug}`,
      images: [project.coverImage],
    },
  };
}

const ProjectPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { metadata, content, coverImage, hasNote } = project;

  // Build spec rows — only for fields that are actually present
  const specRows: { label: string; value: string }[] = [];
  if (metadata.year) {
    specRows.push({ label: 'Year', value: String(metadata.year) });
  }
  if (metadata.role) {
    specRows.push({ label: 'Role', value: metadata.role });
  }
  if (metadata.stack && metadata.stack.length > 0) {
    specRows.push({ label: 'Stack', value: metadata.stack.join(' · ') });
  }
  if (metadata.links && metadata.links.length > 0) {
    const linkDescs = metadata.links
      .map((l) => l.description ?? l.href)
      .join(' · ');
    specRows.push({ label: 'Links', value: linkDescs });
  }

  return (
    <main className='pb-20 pt-6'>
      <Container>
        <Reveal>
          <BackLink href='/projects'>All projects</BackLink>
        </Reveal>

        {/* Figure plate */}
        <Reveal delay={0.05}>
          <FigurePlate
            src={coverImage}
            alt={metadata.projectName}
            fig='FIG.01'
            caption={metadata.projectName}
          />
        </Reveal>

        {/* Title, spec table, abstract, links */}
        <Reveal delay={0.1}>
          {/* Title */}
          <h1 className='mt-6 font-display text-3xl font-semibold tracking-tight text-primary sm:text-4xl'>
            {metadata.projectName}
          </h1>

          {/* Mono spec table — only rendered if any row exists */}
          {specRows.length > 0 && (
            <dl
              className='mt-4 overflow-hidden rounded-lg border border-primary/20 bg-surface'
              style={{ display: 'grid', gridTemplateColumns: `repeat(${specRows.length}, 1fr)` }}
            >
              {specRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`px-3 py-2.5 ${i > 0 ? 'border-l border-primary/20' : ''}`}
                >
                  <dt className='font-mono text-[9px] font-bold uppercase tracking-widest text-primary'>
                    {row.label}
                  </dt>
                  <dd className='mt-1 font-mono text-[13px] font-semibold text-foreground'>
                    {row.value}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {/* Abstract + overview */}
          <p className='mt-4 text-base leading-relaxed text-body'>
            {metadata.description}
          </p>

          {metadata.overview && metadata.overview.length > 0 && (
            <ul className='mt-3 list-disc space-y-1 pl-5 text-muted'>
              {metadata.overview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}

          {/* External links */}
          {metadata.links && metadata.links.length > 0 && (
            <div className='mt-5 flex flex-wrap gap-4 border-t border-primary/10 pt-4'>
              {metadata.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 font-mono text-sm text-primary transition-colors hover:text-muted active:scale-95'
                >
                  <LinkIcon iconName={link.icon} />
                  {link.description && <span>{link.description}</span>}
                </Link>
              ))}
            </div>
          )}
        </Reveal>

        {/* Long-form notes */}
        {hasNote && (
          <Reveal>
            <section className='mt-10 border-t border-dashed border-primary/25 pt-6'>
              <MarkdownWrapper content={content} />
            </section>
          </Reveal>
        )}
      </Container>
    </main>
  );
};

export default ProjectPage;
