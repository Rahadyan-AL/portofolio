"use client";

import { I18nProvider } from "@/lib/i18n";
import { IntroFlow } from "@/components\/intro/IntroFlow";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <I18nProvider>
      <IntroFlow>{children}</IntroFlow>
    </I18nProvider>
  );
}
