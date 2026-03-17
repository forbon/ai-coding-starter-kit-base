"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface AlertDialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(null)

function useAlertDialog() {
  const context = React.useContext(AlertDialogContext)
  if (!context) throw new Error("AlertDialog components must be used within <AlertDialog>")
  return context
}

function AlertDialog({ open: controlledOpen, onOpenChange, children }: { open?: boolean; onOpenChange?: (open: boolean) => void; children: React.ReactNode }) {
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
    <AlertDialogContext.Provider value={{ open, setOpen, dialogRef }}>
      {children}
    </AlertDialogContext.Provider>
  )
}

function AlertDialogTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialog()
  return <button type="button" className={className} onClick={() => setOpen(true)} {...props}>{children}</button>
}

const AlertDialogContent = React.forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>(
  ({ className, children, ...props }, ref) => {
    const { dialogRef } = useAlertDialog()
    return (
      <dialog
        ref={(node) => {
          (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node
        }}
        className={cn("kern-dialog", className)}
        {...props}
      >
        {children}
      </dialog>
    )
  }
)
AlertDialogContent.displayName = "AlertDialogContent"

function AlertDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <header className={cn("kern-dialog__header", className)} {...props} />
}

function AlertDialogFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("kern-dialog__footer", className)} {...props} />
}

function AlertDialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("kern-title kern-title--large", className)} {...props} />
}

function AlertDialogDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <section className="kern-dialog__body">
      <p className={cn("kern-body", className)} {...props} />
    </section>
  )
}

function AlertDialogAction({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialog()
  return (
    <button type="button" className={cn("kern-btn kern-btn--primary", className)} onClick={() => setOpen(false)} {...props}>
      <span className="kern-label">{children}</span>
    </button>
  )
}

function AlertDialogCancel({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useAlertDialog()
  return (
    <button type="button" className={cn("kern-btn kern-btn--secondary", className)} onClick={() => setOpen(false)} {...props}>
      <span className="kern-label">{children ?? "Abbrechen"}</span>
    </button>
  )
}

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
