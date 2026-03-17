"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, type LoginFormValues } from "@/lib/auth-schemas"
import { supabase } from "@/lib/supabase"
import { AuthCard } from "@/components/auth-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"

export default function LoginPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [unverified, setUnverified] = React.useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)
    setError(null)
    setUnverified(false)

    try {
      if (!supabase) {
        setError("Supabase ist nicht konfiguriert. Bitte Umgebungsvariablen setzen.")
        return
      }

      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (authError) {
        if (authError.message === "Email not confirmed") {
          setUnverified(true)
          setError("Bitte bestätigen Sie zuerst Ihre E-Mail-Adresse.")
          return
        }
        setError("Ungültige Anmeldedaten. Bitte überprüfen Sie E-Mail und Passwort.")
        return
      }

      if (data.session) {
        const params = new URLSearchParams(window.location.search)
        const returnUrl = params.get("returnUrl") || "/"
        window.location.href = returnUrl
      }
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthCard
      title="Anmelden"
      description="Melden Sie sich mit Ihrem Konto an"
      footer={
        <div className="flex flex-col gap-2 w-full text-center">
          <Link href="/register" className="kern-link kern-body">
            Noch kein Konto? Jetzt registrieren
          </Link>
        </div>
      }
    >
      {error && (
        <Alert variant={unverified ? "warning" : "danger"} className="mb-4">
          <AlertDescription>
            <span className="kern-body">{error}</span>
            {unverified && (
              <Link href="/verify-email" className="kern-link block mt-2">
                Verifizierungs-E-Mail erneut senden
              </Link>
            )}
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

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Passwort</FormLabel>
                  <Link
                    href="/reset-password"
                    className="kern-link kern-body"
                    tabIndex={-1}
                  >
                    Passwort vergessen?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Passwort eingeben"
                    autoComplete="current-password"
                    aria-label="Passwort"
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
            aria-label="Anmelden"
          >
            {isLoading ? "Wird angemeldet..." : "Anmelden"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
