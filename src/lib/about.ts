import activitiesData from '@/data/activities.json';
import awardsData from '@/data/awards.json';
import educationData from '@/data/education.json';
import experienceData from '@/data/experience.json';
import skillsData from '@/data/skills.json';
import { AwardData, EducationData, RoleData, SkillGroup } from '@/types/about';

export function getEducation(): EducationData[] {
  return educationData.education as EducationData[];
}

export function getAwards(): AwardData[] {
  return awardsData.awards as AwardData[];
}

export function getExperience(): RoleData[] {
  return experienceData.experience as RoleData[];
}

export function getActivities(): RoleData[] {
  return activitiesData.activities as RoleData[];
}

export function getSkills(): SkillGroup[] {
  return skillsData.skills as SkillGroup[];
}
