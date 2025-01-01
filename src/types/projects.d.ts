export interface ProjectMetadata {
  projectName: string;
  description: string;
}

export interface GithubProjectMetadata extends ProjectMetadata {
  repoUrl: string;
}
