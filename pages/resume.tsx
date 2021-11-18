import { FC } from 'react';
import Resume from '../src/resume/Resume';
import json from '../src/resume/resume.json';

export interface IResumeData {
  basics: Basics;
  work: Position[];
  education: Education[];
  skills: Skill[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: Date;
  endDate: Date;
  score: string;
  courses: string[];
}

export interface Interest {
  name: string;
  keywords: string[];
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Project {
  name: string;
  description: string;
  highlights: string[];
  keywords: string[];
  startDate: Date;
  endDate: Date;
  url: string;
  roles: string[];
  entity: string;
  type: string;
}

export interface Publication {
  name: string;
  publisher: string;
  releaseDate: Date;
  url: string;
  summary: string;
}

export interface Reference {
  name: string;
  reference: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Position {
  organization?: string;
  position: string;
  url: string;
  startDate: Date;
  endDate: Date;
  summary: string;
  highlights: string[];
  name?: string;
}
const getSummary = (summary: string, company: string) => {
  if (company) {
    return summary.replace('__company__', company);
  }
  return summary.replace(
    '__company__',
    'a fast moving and forward looking organization'
  );
};

export async function getServerSideProps({ query }) {
  const summary = getSummary(json.basics.summary, query.company);
  const modified = { ...json, basics: { ...json.basics, summary } };
  return {
    props: {
      resume: modified
    }
  };
}

interface IResumePage {
  resume: IResumeData;
}

const ResumePage: FC<IResumePage> = ({ resume }) => <Resume resume={resume} />;
export default ResumePage;
