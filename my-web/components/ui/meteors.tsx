"use client"

import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

interface MeteorsProps {
  number?: number
  minDelay?: number
  maxDelay?: number
  minDuration?: number
  maxDuration?: number
  angle?: number
  className?: string
}

export const Meteors = ({
  number = 20,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 2,
  maxDuration = 10,
  angle = 215,
  className,
}: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  )

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      "--angle": -angle + "deg",
      // use viewport height units so meteors spawn across full height of the screen
      top: `${Math.floor(Math.random() * 120) - 10}vh`,
      left: `${Math.floor(Math.random() * 100)}vw`,
      // pick a random duration and offset the delay by duration so many meteors
      // start already in-flight (negative delay) — reduces initial idle gap
      animationDuration:
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) + "s",
      animationDelay:
        Math.floor(Math.random() * (maxDelay - minDelay) + minDelay) -
        Math.floor(Math.random() * (maxDuration - minDuration) + minDuration) +
        "s",
    }))
    setMeteorStyles(styles)
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle])

  return (
    // absolute full-size container so meteors fill the parent area
    <div className={cn("absolute inset-0 z-0 pointer-events-none overflow-hidden", className)}>
      {[...meteorStyles].map((style, idx) => (
        // Meteor Head
        <span
          key={idx}
          style={{ ...style }}
          className={cn(
            // rotate using CSS variable (Tailwind arbitrary value)
            "animate-meteor pointer-events-none absolute size-0.5 rotate-[var(--angle)] rounded-full bg-zinc-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
        >
          {/* Meteor Tail */}
          <div className="pointer-events-none absolute top-1/2 -z-10 h-px w-12.5 -translate-y-1/2 bg-linear-to-r from-zinc-500 to-transparent" />
        </span>
      ))}
    </div>
  )
}
