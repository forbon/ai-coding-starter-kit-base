"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface TabsContextValue {
  value: string
  onValueChange: (value: string) => void
}

const TabsContext = React.createContext<TabsContextValue>({ value: "", onValueChange: () => {} })

const Tabs = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value?: string; defaultValue?: string; onValueChange?: (value: string) => void }>(
  ({ className, value, defaultValue = "", onValueChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue
    const handleChange = React.useCallback((v: string) => { setInternalValue(v); onValueChange?.(v) }, [onValueChange])

    return (
      <TabsContext.Provider value={{ value: currentValue, onValueChange: handleChange }}>
        <div ref={ref} className={cn("kern-tabs", className)} {...props}>{children}</div>
      </TabsContext.Provider>
    )
  }
)
Tabs.displayName = "Tabs"

const TabsList = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} role="tablist" className={cn("kern-tabs__list flex border-b", className)} {...props} />
  )
)
TabsList.displayName = "TabsList"

const TabsTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { value: string }>(
  ({ className, value, children, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    const isActive = context.value === value

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={isActive}
        className={cn(
          "kern-tabs__trigger px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors",
          isActive ? "border-current opacity-100" : "border-transparent opacity-60 hover:opacity-80",
          className
        )}
        onClick={() => context.onValueChange(value)}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = "TabsTrigger"

const TabsContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { value: string }>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext)
    if (context.value !== value) return null

    return (
      <div ref={ref} role="tabpanel" className={cn("kern-tabs__content mt-4", className)} {...props} />
    )
  }
)
TabsContent.displayName = "TabsContent"

export { Tabs, TabsList, TabsTrigger, TabsContent }
