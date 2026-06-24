import { cn } from '@/shared/lib/utils';
import { WelcomeHero } from './WelcomeHero';
import { ModeSwitch } from './ModeSwitch';
import { AuraOrb } from './AuraOrb';
import { WorkDirPicker } from './WorkDirPicker';
import { VoiceInput } from './VoiceInput';

export function MainPanel() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 px-8">
      <WelcomeHero />
      <ModeSwitch />
      <AuraOrb />
      <WorkDirPicker />
      <div className="w-full max-w-2xl">
        <VoiceInput />
      </div>
    </div>
  );
}
