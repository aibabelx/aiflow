import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

interface ExtensionNavProps {
  className?: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

function NavItem({ icon, label, active, onClick }: NavItem) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'hover:bg-sidebar-accent flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
        active
          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
          : 'text-sidebar-foreground/70',
      )}
    >
      {icon}
      <span className="truncate">{label}</span>
    </button>
  );
}

export function ExtensionNav({ className }: ExtensionNavProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex flex-col gap-0.5 px-3', className)}>
      <p className="text-muted-foreground mb-1 px-3 text-[11px] font-medium uppercase tracking-wider">
        {t.common.extensions}
      </p>
      <NavItem
        icon={<TimerIcon className="text-sidebar-foreground/50 size-4" />}
        label={t.common.scheduledTasks}
      />
      <NavItem
        icon={<ChannelIcon className="text-sidebar-foreground/50 size-4" />}
        label={t.common.imChannel}
      />
    </div>
  );
}

function TimerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function ChannelIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
    </svg>
  );
}
