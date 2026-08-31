"use client";

import { I18nProvider } from "@/lib/i18n";
import { IntroFlow } from "@/components/intro/IntroFlow";
import { AchievementProvider } from "@/components/achievements/AchievementContext";
import { CollectiblesProvider } from "@/components/collectibles/CollectiblesContext";
import { TerminalProvider } from "@/components/terminal/TerminalProvider";
import { AudioProvider } from "@/components/audio/AudioProvider";
import { RouteSwoosh } from "@/components/audio/RouteSwoosh";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <AudioProvider>
        <AchievementProvider>
          <CollectiblesProvider>
            <TerminalProvider>
              <RouteSwoosh />
              <IntroFlow>{children}</IntroFlow>
            </TerminalProvider>
          </CollectiblesProvider>
        </AchievementProvider>
      </AudioProvider>
    </I18nProvider>
  );
}
