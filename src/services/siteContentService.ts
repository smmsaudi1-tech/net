import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';

const CONTENT_DOC_PATH = ['site_content', 'main'];

// Default Site Text Dictionary
export const DEFAULT_SITE_CONTENT: Record<string, string> = {
  // Brand & Nav
  'brand.name': 'NEXT GEN DEVS',
  'nav.work': 'WORK',
  'nav.services': 'SERVICES',
  'nav.process': 'PROCESS',
  'nav.about': 'ABOUT',
  'nav.contact': 'CONTACT',

  // Hero Section
  'hero.tag': 'CREATIVE TECHNOLOGY STUDIO // 2026',
  'hero.h1': 'WE BUILD WHAT’S NEXT.',
  'hero.desc': 'Next Gen Devs is a creative technology team building modern websites, luxury e-commerce experiences and digital products.',
  'hero.cta.start': 'START A PROJECT',
  'hero.cta.explore': 'EXPLORE OUR WORK',
  'hero.spline_url': 'https://prod.spline.design/r60kLlhxPc0YkOJC/scene.splinecode',

  // Kinetic Marquee
  'marquee.text1': 'NEXT GEN DEVS // CREATIVE TECHNOLOGY STUDIO // WE BUILD WHAT’S NEXT // 2026 PRODUCTION //',
  'marquee.text2': 'HTML5 // CSS3 // REACT // NEXT.JS // THREE.JS // GSAP // TAILWIND // FIREBASE //',

  // Brand Statement
  'statement.tag': '// OUR PHILOSOPHY',
  'statement.w1': 'IDEAS',
  'statement.w2': 'DESERVE',
  'statement.w3': 'BETTER',
  'statement.w4': 'DIGITAL',
  'statement.w5': 'EXPERIENCES.',

  // Services
  'services.tag': '// CORE CAPABILITIES',
  'services.title': 'WHAT WE BUILD',
  'services.count': '[ 05 SPECIALIZED DISCIPLINES ]',
  'srv1.title': 'WEBSITE DEVELOPMENT',
  'srv1.desc': 'Bespoke websites built with React, Next.js, and Three.js 3D WebGL scenes.',
  'srv2.title': 'E-COMMERCE STORES',
  'srv2.desc': 'Luxury digital storefronts, custom checkout flows, payment gateways, and inventory sync.',
  'srv3.title': 'WEB APPLICATIONS & AI CHATBOTS',
  'srv3.desc': 'Fullstack cloud web platforms, custom AI chatbots, digital menus with QR codes, and SaaS portals.',
  'srv4.title': 'UI / UX DESIGN SYSTEMS',
  'srv4.desc': 'Human-centered minimalist luxury design systems, wireframing, and motion prototypes.',
  'srv5.title': 'BRAND DIGITAL EXPERIENCE',
  'srv5.desc': 'Complete brand positioning, 3D interactive showcases, sound design, and launch strategies.',

  // Work & Portfolio
  'work.tag': '// GSAP SCROLL-ANIMATED PRODUCTIONS',
  'work.title': 'SELECTED WORK',
  'work.count': '[ LIVE PRODUCTIONS ]',

  // Roadmap & Process
  'roadmap.tag': '// GSAP PINNED HORIZONTAL ROADMAP',
  'roadmap.title': 'FROM IDEA TO DIGITAL',
  'process.tag': '// METHODOLOGY',
  'process.title': 'OUR PROCESS',

  // Tech Stack & About
  'tech.tag': '// PROGRAMMING ENGINE & TECH STACK',
  'tech.title': 'CODE & TECH MATRIX',
  'about.tag': '// ABOUT NEXT GEN DEVS',
  'about.title': 'WE ARE NEXT GEN.',
  'about.desc': 'We are a young team of developers and designers focused on turning ambitious ideas into fast, modern and memorable digital experiences.',
  'about.stat1_num': '50+',
  'about.stat1_label': 'PROJECTS LAUNCHED',
  'about.stat2_num': '30+',
  'about.stat2_label': 'BRANDS EMPOWERED',

  // Contact & Footer
  'contact.tag': '// START A PROJECT',
  'contact.h1_1': 'LET’S BUILD',
  'contact.h1_2': 'WHAT’S NEXT.',
  'contact.desc': 'Have an idea? Let’s turn it into something people remember.',
  'contact.submit': 'START A PROJECT →',
  'footer.sub': 'WE BUILD WHAT’S NEXT.',
  'footer.rights': '© 2026 NEXT GEN DEVS. ALL RIGHTS RESERVED.'
};

// Real-time listener for site content changes from Firebase
export const subscribeSiteContent = (onUpdate: (content: Record<string, string>) => void) => {
  try {
    const contentRef = doc(db, CONTENT_DOC_PATH[0], CONTENT_DOC_PATH[1]);
    return onSnapshot(
      contentRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data() as Record<string, string>;
          onUpdate({ ...DEFAULT_SITE_CONTENT, ...data });
        } else {
          onUpdate(DEFAULT_SITE_CONTENT);
        }
      },
      (error) => {
        console.warn('Firestore site content real-time listener notice:', error);
        onUpdate(DEFAULT_SITE_CONTENT);
      }
    );
  } catch (err) {
    console.warn('Error subscribing to site content:', err);
    onUpdate(DEFAULT_SITE_CONTENT);
    return () => {};
  }
};

// Save updated site content texts object to Firebase Firestore
export const saveSiteContent = async (updatedTexts: Record<string, string>): Promise<void> => {
  try {
    const contentRef = doc(db, CONTENT_DOC_PATH[0], CONTENT_DOC_PATH[1]);
    await setDoc(contentRef, updatedTexts, { merge: true });
  } catch (err) {
    console.error('Error saving site content to Firebase Firestore:', err);
    throw err;
  }
};
