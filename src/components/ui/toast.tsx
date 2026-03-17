"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

const Toast = React.forwardRef<HTMLDivElement, ToastProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantMap: Record<string, string> = {
      default: "kern-alert--info",
      success: "kern-alert--success",
      warning: "kern-alert--warning",
      destructive: "kern-alert--danger",
    }
    return (
      <div ref={ref} role="alert" className={cn("kern-alert", variantMap[variant], "fixed bottom-4 right-4 z-50 max-w-sm shadow-lg", className)} {...props}>
        {children}
      </div>
    )
  }
)
Toast.displayName = "Toast"

const ToastTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <div className="kern-alert__header">
      <span ref={ref} className={cn("kern-title", className)} {...props} />
    </div>
  )
)
ToastTitle.displayName = "ToastTitle"

const ToastDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div className="kern-alert__body">
      <p ref={ref} className={cn("kern-body", className)} {...props} />
    </div>
  )
)
ToastDescription.displayName = "ToastDescription"

const ToastClose = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={cn("kern-btn kern-btn--tertiary absolute top-2 right-2", className)} {...props}>
      <span className="kern-icon kern-icon--close" aria-hidden="true" />
      <span className="kern-sr-only">Schließen</span>
    </button>
  )
)
ToastClose.displayName = "ToastClose"

const ToastAction = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { altText: string }>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={cn("kern-btn kern-btn--secondary kern-btn--small", className)} {...props} />
  )
)
ToastAction.displayName = "ToastAction"

const ToastProvider = ({ children }: { children: React.ReactNode }) => <>{children}</>
const ToastViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:flex-col md:max-w-[420px]", className)} {...props} />
  )
)
ToastViewport.displayName = "ToastViewport"

type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
