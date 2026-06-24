import { useLanguage } from '@/shared/providers/language-provider';
import { useTheme } from '@/shared/providers/theme-provider';
import { cn } from '@/shared/lib/utils';

export function QuickSettings() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  return (
    <div className="border-t border-sidebar-border px-3 py-2">
      {/* Language */}
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground flex-1 text-[11px] font-medium uppercase tracking-wider">
          {t.common.language}
        </span>
        <div className="bg-muted flex items-center gap-0.5 rounded-full p-0.5">
          {(['zh-CN', 'en-US'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={cn(
                'rounded-full px-2.5 py-0.5 text-[11px] font-medium transition-all',
                language === lang
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {lang === 'zh-CN' ? '中' : 'EN'}
            </button>
          ))}
        </div>
      </div>

      {/* Theme */}
      <div className="mt-2 flex items-center gap-2">
        <span className="text-muted-foreground flex-1 text-[11px] font-medium uppercase tracking-wider">
          {t.common.theme}
        </span>
        <div className="bg-muted flex items-center gap-0.5 rounded-full p-0.5">
          {(['light', 'dark', 'system'] as const).map((th) => (
            <button
              key={th}
              onClick={() => setTheme(th)}
              title={
                th === 'light' ? t.common.themeLight :
                th === 'dark' ? t.common.themeDark :
                t.common.themeSystem
              }
              className={cn(
                'rounded-full p-1 transition-all',
                theme === th
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {th === 'light' ? <SunIcon className="size-3" /> :
               th === 'dark' ? <MoonIcon className="size-3" /> :
               <MonitorIcon className="size-3" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
    </svg>
  );
}
function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  );
}
function MonitorIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}
