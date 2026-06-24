import { cn } from '@/shared/lib/utils';
import { useLanguage } from '@/shared/providers/language-provider';
import { useTheme } from '@/shared/providers/theme-provider';

export function HomePage() {
  const { t, language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center p-4">
      {/* Top-right controls */}
      <div className="fixed top-4 right-4 flex items-center gap-3">
        {/* Language Switch */}
        <div className="bg-muted flex items-center gap-1 rounded-full p-1">
          <button
            onClick={() => setLanguage('zh-CN')}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
              language === 'zh-CN'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.common.languageZh}
          </button>
          <button
            onClick={() => setLanguage('en-US')}
            className={cn(
              'rounded-full px-3 py-1.5 text-sm font-medium transition-all',
              language === 'en-US'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {t.common.languageEn}
          </button>
        </div>

        {/* Theme Switch */}
        <div className="bg-muted flex items-center gap-1 rounded-full p-1">
          <button
            onClick={() => setTheme('light')}
            title={t.common.themeLight}
            className={cn(
              'rounded-full p-2 transition-all',
              theme === 'light'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {/* Sun icon */}
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </button>
          <button
            onClick={() => setTheme('dark')}
            title={t.common.themeDark}
            className={cn(
              'rounded-full p-2 transition-all',
              theme === 'dark'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {/* Moon icon */}
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          </button>
          <button
            onClick={() => setTheme('system')}
            title={t.common.themeSystem}
            className={cn(
              'rounded-full p-2 transition-all',
              theme === 'system'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {/* Monitor icon */}
            <svg
              className="size-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <h1 className="text-foreground text-center font-serif text-4xl font-normal tracking-tight md:text-5xl">
        {t.common.appName}
      </h1>
      <p className="text-muted-foreground mt-4 text-center text-lg">
        {t.common.welcome}
      </p>
    </div>
  );
}
