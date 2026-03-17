import * as React from "react"
import { cn } from "@/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "default" | "small" | "large"
}

const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClass = {
      default: "",
      small: "kern-label--small",
      large: "kern-label--large",
    }[size]

    return (
      <label
        ref={ref}
        className={cn("kern-label", sizeClass, className)}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
