import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SITE_CONTENT, subscribeSiteContent, saveSiteContent } from '../services/siteContentService';

interface SiteContentContextType {
  content: Record<string, string>;
  getText: (key: string, fallback?: string) => string;
  updateText: (key: string, value: string) => Promise<void>;
  saveAllContent: (newContent: Record<string, string>) => Promise<void>;
  isAdminOpen: boolean;
  setAdminOpen: (open: boolean) => void;
}

const SiteContentContext = createContext<SiteContentContextType>({
  content: DEFAULT_SITE_CONTENT,
  getText: (key: string, fallback?: string) => fallback || DEFAULT_SITE_CONTENT[key] || key,
  updateText: async () => {},
  saveAllContent: async () => {},
  isAdminOpen: false,
  setAdminOpen: () => {}
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<Record<string, string>>(DEFAULT_SITE_CONTENT);
  const [isAdminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    // Subscribe to live Firebase Firestore site content updates
    const unsubscribe = subscribeSiteContent((fetchedContent) => {
      setContent(fetchedContent);
    });

    return () => unsubscribe();
  }, []);

  // Listen to URL hash or query params to auto-open admin modal via link (#admin or ?admin=true or /admin)
  useEffect(() => {
    const checkAdminUrl = () => {
      const hash = window.location.hash;
      const search = window.location.search;
      const pathname = window.location.pathname;

      if (
        hash === '#admin' ||
        search.includes('admin=true') ||
        pathname.endsWith('/admin')
      ) {
        setAdminOpen(true);
      }
    };

    checkAdminUrl();
    window.addEventListener('hashchange', checkAdminUrl);
    window.addEventListener('popstate', checkAdminUrl);

    // Hidden Keyboard Shortcut (Ctrl + Shift + A) for secret admin access
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        setAdminOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminUrl);
      window.removeEventListener('popstate', checkAdminUrl);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getText = (key: string, fallback?: string): string => {
    if (content[key] !== undefined && content[key] !== '') {
      return content[key];
    }
    if (fallback !== undefined) {
      return fallback;
    }
    return DEFAULT_SITE_CONTENT[key] || key;
  };

  const updateText = async (key: string, value: string) => {
    const updated = { ...content, [key]: value };
    setContent(updated);
    await saveSiteContent({ [key]: value });
  };

  const saveAllContent = async (newContent: Record<string, string>) => {
    setContent(newContent);
    await saveSiteContent(newContent);
  };

  return (
    <SiteContentContext.Provider
      value={{
        content,
        getText,
        updateText,
        saveAllContent,
        isAdminOpen,
        setAdminOpen
      }}
    >
      {children}
    </SiteContentContext.Provider>
  );
};

export const useSiteContent = () => useContext(SiteContentContext);
