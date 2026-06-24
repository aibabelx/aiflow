import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

interface VoiceInputProps {
  className?: string;
}

export function VoiceInput({ className }: VoiceInputProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex flex-col items-center gap-3', className)}>
      {/* Text input bar */}
      <div className="bg-muted/60 border-input flex w-full max-w-2xl items-center gap-3 rounded-2xl border px-4 py-3 shadow-sm transition-colors">
        <button className="text-muted-foreground hover:text-foreground shrink-0 transition-colors">
          <PlusCircleIcon className="size-5" />
        </button>
        <input
          type="text"
          placeholder={t.common.typePlaceholder}
          className="bg-transparent flex-1 text-sm placeholder:text-muted-foreground/60 outline-none"
        />
        <div className="flex items-center gap-1">
          <kbd className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] font-medium">
            /
          </kbd>
          <kbd className="bg-muted text-muted-foreground rounded px-1.5 py-0.5 text-[10px] font-medium">
            @
          </kbd>
        </div>
        <button className="text-muted-foreground hover:text-foreground shrink-0 transition-colors">
          <MicIcon className="size-5" />
        </button>
      </div>

      {/* Voice hint */}
      <div className="flex items-center gap-2">
        <MicIcon className="text-muted-foreground/50 size-3.5" />
        <p className="text-muted-foreground/60 text-xs">{t.common.voiceHint}</p>
      </div>
    </div>
  );
}

function PlusCircleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function MicIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
  );
}
