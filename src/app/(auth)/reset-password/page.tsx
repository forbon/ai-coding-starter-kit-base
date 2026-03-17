"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  resetPasswordSchema,
  newPasswordSchema,
  type ResetPasswordFormValues,
  type NewPasswordFormValues,
} from "@/lib/auth-schemas"
import { supabase } from "@/lib/supabase"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

type PageMode = "request" | "confirm" | "sent"

export default function ResetPasswordPage() {
  const [mode, setMode] = React.useState<PageMode>("request")
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [passwordUpdated, setPasswordUpdated] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash
      if (hash.includes("access_token") || hash.includes("type=recovery")) {
        setMode("confirm")
      }
    }
  }, [])

  if (mode === "sent") {
    return <ResetEmailSent />
  }

  if (mode === "confirm") {
    return (
      <ConfirmNewPassword
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
        setError={setError}
        passwordUpdated={passwordUpdated}
        setPasswordUpdated={setPasswordUpdated}
      />
    )
  }

  return (
    <RequestResetForm
      isLoading={isLoading}
      setIsLoading={setIsLoading}
      error={error}
      setError={setError}
      onSent={() => setMode("sent")}
    />
  )
}

function RequestResetForm({
  isLoading,
  setIsLoading,
  error,
  setError,
  onSent,
}: {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  error: string | null
  setError: (v: string | null) => void
  onSent: () => void
}) {
  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: "" },
  })

  async function onSubmit(values: ResetPasswordFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      if (!supabase) {
        setError("Supabase ist nicht konfiguriert.")
        return
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        values.email,
        { redirectTo: `${window.location.origin}/reset-password` }
      )

      if (resetError) {
        setError("Fehler beim Senden der E-Mail. Bitte versuchen Sie es erneut.")
        return
      }

      onSent()
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Passwort zurücksetzen"
      description="Geben Sie Ihre E-Mail-Adresse ein, um einen Link zum Zurücksetzen zu erhalten"
      footer={
        <div className="w-full text-center">
          <Link href="/login" className="kern-link kern-body">
            Zurück zur Anmeldung
          </Link>
        </div>
      }
    >
      {error && (
        <Alert variant="danger" className="mb-4">
          <AlertDescription>
            <span className="kern-body">{error}</span>
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-Mail</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@beispiel.de"
                    autoComplete="email"
                    aria-label="E-Mail-Adresse"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="block"
            disabled={isLoading}
            aria-label="Link zum Zurücksetzen senden"
          >
            {isLoading ? "Wird gesendet..." : "Link senden"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}

function ResetEmailSent() {
  return (
    <AuthCard
      title="E-Mail gesendet"
      description="Prüfen Sie Ihr Postfach"
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
            Falls ein Konto mit dieser E-Mail-Adresse existiert, haben wir Ihnen einen Link zum Zurücksetzen des Passworts gesendet.
          </span>
        </AlertDescription>
      </Alert>
    </AuthCard>
  )
}

function ConfirmNewPassword({
  isLoading,
  setIsLoading,
  error,
  setError,
  passwordUpdated,
  setPasswordUpdated,
}: {
  isLoading: boolean
  setIsLoading: (v: boolean) => void
  error: string | null
  setError: (v: string | null) => void
  passwordUpdated: boolean
  setPasswordUpdated: (v: boolean) => void
}) {
  const form = useForm<NewPasswordFormValues>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
  })

  async function onSubmit(values: NewPasswordFormValues) {
    setIsLoading(true)
    setError(null)

    try {
      if (!supabase) {
        setError("Supabase ist nicht konfiguriert.")
        return
      }

      const { error: updateError } = await supabase.auth.updateUser({
        password: values.password,
      })

      if (updateError) {
        if (updateError.message.includes("expired") || updateError.message.includes("invalid")) {
          setError("Der Link ist abgelaufen. Bitte fordern Sie einen neuen Link an.")
          return
        }
        setError("Fehler beim Aktualisieren des Passworts. Bitte versuchen Sie es erneut.")
        return
      }

      setPasswordUpdated(true)
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten.")
    } finally {
      setIsLoading(false)
    }
  }

  if (passwordUpdated) {
    return (
      <AuthCard
        title="Passwort aktualisiert"
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
              Ihr Passwort wurde erfolgreich geändert. Sie können sich jetzt mit Ihrem neuen Passwort anmelden.
            </span>
          </AlertDescription>
        </Alert>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Neues Passwort festlegen"
      description="Geben Sie Ihr neues Passwort ein"
      footer={
        <div className="w-full text-center">
          <Link href="/reset-password" className="kern-link kern-body">
            Neuen Link anfordern
          </Link>
        </div>
      }
    >
      {error && (
        <Alert variant="danger" className="mb-4">
          <AlertDescription>
            <span className="kern-body">{error}</span>
            {error.includes("abgelaufen") && (
              <Link href="/reset-password" className="kern-link block mt-2">
                Neuen Link anfordern
              </Link>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Neues Passwort</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mindestens 8 Zeichen"
                    autoComplete="new-password"
                    aria-label="Neues Passwort"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Mindestens 8 Zeichen</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Passwort bestätigen</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Passwort wiederholen"
                    autoComplete="new-password"
                    aria-label="Passwort bestätigen"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="block"
            disabled={isLoading}
            aria-label="Passwort speichern"
          >
            {isLoading ? "Wird gespeichert..." : "Passwort speichern"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
