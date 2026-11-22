// Appearance: 'auto' follows the system; 'light' / 'dark' are a visitor's explicit choice.
// The choice lives in html[data-theme] (set before paint by an inline script in Base.astro)
// and in localStorage. Anything theme-aware listens for the 'themechange' event on document.

export type Appearance = 'auto' | 'light' | 'dark';

const KEY = 'theme';
const root = document.documentElement;
const systemLight = window.matchMedia('(prefers-color-scheme: light)');

export function getAppearance(): Appearance {
  const t = root.dataset.theme;
  return t === 'light' || t === 'dark' ? t : 'auto';
}

/** The theme actually on screen. */
export function effectiveTheme(): 'light' | 'dark' {
  const a = getAppearance();
  if (a !== 'auto') return a;
  return systemLight.matches ? 'light' : 'dark';
}

function syncThemeColor() {
  const a = getAppearance();
  document.querySelectorAll<HTMLMetaElement>('meta[data-theme-color]').forEach((m) => {
    const own = m.dataset.themeColor === 'light' ? '#ffffff' : '#000000';
    // With an explicit choice both metas carry it; in auto each keeps its own media query.
    m.content = a === 'auto' ? own : a === 'light' ? '#ffffff' : '#000000';
  });
}

export function setAppearance(a: Appearance) {
  if (a === 'auto') delete root.dataset.theme;
  else root.dataset.theme = a;
  try {
    if (a === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, a);
  } catch {
    /* storage unavailable: the choice lasts for this page only */
  }
  syncThemeColor();
  document.dispatchEvent(new CustomEvent('themechange', { detail: { appearance: a, theme: effectiveTheme() } }));
}

export function initTheme() {
  syncThemeColor();
  systemLight.addEventListener('change', () => {
    if (getAppearance() === 'auto') {
      document.dispatchEvent(new CustomEvent('themechange', { detail: { appearance: 'auto', theme: effectiveTheme() } }));
    }
  });
}
