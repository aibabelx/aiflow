import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

interface WorkDirPickerProps {
  path?: string;
  onSelect?: () => void;
  className?: string;
}

export function WorkDirPicker({ path, onSelect, className }: WorkDirPickerProps) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onSelect}
      className={cn(
        'hover:bg-muted flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors',
        className,
      )}
    >
      <FolderIcon className="text-muted-foreground size-4" />
      {path ? (
        <span className="text-foreground truncate max-w-[200px]">{path}</span>
      ) : (
        <span className="text-muted-foreground">{t.common.workDir}</span>
      )}
    </button>
  );
}

function FolderIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  );
}
