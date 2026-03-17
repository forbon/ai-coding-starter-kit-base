"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  onCheckedChange?: (checked: boolean) => void
  checked?: boolean
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({ className, onCheckedChange, onChange, checked, defaultChecked, ...props }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked ?? false)
    const isChecked = checked ?? internalChecked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalChecked(e.target.checked)
      onChange?.(e)
      onCheckedChange?.(e.target.checked)
    }

    return (
      <label className={cn("kern-switch", className)}>
        <input
          type="checkbox"
          role="switch"
          ref={ref}
          checked={isChecked}
          onChange={handleChange}
          className="kern-switch__input"
          {...props}
        />
        <span className="kern-switch__slider" />
      </label>
    )
  }
)
Switch.displayName = "Switch"

export { Switch }
