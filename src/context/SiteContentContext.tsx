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
