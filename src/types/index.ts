export interface RealProject {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  techStack: string[];
  year: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  tags: string[];
}

export interface ProcessItem {
  number: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TechItem {
  name: string;
  category: string;
  depth: number;
}
