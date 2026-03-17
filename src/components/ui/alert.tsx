import * as React from "react"
import { cn } from "@/lib/utils"

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "info" | "success" | "warning" | "danger" | "destructive"
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "info", children, ...props }, ref) => {
    const v = variant === "destructive" ? "danger" : variant
    return (
      <div
        ref={ref}
        role="alert"
        className={cn("kern-alert", `kern-alert--${v}`, className)}
        {...props}
      >
        {children}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("kern-alert__header", className)} {...props} />
  )
)
AlertHeader.displayName = "AlertHeader"

const AlertTitle = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("kern-title", className)} {...props} />
  )
)
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("kern-alert__body", className)} {...props} />
  )
)
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertHeader, AlertTitle, AlertDescription }
