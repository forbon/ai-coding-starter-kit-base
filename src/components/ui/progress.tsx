import * as React from "react"
import { cn } from "@/lib/utils"

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number
  max?: number
  label?: string
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, max = 100, label, ...props }, ref) => (
    <div ref={ref} className={cn("kern-progress", className)} {...props}>
      {label && <label className="kern-label">{label}</label>}
      <progress value={value} max={max} />
    </div>
  )
)
Progress.displayName = "Progress"

export { Progress }
