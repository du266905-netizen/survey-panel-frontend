import * as React from "react"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative grid w-full grid-cols-[0_1fr] items-start gap-y-0.5 rounded-lg border px-4 py-3 text-sm has-[>svg]:grid-cols-[16px_1fr] has-[>svg]:gap-x-3 has-[>[data-slot=alert-action]]:grid-cols-[0_1fr_auto] has-[>svg]:has-[>[data-slot=alert-action]]:grid-cols-[16px_1fr_auto] [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "text-destructive *:data-[slot=alert-description]:text-destructive/90 [&>svg]:text-current",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = React.forwardRef(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert"
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-title"
    className={cn("col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-description"
    className={cn(
      "col-start-2 grid justify-items-start gap-1 text-sm text-muted-foreground [&_p]:leading-relaxed",
      className
    )}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertAction = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-slot="alert-action"
    className={cn("col-start-3 row-span-2 row-start-1 self-start justify-self-end", className)}
    {...props}
  />
))
AlertAction.displayName = "AlertAction"

export { Alert, AlertTitle, AlertDescription, AlertAction }
