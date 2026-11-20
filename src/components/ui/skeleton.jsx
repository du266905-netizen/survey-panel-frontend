import * as React from "react"

import { cn } from "@/lib/utils"

/* Fog #F7F7F7 sits on white at 1.05:1 — invisible. Warm grey #E8E5E1
   is the nearest tone in the same card that actually reads as a placeholder. */
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-[#E8E5E1]", className)}
      {...props}
    />
  )
}

export { Skeleton }
