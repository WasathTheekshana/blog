export interface Education {
  degree: string;
  institution: string;
  year: string;
  description?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description?: string;
}

export interface Social {
  github?: string;
  linkedin?: string;
  website?: string;
  instagram?: string;
  youtube?: string;
}

export interface SiteConfig {
  siteName: string;
  siteDescription: string;
  copyright: string;
}

export interface AboutMe {
  name: string;
  username: string;
  title: string;
  tagline: string;
  bio: string;
  location: string;
  email: string;
  avatar?: string;
  education: Education[];
  experience: Experience[];
  skills: string[];
  interests: string[];
  social: Social;
  siteConfig: SiteConfig;
}
