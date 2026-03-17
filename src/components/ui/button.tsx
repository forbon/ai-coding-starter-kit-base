import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary" | "destructive" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "block" | "icon"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", children, ...props }, ref) => {
    const variantClass = {
      primary: "kern-btn--primary",
      secondary: "kern-btn--secondary",
      tertiary: "kern-btn--tertiary",
      destructive: "kern-btn--primary",
      ghost: "kern-btn--tertiary",
      link: "kern-btn--tertiary",
    }[variant]

    const sizeClass = {
      default: "",
      sm: "kern-btn--small",
      lg: "kern-btn--large",
      block: "kern-btn--block",
      icon: "kern-btn--icon",
    }[size]

    return (
      <button
        className={cn("kern-btn", variantClass, sizeClass, className)}
        ref={ref}
        {...props}
      >
        <span className="kern-label">{children}</span>
      </button>
    )
  }
)
Button.displayName = "Button"

export { Button }
