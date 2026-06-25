export interface ProjectMetadata {
  projectName: string;
  coverImage?: string;
  description: string;
  overview: string[];
  tags?: string[];
  links?: {
    href: string;
    icon: string;
    description?: string;
  }[];
  year?: number;
  role?: string;
  category?: 'Game' | 'Graphics' | 'Web' | 'Systems' | 'School';
  stack?: string[];
  preview?: string;
  featured?: boolean;
}

export interface GithubProjectMetadata extends ProjectMetadata {
  repoUrl: string;
}
