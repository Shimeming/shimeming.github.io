export interface ProjectMetadata {
  projectName: string;
  description: string;
  overview: string[];
}

export interface GithubProjectMetadata extends ProjectMetadata {
  repoUrl: string;
}
