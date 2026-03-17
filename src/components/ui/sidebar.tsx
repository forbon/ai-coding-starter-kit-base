"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SidebarContextValue {
  open: boolean
  setOpen: (open: boolean) => void
}

const SidebarContext = React.createContext<SidebarContextValue>({ open: true, setOpen: () => {} })

export function useSidebar() {
  return React.useContext(SidebarContext)
}

function SidebarProvider({ children, defaultOpen = true }: { children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = React.useState(defaultOpen)
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      <div className="flex min-h-screen">{children}</div>
    </SidebarContext.Provider>
  )
}

const Sidebar = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement> & { side?: "left" | "right"; variant?: "sidebar" | "floating" | "inset" }>(
  ({ className, side = "left", children, ...props }, ref) => {
    const { open } = useSidebar()
    return (
      <aside
        ref={ref}
        data-state={open ? "open" : "closed"}
        className={cn(
          "flex flex-col border-r bg-white transition-all duration-200",
          open ? "w-64" : "w-0 overflow-hidden",
          side === "right" && "order-last border-l border-r-0",
          className
        )}
        {...props}
      >
        {children}
      </aside>
    )
  }
)
Sidebar.displayName = "Sidebar"

function SidebarHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex items-center gap-2 p-4 border-b", className)} {...props} />
}

function SidebarContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1 overflow-auto p-4", className)} {...props} />
}

function SidebarFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("border-t p-4", className)} {...props} />
}

function SidebarGroup({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("py-2", className)} {...props} />
}

function SidebarGroupLabel({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("kern-label kern-label--small px-2 py-1 opacity-70", className)} {...props} />
}

function SidebarGroupContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

function SidebarMenu({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("flex flex-col gap-0.5", className)} {...props} />
}

function SidebarMenuItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

const SidebarMenuButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean; asChild?: boolean; tooltip?: string }>(
  ({ className, isActive, children, ...props }, ref) => (
    <button
      ref={ref}
      type="button"
      className={cn(
        "flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors hover:bg-gray-100",
        isActive && "bg-gray-100 font-medium",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
)
SidebarMenuButton.displayName = "SidebarMenuButton"

function SidebarTrigger({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { open, setOpen } = useSidebar()
  return (
    <button
      type="button"
      className={cn("kern-btn kern-btn--tertiary", className)}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Seitenleiste schließen" : "Seitenleiste öffnen"}
      {...props}
    >
      <span className="kern-icon kern-icon--menu" aria-hidden="true" />
    </button>
  )
}

function SidebarInset({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex-1", className)} {...props} />
}

function SidebarRail({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("", className)} {...props} />
}

function SidebarInput({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn("kern-form-input__input w-full", className)} {...props} />
}

function SidebarSeparator({ className, ...props }: React.HTMLAttributes<HTMLHRElement>) {
  return <hr className={cn("kern-divider my-2", className)} aria-hidden="true" {...props} />
}

function SidebarMenuAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("kern-btn kern-btn--tertiary kern-btn--small", className)} {...props} />
}

function SidebarMenuBadge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span className={cn("kern-badge kern-badge--info ml-auto", className)} {...props} />
}

function SidebarMenuSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("animate-pulse rounded bg-gray-200 h-8 mx-2 my-1", className)} {...props} />
}

function SidebarMenuSub({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) {
  return <ul className={cn("ml-4 flex flex-col gap-0.5", className)} {...props} />
}

function SidebarMenuSubItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return <li className={cn("", className)} {...props} />
}

function SidebarMenuSubButton({ className, isActive, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean }) {
  return (
    <button type="button" className={cn("flex w-full items-center gap-2 rounded px-2 py-1 text-sm hover:bg-gray-100", isActive && "bg-gray-100 font-medium", className)} {...props} />
  )
}

function SidebarGroupAction({ className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button type="button" className={cn("kern-btn kern-btn--tertiary kern-btn--small", className)} {...props} />
}

export {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction,
  SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInput,
  SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge,
  SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton, SidebarMenuSub,
  SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail,
  SidebarSeparator, SidebarTrigger,
}
