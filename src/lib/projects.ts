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

export function assertProjectMetadata(data: unknown, slug: string): ProjectMetadata {
  const d = data as Record<string, unknown>;
  if (!d || typeof d.projectName !== 'string' || !d.projectName) {
    throw new Error(`Project "${slug}": missing required frontmatter "projectName"`);
  }
  if (!d || typeof d.description !== 'string' || !d.description) {
    throw new Error(`Project "${slug}": missing required frontmatter "description"`);
  }
  return data as ProjectMetadata;
}

function readProjectMeta(slug: string): ProjectSummary {
  const file = fs.readFileSync(path.join(PROJECTS_DIR, slug, 'content.md'), 'utf8');
  const { data, content } = matter(file);
  const metadata = assertProjectMetadata(data, slug);
  const coverImage = metadata.coverImage
    ? path.posix.join('/projects', slug, metadata.coverImage)
    : PLACEHOLDER_COVER;
  return { slug, metadata, coverImage, hasNote: containsPrintable(content) };
}

function readProject(slug: string): Project {
  const summary = readProjectMeta(slug);
  const file = fs.readFileSync(path.join(PROJECTS_DIR, slug, 'content.md'), 'utf8');
  const { content } = matter(file);
  return { ...summary, content };
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
  return projectOrder.map(readProjectMeta);
}

export function getProject(slug: string): Project | null {
  if (!projectOrder.includes(slug)) return null;
  try {
    return readProject(slug);
  } catch {
    return null;
  }
}
