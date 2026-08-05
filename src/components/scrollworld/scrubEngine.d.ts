export interface ScrollWorldSectionConfig {
  id?: string;
  label?: string;
  still?: string;
  stillMobile?: string;
  clip?: string;
  clipMobile?: string;
  accent?: string;
  scroll?: number;
  linger?: number;
  eyebrow?: string;
  title?: string;
  body?: string;
  tags?: string[];
  cta?: {
    primary?: { label: string; href?: string };
    secondary?: { label: string; href?: string };
  };
}

export interface ScrollWorldConfig {
  brand?: { name?: string; href?: string };
  cta?: { label?: string; href?: string };
  hint?: string;
  diveScroll?: number;
  connScroll?: number;
  crossfade?: number;
  nav?: boolean;
  atmosphere?: boolean;
  sections?: ScrollWorldSectionConfig[];
  connectors?: (string | null)[];
  connectorsMobile?: (string | null)[];
}

export function mountScrollWorld(
  container: HTMLElement,
  config: ScrollWorldConfig
): () => void;
