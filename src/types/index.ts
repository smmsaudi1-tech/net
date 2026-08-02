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
  metrics: string; // e.g. "+350% زيادة مبيعات"
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

export interface AgencyService {
  id: string;
  title: string;
  subtitle: string;
  category: ProjectCategory;
  description: string;
  features: string[];
  icon: string;
  badge: string;
}
