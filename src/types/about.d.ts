export interface CourseData {
  courseNumber: string;
  chineseName: string;
  englishName: string;
  credits: number;
  grade: string;
  semester: string;
  skills?: string[];

  link?: string;
  repoLink?: string;
  projectPageLink?: string;
}

export interface EducationData {
  school: string;
  degree: string;
  years: string;
  defaultDisplay?: boolean;
  courses?: CourseData[];
  CGPA?: number;
}

export interface AwardData {
  englishTitle: string;
  chineseTitle?: string;
  description?: string;
}
