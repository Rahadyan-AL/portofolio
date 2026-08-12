"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Meteors } from "@/components/ui/meteors";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AuroraText } from "@/components/ui/aurora-text"
import { RainbowButton } from "@/components/ui/rainbow-button"
import { TextAnimate } from "@/components/ui/text-animate"
import { LightRays } from "@/components/ui/light-rays"
import { SparklesText } from "@/components/ui/sparkles-text"
import { DiaTextReveal } from "@/components/ui/dia-text-reveal"


export default function Home() {
  const router = useRouter();



  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-zinc-950 text-white">
      <LightRays />
      <div className="pointer-events-none absolute inset-0 z-0">
        <Meteors number={70} />
      </div>


      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6">

        <h1 className="text-center text-3xl font-bold md:text-5xl">
          <AuroraText>Welcome to My website {""}</AuroraText>
          
        </h1>


        <RainbowButton
          onClick={() => router.push("/landing")}
          className="mt-4 bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-700"
        >Get Started
        </RainbowButton>
      </div>

    </div>
  );
}
