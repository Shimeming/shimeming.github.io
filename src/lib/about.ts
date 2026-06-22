import awardsData from '@/data/awards.json';
import educationData from '@/data/education.json';
import { AwardData, EducationData } from '@/types/about';

export function getEducation(): EducationData[] {
  return educationData.education as EducationData[];
}

export function getAwards(): AwardData[] {
  return awardsData.awards as AwardData[];
}
