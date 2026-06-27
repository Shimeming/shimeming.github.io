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

export interface SpecializationData {
  /** Official 領域專長 code, e.g. "902007". */
  code: string;
  englishName: string;
  chineseName: string;
  /** Course numbers (matching CourseData.courseNumber) that count toward this specialization. */
  courses: string[];
}

export interface EducationData {
  school: string;
  degree: string;
  years: string;
  /** Public path to the institution logo, e.g. "/logos/ntu.png". */
  logo?: string;
  /** Override the default logo-plate background (e.g. "#ffffff" for a mark that needs true white). */
  logoBg?: string;
  defaultDisplay?: boolean;
  note?: string;
  specializations?: SpecializationData[];
  courses?: CourseData[];
  CGPA?: number;
}

export interface AwardData {
  englishTitle: string;
  chineseTitle?: string;
  description?: string;
  /** Public path to the award/issuer logo, e.g. "/logos/awards/icpc.png". */
  logo?: string;
  /** Override the default logo-plate background (e.g. "#ffffff" for a white-bg mark). */
  logoBg?: string;
}

export interface RoleData {
  role: string;
  org: string;
  period: string;
  location?: string;
  bullets?: string[];
  /** Public path to the org logo, e.g. "/logos/appier.png". */
  logo?: string;
  /** Override the default logo-plate background (e.g. "#ffffff" for a mark that needs true white). */
  logoBg?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}
