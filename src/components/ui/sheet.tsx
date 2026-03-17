"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface SheetContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
  side: "top" | "right" | "bottom" | "left"
}

const SheetContext = React.createContext<SheetContextValue | null>(null)

function useSheet() {
  const context = React.useContext(SheetContext)
  if (!context) throw new Error("Sheet components must be used within <Sheet>")
  return context
}

function Sheet({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const open = controlledOpen ?? internalOpen

  const setOpen = React.useCallback((value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
    if (value) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [onOpenChange])

  React.useEffect(() => {
    if (open) dialogRef.current?.showModal()
    else dialogRef.current?.close()
  }, [open])

  return (
    <SheetContext.Provider value={{ open, setOpen, dialogRef, side: "right" }}>
      {children}
    </SheetContext.Provider>
  )
}

function SheetTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useSheet()
  return <button type="button" className={className} onClick={() => setOpen(true)} {...props}>{children}</button>
}

function SheetClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useSheet()
  return (
    <button type="button" className={cn("kern-btn kern-btn--tertiary", className)} onClick={() => setOpen(false)} {...props}>
      {children ?? (
        <>
          <span className="kern-icon kern-icon--close" aria-hidden="true" />
          <span className="kern-sr-only">Schließen</span>
        </>
      )}
    </button>
  )
}

const SheetContent = React.forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement> & { side?: "top" | "right" | "bottom" | "left" }>(
  ({ className, side = "right", children, ...props }, ref) => {
    const { dialogRef, setOpen } = useSheet()

    const sideStyles: Record<string, string> = {
      top: "inset-x-0 top-0 border-b max-h-[80vh]",
      right: "inset-y-0 right-0 border-l w-3/4 max-w-sm h-full",
      bottom: "inset-x-0 bottom-0 border-t max-h-[80vh]",
      left: "inset-y-0 left-0 border-r w-3/4 max-w-sm h-full",
    }

    return (
      <dialog
        ref={(node) => {
          (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node
        }}
        className={cn("kern-dialog fixed m-0 p-0", sideStyles[side], className)}
        onClick={(e) => { if (e.target === e.currentTarget) setOpen(false) }}
        {...props}
      >
        {children}
      </dialog>
    )
  }
)
SheetContent.displayName = "SheetContent"

function SheetHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn("kern-dialog__header", className)} {...props} />
}

function SheetFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("kern-dialog__footer", className)} {...props} />
}

function SheetTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("kern-title kern-title--large", className)} {...props} />
}

function SheetDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className={cn("kern-body", className)} {...props} />
}

export { Sheet, SheetTrigger, SheetClose, SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription }
