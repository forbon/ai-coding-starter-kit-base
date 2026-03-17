import * as React from "react"
import { cn } from "@/lib/utils"

const Breadcrumb = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="Breadcrumb" className={cn("kern-breadcrumb", className)} {...props} />
  )
)
Breadcrumb.displayName = "Breadcrumb"

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.OlHTMLAttributes<HTMLOListElement>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn("flex items-center gap-1.5 text-sm flex-wrap", className)} {...props} />
  )
)
BreadcrumbList.displayName = "BreadcrumbList"

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("inline-flex items-center gap-1.5", className)} {...props} />
  )
)
BreadcrumbItem.displayName = "BreadcrumbItem"

const BreadcrumbLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("kern-link text-sm", className)} {...props} />
  )
)
BreadcrumbLink.displayName = "BreadcrumbLink"

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} role="link" aria-current="page" aria-disabled="true" className={cn("kern-label text-sm", className)} {...props} />
  )
)
BreadcrumbPage.displayName = "BreadcrumbPage"

const BreadcrumbSeparator = ({ className, children, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
  <li role="presentation" aria-hidden="true" className={cn("opacity-50", className)} {...props}>
    {children ?? "/"}
  </li>
)
BreadcrumbSeparator.displayName = "BreadcrumbSeparator"

const BreadcrumbEllipsis = ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
  <span role="presentation" aria-hidden="true" className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>
    ...
  </span>
)
BreadcrumbEllipsis.displayName = "BreadcrumbEllipsis"

export { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator, BreadcrumbEllipsis }
