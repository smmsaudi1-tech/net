import React, { createContext, useContext, useState, useEffect } from 'react';
import { AgencyProject, QuoteInquiry, ProjectCategory } from '../types';

interface AgencyContextType {
  projects: AgencyProject[];
  inquiries: QuoteInquiry[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedProject: AgencyProject | null;
  setSelectedProject: (project: AgencyProject | null) => void;
  
  // Admin CMS Functions
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAdminAuthenticated: boolean;
  loginAdmin: (pass: string) => boolean;
  logoutAdmin: () => void;
  
  // Project Actions
  addProject: (project: Omit<AgencyProject, 'id' | 'date'>) => void;
  deleteProject: (id: string) => void;
  toggleFeaturedProject: (id: string) => void;
  
  // Inquiry Actions
  submitQuoteInquiry: (inquiry: Omit<QuoteInquiry, 'id' | 'date' | 'status'>) => void;
  resolveInquiry: (id: string) => void;
  
  // Contact & Social Info
  agencyInfo: {
    name: string;
    slogan: string;
    whatsapp: string;
    email: string;
  };
}

const INITIAL_PROJECTS: AgencyProject[] = [
  {
    id: 'proj-1',
    title: 'Vogue Luxe — متجر فاشون وملابس عالمي',
    category: 'fashion',
    clientName: 'Vogue Luxe Brand',
    description: 'متجر إلكتروني فاخر لبراند ملابس نسائية وعصرية مع معارض 3D للقطع ونظام دفع إلكتروني يدعم فيزا وماستركارد وفوري.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://vogue-luxe-demo.vercel.app',
    techStack: ['React', 'Tailwind CSS', 'Three.js 3D', 'Paymob Gateway'],
    metrics: '+340% زيادة مبيعات الشهر الأول',
    featured: true,
    date: '2026-01-15'
  },
  {
    id: 'proj-2',
    title: 'El Gato Cafe — منيو رقمي وحجز طاولات ذكي',
    category: 'cafe_restaurant',
    clientName: 'El Gato Coffee House',
    description: 'نظام منيو كافيه ذكي يعمل بالـ QR Code مع إمكانية طلب المشروبات أونلاين وتأكيد الحجوزات فورياً عبر الواتساب.',
    imageUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://elgato-cafe.vercel.app',
    techStack: ['Vite', 'React', 'WhatsApp API', 'QR Engine'],
    metrics: 'أكثر من 15,000 طلب شهرياً',
    featured: true,
    date: '2026-02-01'
  },
  {
    id: 'proj-3',
    title: 'Urban Streetwear — براند ملابس شبابية 2026',
    category: 'fashion',
    clientName: 'Urban Wear Co.',
    description: 'تجربة تسوق عصرية سريعة جداً لملابس السريت وير الشبابية مع دليل مقاسات تفاعلي ونظام تتبع الشحنات.',
    imageUrl: 'https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://urban-streetwear.vercel.app',
    techStack: ['Next.js', 'Framer Motion', 'Stripe', 'Tailwind'],
    metrics: '+280% معدل التحول (Conversion Rate)',
    featured: true,
    date: '2026-02-20'
  },
  {
    id: 'proj-4',
    title: 'La Bella Restaurant — موقع مطعم إيطالي فاخر',
    category: 'cafe_restaurant',
    clientName: 'La Bella Ristorante',
    description: 'موقع تفاعلي أنيق لمطعم إيطالي يتيح تصفح قائمة الطعام بالصور والفيديو وحجز الموائد وتجربة دليفري سريعة.',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://labella-ristorante.vercel.app',
    techStack: ['React', 'GSAP Animation', 'Node.js', 'Tailwind'],
    metrics: '+410% زيادة طلبات الدليفري',
    featured: true,
    date: '2026-03-05'
  },
  {
    id: 'proj-5',
    title: 'Aura Accessories — متجر مجوهرات وإكسسوارات',
    category: 'ecommerce',
    clientName: 'Aura Luxury',
    description: 'منصة تسوق فخمة لمنتجات المجوهرات والإكسسوارات العصرية بتصميم داكن فاخر وسرعة تحميل أقل من ثانية.',
    imageUrl: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    liveUrl: 'https://aura-luxury.vercel.app',
    techStack: ['Vite', 'React', 'Lucide', 'Tailwind CSS'],
    metrics: '99/100 سرعة على Google Lighthouse',
    featured: false,
    date: '2026-03-12'
  }
];

const INITIAL_INQUIRIES: QuoteInquiry[] = [
  {
    id: 'inq-1',
    clientName: 'محمد العبدالله',
    businessType: 'براند ملابس رجالي',
    phone: '+201099887766',
    budgetRange: '$1,000 - $2,500',
    featuresSelected: ['متجر إلكتروني فخور', 'دفع فيزا وماستركارد', 'دليل مقاسات تفاعلي'],
    estimatedPrice: 1500,
    date: '2026-03-28',
    status: 'new'
  }
];

const AgencyContext = createContext<AgencyContextType | undefined>(undefined);

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<AgencyProject[]>(() => {
    const saved = localStorage.getItem('nextgen_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [inquiries, setInquiries] = useState<QuoteInquiry[]>(() => {
    const saved = localStorage.getItem('nextgen_inquiries');
    return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<AgencyProject | null>(null);

  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('nextgen_admin_auth') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('nextgen_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('nextgen_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  const loginAdmin = (pass: string) => {
    if (pass === '1234' || pass === 'admin123') {
      setIsAdminAuthenticated(true);
      localStorage.setItem('nextgen_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem('nextgen_admin_auth');
  };

  const addProject = (projectData: Omit<AgencyProject, 'id' | 'date'>) => {
    const newProj: AgencyProject = {
      ...projectData,
      id: 'proj-' + Date.now(),
      date: new Date().toISOString().split('T')[0]
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const toggleFeaturedProject = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, featured: !p.featured } : p))
    );
  };

  const submitQuoteInquiry = (inquiryData: Omit<QuoteInquiry, 'id' | 'date' | 'status'>) => {
    const newInq: QuoteInquiry = {
      ...inquiryData,
      id: 'inq-' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      status: 'new'
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const resolveInquiry = (id: string) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: 'contacted' } : i))
    );
  };

  const agencyInfo = {
    name: 'NextGen Devs',
    slogan: 'نبني مواقع رقمية تحول زوار براندك أو مطعمك إلى عملاء دائمين',
    whatsapp: '+201099887766',
    email: 'contact@nextgendevs.studio'
  };

  return (
    <AgencyContext.Provider
      value={{
        projects,
        inquiries,
        selectedCategory,
        setSelectedCategory,
        selectedProject,
        setSelectedProject,
        isAdminOpen,
        setIsAdminOpen,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        addProject,
        deleteProject,
        toggleFeaturedProject,
        submitQuoteInquiry,
        resolveInquiry,
        agencyInfo
      }}
    >
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => {
  const context = useContext(AgencyContext);
  if (!context) {
    throw new Error('useAgency must be used within an AgencyProvider');
  }
  return context;
};
