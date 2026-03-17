"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

function TooltipProvider({ children }: { children: React.ReactNode; delayDuration?: number }) {
  return <>{children}</>
}

function Tooltip({ children }: { children: React.ReactNode }) {
  return <div className="relative inline-block">{children}</div>
}

function TooltipTrigger({ children, className, asChild, ...props }: React.HTMLAttributes<HTMLSpanElement> & { asChild?: boolean }) {
  return <span className={cn("cursor-pointer", className)} {...props}>{children}</span>
}

const TooltipContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { sideOffset?: number; side?: string }>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      role="tooltip"
      className={cn("absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 rounded bg-gray-900 px-3 py-1.5 text-xs text-white shadow-md whitespace-nowrap", className)}
      {...props}
    >
      {children}
    </div>
  )
)
TooltipContent.displayName = "TooltipContent"

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
