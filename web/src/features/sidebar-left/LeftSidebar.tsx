import { NewTaskButton } from './NewTaskButton';
import { ExtensionNav } from './ExtensionNav';
import { ChannelNav } from './ChannelNav';
import { QuickSettings } from './QuickSettings';
import { UserProfile } from './UserProfile';

export function LeftSidebar() {
  return (
    <div className="flex h-full flex-col">
      <NewTaskButton />
      <ExtensionNav className="mt-4" />
      <div className="bg-sidebar-border mx-3 my-3 h-px" />
      <ChannelNav />
      <QuickSettings />
      <UserProfile />
    </div>
  );
}
