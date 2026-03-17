"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DropdownMenuContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue>({ open: false, setOpen: () => {} })

function DropdownMenu({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = React.useCallback((value: boolean) => { setInternalOpen(value); onOpenChange?.(value) }, [onOpenChange])
  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div className="relative inline-block">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

function DropdownMenuTrigger({ children, className, asChild, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { open, setOpen } = React.useContext(DropdownMenuContext)
  return <button type="button" className={className} onClick={() => setOpen(!open)} aria-expanded={open} {...props}>{children}</button>
}

const DropdownMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { align?: "start" | "center" | "end"; sideOffset?: number }>(
  ({ className, align = "start", children, ...props }, ref) => {
    const { open, setOpen } = React.useContext(DropdownMenuContext)
    const contentRef = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
      if (!open) return
      const handleClick = (e: MouseEvent) => {
        if (contentRef.current && !contentRef.current.contains(e.target as Node)) setOpen(false)
      }
      document.addEventListener("mousedown", handleClick)
      return () => document.removeEventListener("mousedown", handleClick)
    }, [open, setOpen])

    if (!open) return null

    const alignClass = { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" }[align]

    return (
      <div ref={(node) => {
        (contentRef as React.MutableRefObject<HTMLDivElement | null>).current = node
        if (typeof ref === "function") ref(node); else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
      }} className={cn("absolute z-50 mt-1 min-w-[8rem] rounded border bg-white py-1 shadow-md", alignClass, className)} role="menu" {...props}>
        {children}
      </div>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

function DropdownMenuItem({ className, children, onClick, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  const { setOpen } = React.useContext(DropdownMenuContext)
  return (
    <div
      role="menuitem"
      tabIndex={0}
      className={cn("cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none", className)}
      onClick={(e) => { onClick?.(e); setOpen(false) }}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); (e.target as HTMLElement).click() } }}
      {...props}
    >
      {children}
    </div>
  )
}

function DropdownMenuSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("kern-divider my-1", className)} aria-hidden="true" {...props} />
}

function DropdownMenuLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return <div className={cn("kern-label kern-label--small px-3 py-1", className)} {...props} />
}

function DropdownMenuGroup(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div role="group" {...props} />
}

function DropdownMenuCheckboxItem({ className, children, checked, onCheckedChange, ...props }: React.HTMLAttributes<HTMLDivElement> & { checked?: boolean; onCheckedChange?: (checked: boolean) => void }) {
  return (
    <div role="menuitemcheckbox" aria-checked={checked} className={cn("cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2", className)}
      onClick={() => onCheckedChange?.(!checked)} {...props}>
      <input type="checkbox" checked={checked} readOnly className="kern-form-check__checkbox" />
      {children}
    </div>
  )
}

function DropdownMenuRadioGroup({ children, value, onValueChange, ...props }: React.HTMLAttributes<HTMLDivElement> & { value?: string; onValueChange?: (value: string) => void }) {
  return <div role="group" {...props}>{children}</div>
}

function DropdownMenuRadioItem({ className, children, value, ...props }: React.HTMLAttributes<HTMLDivElement> & { value: string }) {
  return (
    <div role="menuitemradio" className={cn("cursor-pointer px-3 py-2 text-sm hover:bg-gray-100 flex items-center gap-2", className)} {...props}>
      {children}
    </div>
  )
}

function DropdownMenuSub({ children }: { children: React.ReactNode }) { return <>{children}</> }
function DropdownMenuSubTrigger({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement> & { inset?: boolean }) {
  return <div className={cn("cursor-pointer px-3 py-2 text-sm hover:bg-gray-100", className)} {...props}>{children}</div>
}
function DropdownMenuSubContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("absolute left-full top-0 min-w-[8rem] rounded border bg-white py-1 shadow-md", className)} {...props} />
}
function DropdownMenuPortal({ children }: { children: React.ReactNode }) { return <>{children}</> }
function DropdownMenuShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("ml-auto text-xs opacity-60", className)} {...props} />
}

export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuCheckboxItem, DropdownMenuRadioItem, DropdownMenuLabel,
  DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup,
  DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent,
  DropdownMenuSubTrigger, DropdownMenuRadioGroup,
}
