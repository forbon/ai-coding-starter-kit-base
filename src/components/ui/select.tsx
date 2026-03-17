"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void
  error?: boolean
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, onValueChange, onChange, error, children, ...props }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange?.(e)
      onValueChange?.(e.target.value)
    }

    return (
      <select
        ref={ref}
        className={cn(
          "kern-form-input__input",
          error && "kern-form-input__input--error",
          className
        )}
        onChange={handleChange}
        {...props}
      >
        {children}
      </select>
    )
  }
)
Select.displayName = "Select"

const SelectOption = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  (props, ref) => <option ref={ref} {...props} />
)
SelectOption.displayName = "SelectOption"

const SelectGroup = React.forwardRef<HTMLOptGroupElement, React.OptgroupHTMLAttributes<HTMLOptGroupElement>>(
  (props, ref) => <optgroup ref={ref} {...props} />
)
SelectGroup.displayName = "SelectGroup"

export { Select, SelectOption, SelectGroup }
