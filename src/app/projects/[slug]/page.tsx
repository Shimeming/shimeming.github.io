import { type Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeftLong } from 'react-icons/fa6';
import Container from '@/components/layout/container';
import LinkIcon from '@/components/link-icon';
import MarkdownWrapper from '@/components/markdown';
import { getAllProjects, getProject } from '@/lib/projects';

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
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
    openGraph: {
      title: project.metadata.projectName,
      description: project.metadata.description,
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

  return (
    <main className='pb-20'>
      <div className='relative h-56 w-full overflow-hidden sm:h-72 md:h-80'>
        <Image
          src={coverImage}
          alt={metadata.projectName}
          fill
          priority
          className='object-cover'
          sizes='100vw'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent' />
      </div>

      <Container className='-mt-16 relative'>
        <Link
          href='/projects'
          className='mb-4 inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary'
        >
          <FaArrowLeftLong /> All projects
        </Link>

        <article className='rounded-2xl bg-surface p-6 shadow-lg sm:p-10'>
          <h1 className='text-3xl font-bold text-primary sm:text-4xl'>
            {metadata.projectName}
          </h1>

          {metadata.links && metadata.links.length > 0 && (
            <div className='mt-4 flex flex-wrap gap-4'>
              {metadata.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 text-secondary transition-colors hover:text-primary active:scale-95'
                >
                  <LinkIcon iconName={link.icon} />
                  {link.description && <span>{link.description}</span>}
                </Link>
              ))}
            </div>
          )}

          <p className='mt-4 text-lg'>{metadata.description}</p>

          {metadata.overview && metadata.overview.length > 0 && (
            <ul className='mt-4 list-disc space-y-1 pl-5 text-decorative'>
              {metadata.overview.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          )}
        </article>

        {hasNote && (
          <section className='mt-10'>
            <MarkdownWrapper content={content} />
          </section>
        )}
      </Container>
    </main>
  );
};

export default ProjectPage;
