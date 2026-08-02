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

// Complete Dictionary for 100% Mirror Symmetrical Bilingual Site (EN / AR)
const dictionary: Record<string, { en: string; ar: string }> = {
  // Navigation
  'nav.work': { en: 'WORK', ar: 'المشاريع' },
  'nav.services': { en: 'SERVICES', ar: 'الخدمات' },
  'nav.process': { en: 'PROCESS', ar: 'خريطة العمل' },
  'nav.about': { en: 'ABOUT', ar: 'عن الفريق' },
  'nav.contact': { en: 'CONTACT', ar: 'تواصل معنا' },
  'nav.menu': { en: 'MENU', ar: 'القائمة' },
  'nav.close': { en: 'CLOSE', ar: 'إغلاق' },

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
  'statement.w1': { en: 'IDEAS', ar: 'الأفكار' },
  'statement.w2': { en: 'DESERVE', ar: 'تستحق' },
  'statement.w3': { en: 'BETTER', ar: 'أفضل' },
  'statement.w4': { en: 'DIGITAL', ar: 'تجارب' },
  'statement.w5': { en: 'EXPERIENCES.', ar: 'رقمية.' },

  // Services Section
  'services.tag': { en: '// CORE CAPABILITIES', ar: '// قدراتنا وخبراتنا الرئيسية' },
  'services.title': { en: 'WHAT WE BUILD', ar: 'ما نقدمه لبراندك' },
  'services.count': { en: '[ 05 SPECIALIZED DISCIPLINES ]', ar: '[ 5 تخصصات برمجية استثنائية ]' },

  'srv1.title': { en: 'WEBSITE DEVELOPMENT', ar: 'تطوير المواقع الفاخرة' },
  'srv1.desc': { en: 'Bespoke websites built with React 19, Next.js, and Three.js 3D WebGL scenes.', ar: 'مواقع مخصصة بمهارة فائقة تقنياً باستخدام رياكت ونكست ثري دي.' },

  'srv2.title': { en: 'E-COMMERCE STORES', ar: 'تطوير المتاجر الإلكترونية' },
  'srv2.desc': { en: 'Luxury digital storefronts, custom checkout flows, payment gateways, and inventory sync.', ar: 'متاجر إلكترونية فاخرة، بوابات دفع سريعة، ومزامنة تلقائية للمخزون.' },

  'srv3.title': { en: 'WEB APPLICATIONS & AI CHATBOTS', ar: 'التطبيقات وشات بوت الذكاء الاصطناعي' },
  'srv3.desc': { en: 'Fullstack cloud web platforms, custom AI chatbots, digital menus with QR codes, and SaaS portals.', ar: 'منصات سحابية، شات بوت ذكاء اصطناعي تفاعلي، ومميزات المتاجر والمطاعم.' },

  'srv4.title': { en: 'UI / UX DESIGN SYSTEMS', ar: 'تصميم الواجهات ونظم UI/UX' },
  'srv4.desc': { en: 'Human-centered minimalist luxury design systems, wireframing, and motion prototypes.', ar: 'أنظمة تصميم أنيقة، تجربة مستخدم سلسة، وأنيميشن متناسق.' },

  'srv5.title': { en: 'BRAND DIGITAL EXPERIENCE', ar: 'الهوية الرقمية الكاملة' },
  'srv5.desc': { en: 'Complete brand positioning, 3D interactive showcases, sound design, and launch strategies.', ar: 'بناء الهوية الرقمية، عروض 3D تفاعلية، واستراتيجيات إطلاق ناجحة.' },

  // Portfolio Section
  'work.tag': { en: '// GSAP SCROLL-ANIMATED PRODUCTIONS', ar: '// معرض الأعمال المباشرة' },
  'work.title': { en: 'SELECTED WORK', ar: 'أبرز مشاريعنا' },
  'work.count': { en: '[ LIVE PRODUCTIONS ]', ar: '[ أعمال إنتاجية مباشرة ]' },
  'filter.all': { en: 'ALL', ar: 'الكل' },
  'filter.ecom': { en: 'E-COMMERCE', ar: 'المتاجر الإلكترونية' },
  'filter.brands': { en: 'BRANDS', ar: 'العلامات التجارية' },
  'filter.apps': { en: 'APPS', ar: 'التطبيقات' },
  'btn.preview': { en: 'LIVE PREVIEW', ar: 'معاينة حية' },
  'btn.visit': { en: 'VISIT SITE', ar: 'زيارة الموقع' },

  // Horizontal Roadmap
  'roadmap.tag': { en: '// GSAP PINNED HORIZONTAL ROADMAP', ar: '// خريطة ومراحل الإنتاج' },
  'roadmap.title': { en: 'FROM IDEA TO DIGITAL', ar: 'من الفكرة إلى الإطلاق الرقمي' },
  'roadmap.pinned': { en: '[ GSAP SCROLLTRIGGER PINNED ]', ar: '[ خريطة تفاعلية مثبّتة ]' },
  'step1.title': { en: 'IDEA & DISCOVERY', ar: 'الفكرة والاستكشاف' },
  'step1.desc': { en: 'Analyzing brand position, architecture, business goals, and audience psychology.', ar: 'تحليل موقع العلامة التجارية، الأهداف التجارية، وسيكولوجية الجمهور.' },
  'step2.title': { en: 'LUXURY DESIGN', ar: 'التصميم الفاخر' },
  'step2.desc': { en: 'Architecting minimal typography, 3D WebGL scenes, and fluid motion prototypes.', ar: 'رسم التايبوجرافي المعماري، مشاهد الـ 3D، وبروتوتايب الحركة.' },
  'step3.title': { en: 'HARDWARE CODE', ar: 'الهندسة والتكويد' },
  'step3.desc': { en: 'Engineering robust React, Next.js, and WebGL code for ultra-fast performance.', ar: 'برمجة متينة باستخدام React و Next.js و WebGL لأعلى سرعة.' },
  'step4.title': { en: 'SPEED AUDIT', ar: 'فحص الأداء والسرعة' },
  'step4.desc': { en: 'Optimizing render cycles, mobile touch responsiveness, and 99/100 Lighthouse score.', ar: 'تحسين دورات العرض، استجابة اللمس على الهواتف، وأداء 99/100.' },
  'step5.title': { en: 'GLOBAL LAUNCH', ar: 'الإطلاق العالمي' },
  'step5.desc': { en: 'Deploying globally with zero downtime, instant edge CDN routing, and ongoing scaling.', ar: 'نشر الموقع عالمياً بدون توقف مع توجيه شبكات CDN السريعة.' },

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
  'contact.name_place': { en: 'John Doe', ar: 'مثال: محمد أحمد' },
  'contact.email_place': { en: 'john@example.com / +2010...', ar: 'البريد أو الواتساب...' },
  'contact.idea_place': { en: 'Tell us about your brand, website, or custom web application...', ar: 'اكتب لنا تفاصيل موقعك، متجرك، أو فكرتك...' },
  'contact.submit': { en: 'START A PROJECT →', ar: 'إرسال واستشارة مجانية ←' },

  // Footer
  'footer.sub': { en: 'WE BUILD WHAT’S NEXT.', ar: 'نبني مستقبلك الرقمي.' },
  'footer.rights': { en: '© 2026 NEXT GEN DEVS', ar: '© 2026 جميع الحقوق محفوظة لـ NEXT GEN DEVS' }
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
