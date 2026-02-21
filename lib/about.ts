import aboutData from "@/data/aboutme.json";
import type { AboutMe } from "@/types/about";

export function getAboutMe(): AboutMe {
  return aboutData as AboutMe;
}

export function getSiteConfig() {
  return aboutData.siteConfig;
}

export function getSocial() {
  return aboutData.social;
}

export function getBasicInfo() {
  return {
    name: aboutData.name,
    username: aboutData.username,
    title: aboutData.title,
    tagline: aboutData.tagline,
    bio: aboutData.bio,
    location: aboutData.location,
    email: aboutData.email,
    avatar: aboutData.avatar,
  };
}
