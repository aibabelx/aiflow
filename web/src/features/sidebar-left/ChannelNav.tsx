import { useLanguage } from '@/shared/providers/language-provider';
import { EmptyState } from '@/components/EmptyState';
import { cn } from '@/shared/lib/utils';

interface ChannelNavProps {
  className?: string;
}

export function ChannelNav({ className }: ChannelNavProps) {
  const { t } = useLanguage();

  return (
    <div className={cn('flex flex-1 flex-col overflow-hidden', className)}>
      <div className="flex items-center justify-between px-6 py-2">
        <p className="text-muted-foreground text-[11px] font-medium uppercase tracking-wider">
          {t.common.imChannel}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto px-3">
        <EmptyState
          icon={<MessageIcon className="size-8" />}
          title={t.common.noChannels}
        />
      </div>
    </div>
  );
}

function MessageIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
    </svg>
  );
}
