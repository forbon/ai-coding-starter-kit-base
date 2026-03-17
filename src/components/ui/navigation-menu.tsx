import * as React from "react"
import { cn } from "@/lib/utils"

const NavigationMenu = React.forwardRef<HTMLElement, React.HTMLAttributes<HTMLElement>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} className={cn("kern-navigation", className)} {...props} />
  )
)
NavigationMenu.displayName = "NavigationMenu"

const NavigationMenuList = React.forwardRef<HTMLUListElement, React.HTMLAttributes<HTMLUListElement>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn("flex items-center gap-1", className)} {...props} />
  )
)
NavigationMenuList.displayName = "NavigationMenuList"

const NavigationMenuItem = React.forwardRef<HTMLLIElement, React.LiHTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn("relative", className)} {...props} />
  )
)
NavigationMenuItem.displayName = "NavigationMenuItem"

const NavigationMenuLink = React.forwardRef<HTMLAnchorElement, React.AnchorHTMLAttributes<HTMLAnchorElement>>(
  ({ className, ...props }, ref) => (
    <a ref={ref} className={cn("kern-link px-3 py-2 text-sm", className)} {...props} />
  )
)
NavigationMenuLink.displayName = "NavigationMenuLink"

const NavigationMenuTrigger = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, ...props }, ref) => (
    <button ref={ref} type="button" className={cn("kern-btn kern-btn--tertiary text-sm", className)} {...props} />
  )
)
NavigationMenuTrigger.displayName = "NavigationMenuTrigger"

const NavigationMenuContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("absolute left-0 top-full mt-1 w-auto min-w-[12rem] rounded border bg-white p-2 shadow-md", className)} {...props} />
  )
)
NavigationMenuContent.displayName = "NavigationMenuContent"

const NavigationMenuIndicator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />
)
NavigationMenuIndicator.displayName = "NavigationMenuIndicator"

const NavigationMenuViewport = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />
)
NavigationMenuViewport.displayName = "NavigationMenuViewport"

export {
  NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuContent,
  NavigationMenuTrigger, NavigationMenuLink, NavigationMenuIndicator, NavigationMenuViewport,
}
