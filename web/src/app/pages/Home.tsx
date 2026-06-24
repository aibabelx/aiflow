import { AppShell } from '@/app/layout/AppShell';
import { LeftSidebar } from '@/features/sidebar-left/LeftSidebar';
import { MainPanel } from '@/features/main/MainPanel';

export function HomePage() {
  return (
    <AppShell
      leftSidebar={<LeftSidebar />}
      mainPanel={<MainPanel />}
    />
  );
}
