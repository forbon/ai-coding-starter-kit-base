import * as React from "react"
import { cn } from "@/lib/utils"

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav role="navigation" aria-label="Pagination" className={cn("mx-auto flex w-full justify-center", className)} {...props} />
)
Pagination.displayName = "Pagination"

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<"ul">>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
  )
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn("", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

const PaginationLink = ({ className, isActive, ...props }: React.ComponentProps<"a"> & { isActive?: boolean }) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn("kern-btn", isActive ? "kern-btn--primary" : "kern-btn--tertiary", className)}
    {...props}
  />
)
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Zurück" className={cn("kern-btn kern-btn--secondary", className)} {...props}>
    <span className="kern-icon kern-icon--arrow-back" aria-hidden="true" />
    <span className="kern-label">Zurück</span>
  </PaginationLink>
)
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Weiter" className={cn("kern-btn kern-btn--secondary", className)} {...props}>
    <span className="kern-label">Weiter</span>
    <span className="kern-icon kern-icon--arrow-forward" aria-hidden="true" />
  </PaginationLink>
)
PaginationNext.displayName = "PaginationNext"

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span aria-hidden className={cn("flex h-9 w-9 items-center justify-center", className)} {...props}>...</span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious }
