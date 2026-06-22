import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import projectOrder from '@/data/projects';
import { containsPrintable } from '@/lib/utils';
import { ProjectMetadata } from '@/types/project';

const PROJECTS_DIR = path.join(process.cwd(), 'public', 'projects');
const PLACEHOLDER_COVER = '/projects/_placeholder/cover.avif';

export interface Project {
  slug: string;
  metadata: ProjectMetadata;
  content: string;
  coverImage: string;
  hasNote: boolean;
}

export type ProjectSummary = Omit<Project, 'content'>;

function readProject(slug: string): Project {
  const file = fs.readFileSync(path.join(PROJECTS_DIR, slug, 'content.md'), 'utf8');
  const { data, content } = matter(file);
  const metadata = data as ProjectMetadata;
  const coverImage = metadata.coverImage
    ? path.posix.join('/projects', slug, metadata.coverImage)
    : PLACEHOLDER_COVER;

  return { slug, metadata, content, coverImage, hasNote: containsPrintable(content) };
}

export function getProjectSlugs(): string[] {
  return projectOrder;
}

export function getAllProjects(): Project[] {
  return projectOrder.map(readProject);
}

// Card data without the (potentially large) markdown body, to keep the client
// payload small.
export function getProjectSummaries(): ProjectSummary[] {
  return getAllProjects().map(({ content: _content, ...rest }) => rest);
}

export function getProject(slug: string): Project | null {
  if (!projectOrder.includes(slug)) return null;
  try {
    return readProject(slug);
  } catch {
    return null;
  }
}
