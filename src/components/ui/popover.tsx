"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  triggerRef: React.RefObject<HTMLButtonElement | null>
}

const PopoverContext = React.createContext<PopoverContextValue | null>(null)

function Popover({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const open = controlledOpen ?? internalOpen

  const setOpen = React.useCallback((value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
  }, [onOpenChange])

  return (
    <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
      <div className="relative inline-block">{children}</div>
    </PopoverContext.Provider>
  )
}

function PopoverTrigger({ children, className, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen, triggerRef } = React.useContext(PopoverContext)!
  return (
    <button
      type="button"
      ref={triggerRef}
      className={className}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
      {...props}
    >
      {children}
    </button>
  )
}

const PopoverContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end"; sideOffset?: number }>(
  ({ className, align = "center", children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(PopoverContext)!
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (!open) return
      const handleClickOutside = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) {
          setOpen(false)
        }
      }
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [open, setOpen])

    if (!open) return null

    const alignClass = {
      start: "left-0",
      center: "left-1/2 -translate-x-1/2",
      end: "right-0",
    }[align]

    return (
      <div
        ref={(node) => {
          (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={cn("absolute z-50 mt-2 min-w-[8rem] rounded border bg-white p-4 shadow-md", alignClass, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent }
