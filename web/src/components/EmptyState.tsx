import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function EmptyState({ icon, title, description, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-2 px-4 py-12 text-center', className)}>
      {icon && (
        <div className="text-muted-foreground/40 mb-2">{icon}</div>
      )}
      <p className="text-muted-foreground text-sm">{title}</p>
      {description && (
        <p className="text-muted-foreground/60 max-w-[220px] text-xs leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
