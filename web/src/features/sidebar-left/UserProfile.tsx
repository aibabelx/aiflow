import { useState } from 'react';
import { useLanguage } from '@/shared/providers/language-provider';
import { SettingsMenu } from './SettingsMenu';
import { cn } from '@/shared/lib/utils';

interface UserProfileProps {
  className?: string;
}

export function UserProfile({ className }: UserProfileProps) {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className={cn('relative border-t border-sidebar-border p-3', className)}>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="hover:bg-sidebar-accent flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors"
      >
        {/* Avatar */}
        <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-full">
          <span className="text-primary text-sm font-semibold">Y</span>
        </div>
        {/* Info */}
        <div className="min-w-0 flex-1">
          <p className="text-sidebar-foreground truncate text-sm font-medium">
            yunzhao tang
          </p>
          <p className="text-muted-foreground text-xs">{t.common.freePlan}</p>
        </div>
        {/* Chevron */}
        <ChevronUpIcon
          className={cn(
            'text-muted-foreground size-4 shrink-0 transition-transform',
            menuOpen && 'rotate-180',
          )}
        />
      </button>

      <SettingsMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </div>
  );
}

function ChevronUpIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 15.75 7.5-7.5 7.5 7.5" />
    </svg>
  );
}
