import { useState } from 'react';
import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

type Mode = 'general' | 'flagship';

interface ModeSwitchProps {
  value?: Mode;
  onChange?: (mode: Mode) => void;
  className?: string;
}

export function ModeSwitch({ value, onChange, className }: ModeSwitchProps) {
  const { t } = useLanguage();
  const [internalValue, setInternalValue] = useState<Mode>('general');
  const mode = value ?? internalValue;

  const handleChange = (m: Mode) => {
    setInternalValue(m);
    onChange?.(m);
  };

  return (
    <div
      className={cn(
        'bg-muted flex items-center gap-1 rounded-full p-1',
        className,
      )}
      role="radiogroup"
    >
      <button
        role="radio"
        aria-checked={mode === 'general'}
        onClick={() => handleChange('general')}
        className={cn(
          'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
          mode === 'general'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <SparklesIcon className="size-4" />
        {t.common.modeGeneral}
      </button>
      <button
        role="radio"
        aria-checked={mode === 'flagship'}
        onClick={() => handleChange('flagship')}
        className={cn(
          'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
          mode === 'flagship'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground',
        )}
      >
        <StarIcon className="size-4" />
        {t.common.modeFlagship}
      </button>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
    </svg>
  );
}
