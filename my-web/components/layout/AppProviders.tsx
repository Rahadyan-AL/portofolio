"use client";

import { I18nProvider } from "@/lib/i18n";
import { IntroFlow } from "@/components/intro/IntroFlow";
import { AchievementProvider } from "@/components/achievements/AchievementContext";
import { CollectiblesProvider } from "@/components/collectibles/CollectiblesContext";
import { TerminalProvider } from "@/components/terminal/TerminalProvider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <AchievementProvider>
        <CollectiblesProvider>
          <TerminalProvider>
            <IntroFlow>{children}</IntroFlow>
          </TerminalProvider>
        </CollectiblesProvider>
      </AchievementProvider>
    </I18nProvider>
  );
}
