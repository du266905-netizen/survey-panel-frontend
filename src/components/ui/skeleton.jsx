import * as React from "react"

import { cn } from "@/lib/utils"

/* Fog #F7F7F7 is the only loading placeholder tone in the colour card. */
function Skeleton({ className, ...props }) {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-[#F7F7F7]", className)}
      {...props}
    />
  )
}

export { Skeleton }
