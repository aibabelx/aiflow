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
  if (typeof navigator === 'undefined') return 'en-US';

  const lang =
    navigator.language ||
    (navigator as { userLanguage?: string }).userLanguage ||
    'en-US';

  // Check if Chinese
  if (lang.startsWith('zh')) {
    return 'zh-CN';
  }

  return 'en-US';
}
