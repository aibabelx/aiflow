import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

interface NewTaskButtonProps {
  onClick?: () => void;
  className?: string;
}

export function NewTaskButton({ onClick, className }: NewTaskButtonProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      className={cn(
        'bg-primary text-primary-foreground hover:bg-primary/90 mx-3 mt-3 flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors',
        className,
      )}
    >
      <PlusIcon className="size-4" />
      <span>{t.common.newTask}</span>
    </button>
  );
}

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
}
