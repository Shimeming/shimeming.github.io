export interface ProjectMetadata {
  projectName: string;
  description: string;
}

export interface GithubProjectData extends ProjectMetadata {
  githubUrl: string;
}
