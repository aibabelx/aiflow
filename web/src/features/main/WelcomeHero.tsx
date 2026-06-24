import { useLanguage } from '@/shared/providers/language-provider';
import { cn } from '@/shared/lib/utils';

interface WelcomeHeroProps {
  className?: string;
}

export function WelcomeHero({ className }: WelcomeHeroProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex flex-col items-center text-center', className)}>
      <h1 className="text-foreground font-serif text-3xl font-medium tracking-tight md:text-4xl">
        {t.common.welcome}
      </h1>
      <p className="text-muted-foreground mt-3 max-w-lg text-sm leading-relaxed">
        {t.common.subtitle}
      </p>
      <p className="text-muted-foreground/60 mt-2 max-w-md text-xs leading-relaxed">
        {t.common.description}
      </p>
    </div>
  );
}
