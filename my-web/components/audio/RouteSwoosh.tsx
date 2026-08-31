"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { playSwoosh } from "@/lib/audio";

export function RouteSwoosh() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    playSwoosh();
  }, [pathname]);

  return null;
}
