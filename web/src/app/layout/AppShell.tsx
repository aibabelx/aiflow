import { type ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface AppShellProps {
  leftSidebar: ReactNode;
  mainPanel: ReactNode;
  className?: string;
}

export function AppShell({ leftSidebar, mainPanel, className }: AppShellProps) {
  return (
    <div className={cn('bg-background flex h-screen w-screen overflow-hidden', className)}>
      {/* Left Sidebar */}
      <aside className="bg-sidebar border-sidebar-border flex w-52 shrink-0 flex-col border-r">
        {leftSidebar}
      </aside>

      {/* Main Panel */}
      <main className="flex flex-1 flex-col overflow-hidden">{mainPanel}</main>
    </div>
  );
}
