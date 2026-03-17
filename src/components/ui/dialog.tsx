"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface DialogContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  dialogRef: React.RefObject<HTMLDialogElement | null>
}

const DialogContext = React.createContext<DialogContextValue | null>(null)

function useDialog() {
  const context = React.useContext(DialogContext)
  if (!context) throw new Error("Dialog components must be used within <Dialog>")
  return context
}

interface DialogProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
}

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [internalOpen, setInternalOpen] = React.useState(false)
  const dialogRef = React.useRef<HTMLDialogElement>(null)
  const open = controlledOpen ?? internalOpen

  const setOpen = React.useCallback((value: boolean) => {
    setInternalOpen(value)
    onOpenChange?.(value)
    if (value) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [onOpenChange])

  React.useEffect(() => {
    if (open) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [open])

  return (
    <DialogContext.Provider value={{ open, setOpen, dialogRef }}>
      {children}
    </DialogContext.Provider>
  )
}

function DialogTrigger({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog()
  return (
    <button type="button" className={className} onClick={() => setOpen(true)} {...props}>
      {children}
    </button>
  )
}

const DialogContent = React.forwardRef<HTMLDialogElement, React.HTMLAttributes<HTMLDialogElement>>(
  ({ className, children, ...props }, ref) => {
    const { dialogRef, setOpen } = useDialog()

    const handleClick = (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) setOpen(false)
    }

    return (
      <dialog
        ref={(node) => {
          (dialogRef as React.MutableRefObject<HTMLDialogElement | null>).current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDialogElement | null>).current = node
        }}
        className={cn("kern-dialog", className)}
        onClick={handleClick}
        {...props}
      >
        {children}
      </dialog>
    )
  }
)
DialogContent.displayName = "DialogContent"

function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  const { setOpen } = useDialog()
  return (
    <header className={cn("kern-dialog__header", className)} {...props}>
      {props.children}
      <button type="button" className="kern-btn kern-btn--tertiary" onClick={() => setOpen(false)}>
        <span className="kern-icon kern-icon--close" aria-hidden="true" />
        <span className="kern-sr-only">Schließen</span>
      </button>
    </header>
  )
}

function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return <footer className={cn("kern-dialog__footer", className)} {...props} />
}

function DialogTitle({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className={cn("kern-title kern-title--large", className)} {...props} />
}

function DialogDescription({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("kern-dialog__body", className)}>
      <p className="kern-body" {...props} />
    </section>
  )
}

function DialogClose({ children, className, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { setOpen } = useDialog()
  return (
    <button type="button" className={cn("kern-btn kern-btn--secondary", className)} onClick={() => setOpen(false)} {...props}>
      <span className="kern-label">{children ?? "Schließen"}</span>
    </button>
  )
}

const DialogPortal = ({ children }: { children: React.ReactNode }) => <>{children}</>
const DialogOverlay = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  (props, ref) => <div ref={ref} {...props} />
)
DialogOverlay.displayName = "DialogOverlay"

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
}
