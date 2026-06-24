import en from './messages/en';
import zh from './messages/zh';

export type Language = 'en-US' | 'zh-CN';

export const translations = {
  'en-US': en,
  'zh-CN': zh,
} as const;

export type TranslationKeys = typeof en;

// Get system language
export function getSystemLanguage(): Language {
  if (typeof navigator === 'undefined') return 'zh-CN';

  const lang =
    navigator.language ||
    (navigator as { userLanguage?: string }).userLanguage ||
    'zh-CN';

  if (lang.startsWith('zh')) return 'zh-CN';
  return 'en-US';
}

export function getDefaultLanguage(): Language {
  try {
    const saved = localStorage.getItem('app-language');
    if (saved === 'en-US' || saved === 'zh-CN') return saved;
  } catch {
    // ignore
  }
  return getSystemLanguage();
}
