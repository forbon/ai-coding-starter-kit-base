"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CollapsibleProps extends React.HTMLAttributes<HTMLDetailsElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Collapsible = React.forwardRef<HTMLDetailsElement, CollapsibleProps>(
  ({ className, open, onOpenChange, ...props }, ref) => {
    const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
      onOpenChange?.((e.target as HTMLDetailsElement).open)
    }
    return (
      <details
        ref={ref}
        className={cn("kern-accordion", className)}
        open={open}
        onToggle={handleToggle}
        {...props}
      />
    )
  }
)
Collapsible.displayName = "Collapsible"

const CollapsibleTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <summary ref={ref as React.Ref<HTMLElement>} className={cn("kern-accordion__header cursor-pointer", className)} {...props} />
  )
)
CollapsibleTrigger.displayName = "CollapsibleTrigger"

const CollapsibleContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("kern-accordion__body", className)} {...props} />
  )
)
CollapsibleContent.displayName = "CollapsibleContent"

export { Collapsible, CollapsibleTrigger, CollapsibleContent }
