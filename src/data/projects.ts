export type Project = {
  slug: string;
  name: string;
  category: 'Saúde, Estética & Performance' | 'Marcas, Varejo & Experiências';
  tagline: string;
  cover: string;
  videoUrl?: string;
  alt: string;
  featured: boolean;
  metrics?: Array<{ label: string; value: string; source?: string; period?: string }>;
};

// Inserir cases aprovados com arquivos reais, autorização e números comprovados.
export const projects: Project[] = [];

export const portfolioCategories = [
  'Saúde, Estética & Performance',
  'Marcas, Varejo & Experiências',
] as const;
