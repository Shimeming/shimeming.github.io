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
}

export interface GithubProjectMetadata extends ProjectMetadata {
  repoUrl: string;
}
