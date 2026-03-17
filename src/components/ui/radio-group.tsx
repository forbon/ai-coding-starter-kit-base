"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface RadioGroupContextValue {
  name: string
  value?: string
  onValueChange?: (value: string) => void
}

const RadioGroupContext = React.createContext<RadioGroupContextValue>({ name: "" })

export interface RadioGroupProps extends React.HTMLAttributes<HTMLFieldSetElement> {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  orientation?: "horizontal" | "vertical"
}

const RadioGroup = React.forwardRef<HTMLFieldSetElement, RadioGroupProps>(
  ({ className, name = "radio-group", value, defaultValue, onValueChange, orientation = "vertical", children, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const currentValue = value ?? internalValue

    const handleValueChange = (newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }

    return (
      <RadioGroupContext.Provider value={{ name, value: currentValue, onValueChange: handleValueChange }}>
        <fieldset
          ref={ref}
          className={cn("kern-fieldset", className)}
          {...props}
        >
          <div className={cn("kern-fieldset__body", orientation === "horizontal" && "kern-fieldset__body--horizontal")}>
            {children}
          </div>
        </fieldset>
      </RadioGroupContext.Provider>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export interface RadioGroupItemProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  value: string
}

const RadioGroupItem = React.forwardRef<HTMLInputElement, RadioGroupItemProps>(
  ({ className, value, id, ...props }, ref) => {
    const context = React.useContext(RadioGroupContext)

    return (
      <div className="kern-form-check">
        <input
          type="radio"
          ref={ref}
          id={id}
          name={context.name}
          value={value}
          checked={context.value === value}
          onChange={() => context.onValueChange?.(value)}
          className={cn("kern-form-check__radio", className)}
          {...props}
        />
      </div>
    )
  }
)
RadioGroupItem.displayName = "RadioGroupItem"

export { RadioGroup, RadioGroupItem }
