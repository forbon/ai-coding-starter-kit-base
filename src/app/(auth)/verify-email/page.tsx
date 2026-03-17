"use client"

import * as React from "react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Label } from "@/components/ui/label"

type PageState = "prompt" | "resent" | "verified" | "error"

export default function VerifyEmailPage() {
  const [state, setState] = React.useState<PageState>("prompt")
  const [email, setEmail] = React.useState("")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash.includes("access_token") && hash.includes("type=signup")) {
        setState("verified")
      }
      if (hash.includes("error")) {
        setState("error")
        setError("Der Verifizierungslink ist ungültig oder abgelaufen.")
      }
    }
  }, [])

  async function handleResend() {
    if (!email.trim()) {
      setError("Bitte geben Sie Ihre E-Mail-Adresse ein.")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      if (!supabase) {
        setError("Supabase ist nicht konfiguriert.")
        return
      }

      const { error: resendError } = await supabase.auth.resend({
        type: "signup",
        email: email,
      })

      if (resendError) {
        setError("Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.")
        return
      }

      setState("resent")
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten.")
    } finally {
      setIsLoading(false)
    }
  }

  if (state === "verified") {
    return (
      <AuthCard
        title="E-Mail bestätigt"
        footer={
          <div className="w-full text-center">
            <Link href="/login" className="kern-link kern-body">
              Jetzt anmelden
            </Link>
          </div>
        }
      >
        <Alert variant="success">
          <AlertDescription>
            <span className="kern-body">
              Ihre E-Mail-Adresse wurde erfolgreich bestätigt. Sie können sich jetzt anmelden.
            </span>
          </AlertDescription>
        </Alert>
      </AuthCard>
    )
  }

  if (state === "resent") {
    return (
      <AuthCard
        title="E-Mail erneut gesendet"
        footer={
          <div className="w-full text-center">
            <Link href="/login" className="kern-link kern-body">
              Zurück zur Anmeldung
            </Link>
          </div>
        }
      >
        <Alert variant="success">
          <AlertDescription>
            <span className="kern-body">
              Eine neue Bestätigungsmail wurde an <strong>{email}</strong> gesendet. Bitte prüfen Sie Ihr Postfach.
            </span>
          </AlertDescription>
        </Alert>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="E-Mail bestätigen"
      description="Bitte bestätigen Sie Ihre E-Mail-Adresse, um fortzufahren"
      footer={
        <div className="w-full text-center">
          <Link href="/login" className="kern-link kern-body">
            Zurück zur Anmeldung
          </Link>
        </div>
      }
    >
      {state === "error" && error && (
        <Alert variant="danger" className="mb-4">
          <AlertDescription>
            <span className="kern-body">{error}</span>
          </AlertDescription>
        </Alert>
      )}

      {state === "prompt" && (
        <>
          <Alert variant="info" className="mb-4">
            <AlertDescription>
              <span className="kern-body">
                Wir haben Ihnen eine E-Mail mit einem Bestätigungslink gesendet. Bitte klicken Sie auf den Link, um Ihr Konto zu aktivieren.
              </span>
            </AlertDescription>
          </Alert>

          <div className="flex flex-col gap-4">
            <p className="kern-body">
              Keine E-Mail erhalten? Geben Sie Ihre Adresse ein, um eine neue zu senden:
            </p>

            <div className="kern-form-input">
              <Label htmlFor="resend-email">E-Mail</Label>
              <Input
                id="resend-email"
                type="email"
                placeholder="name@beispiel.de"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  setError(null)
                }}
                aria-label="E-Mail-Adresse für erneuten Versand"
              />
              {error && state === "prompt" && (
                <p className="kern-error" role="alert">
                  <span className="kern-icon kern-icon--danger" aria-hidden="true" />
                  <span className="kern-body">{error}</span>
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="secondary"
              size="block"
              disabled={isLoading}
              onClick={handleResend}
              aria-label="Bestätigungsmail erneut senden"
            >
              {isLoading ? "Wird gesendet..." : "Bestätigungsmail erneut senden"}
            </Button>
          </div>
        </>
      )}
    </AuthCard>
  )
}
