import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "info" | "success" | "warning" | "danger" | "default" | "destructive" | "secondary" | "outline"
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variantMap: Record<string, string> = {
      default: "kern-badge--info",
      info: "kern-badge--info",
      success: "kern-badge--success",
      warning: "kern-badge--warning",
      danger: "kern-badge--danger",
      destructive: "kern-badge--danger",
      secondary: "kern-badge--info",
      outline: "kern-badge--info",
    }
    return (
      <span
        ref={ref}
        className={cn("kern-badge", variantMap[variant], className)}
        {...props}
      >
        <span className="kern-label kern-label--small">{children}</span>
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge }
