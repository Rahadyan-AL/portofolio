"use client";

import { motion } from "motion/react";
import { usePathname } from "next/navigation";

// Efek slide tiap pindah halaman via wheel — key by pathname agar replay
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, x: 48 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
