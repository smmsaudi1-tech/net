export type ProjectCategory = 'fashion' | 'cafe_restaurant' | 'ecommerce' | 'custom_app';

export interface AgencyProject {
  id: string;
  title: string;
  category: ProjectCategory;
  clientName: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  techStack: string[];
  metrics: string;
  featured: boolean;
  date: string;
}

export interface QuoteInquiry {
  id: string;
  clientName: string;
  businessType: string;
  phone: string;
  budgetRange: string;
  featuresSelected: string[];
  estimatedPrice: number;
  date: string;
  status: 'new' | 'contacted' | 'closed';
}

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
