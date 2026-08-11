"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Meteors } from "@/components/ui/meteors";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { AuroraText } from "@/components/ui/aurora-text"
import { TextAnimate } from "@/components/ui/text-animate"


export default function Home() {
  const router = useRouter();
  const title = "My personal website";

  return (
    <div className="relative isolate min-h-screen overflow-hidden bg-zinc-950 text-white">
      <div className="pointer-events-none absolute inset-0 z-0">
        <Meteors number={45} />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center gap-6">

        <h1 className="text-center">
          <TypingAnimation
            showCursor={false}
            className="text-3xl font-medium text-white md:text-5xl"
          >
            Welcome to
          </TypingAnimation>

          <span className="block" />

          <AuroraText className="text-3xl font-bold md:text-5xl">
            
              My personal website
            
          </AuroraText>
        </h1>



        <Button
          onClick={() => router.push("/landing")}
          className="mt-4 bg-blue-500 px-6 py-3 text-lg font-bold text-white hover:bg-blue-700"
        >
          Get Started
        </Button>
      </div>

    </div>
  );
}
