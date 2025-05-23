export interface ProjectMetadata {
  projectName: string;
  description: string;
  overview: string[];
  links?: {
    href: string;
    icon: string;
    description?: string;
  }[];
}

export interface GithubProjectMetadata extends ProjectMetadata {
  repoUrl: string;
}
