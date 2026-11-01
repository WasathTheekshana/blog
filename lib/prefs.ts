export const THEMES = [
  { id: "amber", label: "Amber" },
  { id: "paper", label: "Paper (light)" },
  { id: "matrix", label: "Green phosphor" },
  { id: "dracula", label: "Dracula" },
  { id: "contrast", label: "High contrast" },
] as const;

export const FONTS = [
  { id: "sans", label: "Sans" },
  { id: "mono", label: "Mono" },
  { id: "hyper", label: "Hyperlegible" },
] as const;

export const SIZES = [
  { id: "m", label: "Default" },
  { id: "l", label: "Large" },
  { id: "xl", label: "Larger" },
  { id: "xxl", label: "Largest" },
] as const;

export type PrefKey = "theme" | "font" | "size";

export const PREF_OPTIONS: Record<PrefKey, readonly { id: string; label: string }[]> = {
  theme: THEMES,
  font: FONTS,
  size: SIZES,
};

export const PREF_DEFAULTS: Record<PrefKey, string> = { theme: "matrix", font: "sans", size: "m" };

/**
 * Runs in <head> before first paint so the saved choice never flashes the wrong theme.
 * With nothing saved it follows the OS: high contrast first, then light, else the green phosphor terminal.
 */
export const PREFS_BOOT_SCRIPT = `(function(){try{var d=document.documentElement;function g(k){try{return localStorage.getItem("pref-"+k)}catch(e){return null}}var t=g("theme");if(!t){t=matchMedia("(prefers-contrast: more)").matches?"contrast":matchMedia("(prefers-color-scheme: light)").matches?"paper":"matrix"}d.dataset.theme=t;d.dataset.font=g("font")||"sans";d.dataset.size=g("size")||"m"}catch(e){}})();`;
