import React, { createContext, useContext, useState, useEffect } from 'react';

export type LanguageMode = 'EN' | 'AR';

interface LanguageContextType {
  lang: LanguageMode;
  toggleLanguage: () => void;
  t: (enText: string, arText: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: 'EN',
  toggleLanguage: () => {},
  t: (enText: string) => enText
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLang] = useState<LanguageMode>('EN');

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'EN' ? 'AR' : 'EN'));
  };

  const t = (enText: string, arText: string) => {
    return lang === 'AR' ? arText : enText;
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
