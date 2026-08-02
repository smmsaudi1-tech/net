import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageMode = 'EN' | 'AR';

interface LanguageContextType {
  lang: LanguageMode;
  toggleLanguage: () => void;
  t: (key: string, defaultEn?: string, defaultAr?: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  toggleLanguage: () => {},
  t: (key: string) => key
});

// Comprehensive Professional Arabic & English Translations Dictionary
const dictionary: Record<string, { en: string; ar: string }> = {
  // Navigation
  'nav.work': { en: 'WORK', ar: 'المشاريع' },
  'nav.services': { en: 'SERVICES', ar: 'الخدمات' },
  'nav.process': { en: 'PROCESS', ar: 'خريطة العمل' },
  'nav.about': { en: 'ABOUT', ar: 'عن الفريق' },
  'nav.contact': { en: 'CONTACT', ar: 'تواصل معنا' },

  // Hero Section
  'hero.tag': { en: 'CREATIVE TECHNOLOGY STUDIO / 2026', ar: 'استوديو التكنولوجيا الإبداعية / 2026' },
  'hero.h1': { en: 'WE BUILD WHAT’S NEXT.', ar: 'نبني مستقبلك الرقمي.' },
  'hero.desc': {
    en: 'Next Gen Devs is a creative technology team building modern websites, e-commerce experiences and digital products.',
    ar: 'فريق "نكسست جين ديفز" استوديو تكنولوجي إبداعي متخصص في تطوير المواقع الفاخرة، المتاجر الإلكترونية العالمية، والحلول البرمجية المبتكرة.'
  },
  'hero.cta.start': { en: 'START A PROJECT', ar: 'ابدأ مشروعك الآن' },
  'hero.cta.explore': { en: 'EXPLORE OUR WORK', ar: 'استكشف أعمالنا' },

  // Brand Statement
  'statement.tag': { en: '// OUR PHILOSOPHY', ar: '// فلسفتنا وتوجهنا الإبداعي' },

  // Services Section
  'services.tag': { en: '// CORE CAPABILITIES', ar: '// قدراتنا وخبراتنا الرئيسية' },
  'services.title': { en: 'WHAT WE BUILD', ar: 'ما نقدمه لبراندك' },
  'services.count': { en: '[ 05 SPECIALIZED DISCIPLINES ]', ar: '[ 5 تخصصات برمجية استثنائية ]' },

  // Portfolio / Work Section
  'work.tag': { en: '// PORTFOLIO PRODUCTIONS', ar: '// معرض الأعمال المباشرة' },
  'work.title': { en: 'SELECTED WORK', ar: 'أبرز مشاريعنا' },

  // Roadmap Section
  'roadmap.tag': { en: '// PRODUCTION ROADMAP', ar: '// خريطة ومراحل الإنتاج' },
  'roadmap.title': { en: 'FROM IDEA TO DIGITAL', ar: 'من الفكرة إلى الإطلاق الرقمي' },

  // Process Section
  'process.tag': { en: '// METHODOLOGY', ar: '// منهجية العمل الدقيقة' },
  'process.title': { en: 'OUR PROCESS', ar: 'خطوات التنفيذ' },

  // Tech Stack Section
  'tech.tag': { en: '// PROGRAMMING ENGINE & TECH STACK', ar: '// التقنيات ومحركات البناء' },
  'tech.title': { en: 'CODE & TECH MATRIX', ar: 'مصفوفة التقنيات العالمية' },

  // About Section
  'about.tag': { en: '// ABOUT NEXT GEN DEVS', ar: '// عن فريق NEXT GEN DEVS' },
  'about.title': { en: 'WE ARE NEXT GEN.', ar: 'نحن الجيل القادم.' },
  'about.desc': {
    en: 'We are a young team of developers and designers focused on turning ambitious ideas into fast, modern and memorable digital experiences.',
    ar: 'نحن فريق شغال بشغف عالي من المطورين والمصممين، نهدف لتحويل الأفكار الطموحة إلى منصات وتجارب رقمية استثنائية وسريعة تترك أثراً لا يُنسى.'
  },
  'about.stat1': { en: 'PROJECTS LAUNCHED', ar: 'مشروعاً تم إطلاقه' },
  'about.stat2': { en: 'BRANDS EMPOWERED', ar: 'علامة تجارية تم تطويرها' },
  'about.stat3': { en: 'PASSION & PRECISION', ar: 'شغف ودقة متناهية' },
  'about.stat4': { en: 'CREATIVE ENERGY', ar: 'طاقة إبداعية على مدار الساعة' },

  // Contact Section
  'contact.tag': { en: '// START A PROJECT', ar: '// ابدأ مشروعك معنا' },
  'contact.h1_1': { en: 'LET’S BUILD', ar: 'دعنا نبني' },
  'contact.h1_2': { en: 'WHAT’S NEXT.', ar: 'مستقبلك الرقمي.' },
  'contact.desc': {
    en: 'Have an idea? Let’s turn it into something people remember.',
    ar: 'لديك فكرة طموحة؟ دعنا نحولها إلى منصة رقمية مبهرة يتذكرها الجميع.'
  },
  'contact.name_label': { en: 'YOUR NAME //', ar: 'الاسم الكريم //' },
  'contact.email_label': { en: 'YOUR EMAIL OR PHONE //', ar: 'البريد أو رقم الهاتف //' },
  'contact.idea_label': { en: 'YOUR IDEA / PROJECT SCOPE //', ar: 'تفاصيل مشروعك أو فكرتك //' },
  'contact.submit': { en: 'START A PROJECT →', ar: 'إرسال واستشارة مجانية ←' }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageMode>('EN');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'EN' ? 'AR' : 'EN'));
  };

  const t = (key: string, defaultEn?: string, defaultAr?: string) => {
    if (dictionary[key]) {
      return lang === 'AR' ? dictionary[key].ar : dictionary[key].en;
    }
    return lang === 'AR' ? (defaultAr || defaultEn || key) : (defaultEn || key);
  };

  useEffect(() => {
    const root = document.documentElement;
    if (lang === 'AR') {
      root.setAttribute('dir', 'rtl');
      root.setAttribute('lang', 'ar');
      root.classList.add('font-arabic');
    } else {
      root.setAttribute('dir', 'ltr');
      root.setAttribute('lang', 'en');
      root.classList.remove('font-arabic');
    }
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
