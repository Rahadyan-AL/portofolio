"use client";

import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { Meteors } from "@/components/ui/meteors";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AuroraText } from "@/components/ui/aurora-text"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { TextAnimate } from "@/components/ui/text-animate"
import { LightRays } from "@/components/ui/light-rays"


export default function Home() {
  const router = useRouter();
  const title = "My personal website";

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-zinc-950 text-white">
      
      <LightRays count={2} className="pointer-events-none absolute inset-0 z-0" />

      <Meteors number={70} className="pointer-events-none absolute inset-0 z-10" />

      <div className="relative z-20 flex min-h-screen flex-col items-center justify-center gap-6">

        <h1 className="text-center">
          <TypingAnimation
            duration={200}
            showCursor={false}
            className="text-3xl font-medium text-white md:text-5xl"
          >
            Welcome to
          </TypingAnimation>

          <span className="block" />

          <TextAnimate
            by="character"
            animation="slideLeft"
            duration={0.5}
            delay={0.2}
            startOnView={false}
            className="block text-3xl font-bold md:text-5xl"
            accessible={false}
          >
            My personal website
          </TextAnimate>
        </h1>



        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35 }}
          className="mt-4"
        >
          <RainbowButton
            onClick={() => router.push("/landing")}
            className="bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-700"
          >
            Get Started
          </RainbowButton>
        </motion.div>
      </div>

    </div>
  );
}
