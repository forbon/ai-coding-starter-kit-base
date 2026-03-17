"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Command = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("flex flex-col overflow-hidden rounded border bg-white", className)} {...props} />
  )
)
Command.displayName = "Command"

const CommandInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <div className="flex items-center border-b px-3">
      <span className="kern-icon kern-icon--search mr-2 opacity-50" aria-hidden="true" />
      <input ref={ref} className={cn("flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:opacity-50 disabled:cursor-not-allowed disabled:opacity-50", className)} {...props} />
    </div>
  )
)
CommandInput.displayName = "CommandInput"

const CommandList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)} {...props} />
  )
)
CommandList.displayName = "CommandList"

const CommandEmpty = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("py-6 text-center text-sm", className)} {...props} />
  )
)
CommandEmpty.displayName = "CommandEmpty"

const CommandGroup = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { heading?: string }>(
  ({ className, heading, children, ...props }, ref) => (
    <div ref={ref} className={cn("overflow-hidden p-1", className)} {...props}>
      {heading && <div className="kern-label kern-label--small px-2 py-1.5">{heading}</div>}
      {children}
    </div>
  )
)
CommandGroup.displayName = "CommandGroup"

const CommandItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("cursor-pointer rounded px-2 py-1.5 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none flex items-center gap-2", className)} role="option" tabIndex={0} {...props} />
  )
)
CommandItem.displayName = "CommandItem"

const CommandSeparator = React.forwardRef<HTMLHRElement, React.HTMLAttributes<HTMLHRElement>>(
  ({ className, ...props }, ref) => (
    <hr ref={ref} className={cn("kern-divider", className)} aria-hidden="true" {...props} />
  )
)
CommandSeparator.displayName = "CommandSeparator"

const CommandShortcut = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span className={cn("ml-auto text-xs opacity-60", className)} {...props} />
)

const CommandDialog = ({ children, open, onOpenChange, ...props }: React.HTMLAttributes<HTMLDivElement> & { open?: boolean; onOpenChange?: (open: boolean) => void }) => {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={() => onOpenChange?.(false)}>
      <div className="fixed inset-0 bg-black/50" />
      <div className="relative z-50 w-full max-w-lg" onClick={(e) => e.stopPropagation()} {...props}>
        <Command>{children}</Command>
      </div>
    </div>
  )
}

export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator }
