"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const Accordion = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { type?: "single" | "multiple"; collapsible?: boolean }>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("kern-accordion-group", className)} {...props} />
  )
)
Accordion.displayName = "Accordion"

const AccordionItem = React.forwardRef<HTMLDetailsElement, React.DetailsHTMLAttributes<HTMLDetailsElement> & { value?: string }>(
  ({ className, value, ...props }, ref) => (
    <details ref={ref} className={cn("kern-accordion", className)} name="accordion" {...props} />
  )
)
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, children, ...props }, ref) => (
    <summary ref={ref as React.Ref<HTMLElement>} className={cn("kern-accordion__header", className)} {...props}>
      <span className="kern-title">{children}</span>
    </summary>
  )
)
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <section ref={ref as React.Ref<HTMLElement>} className={cn("kern-accordion__body", className)} {...props} />
  )
)
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
