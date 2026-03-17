"use client"

import * as React from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerSchema, type RegisterFormValues } from "@/lib/auth-schemas"
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

export default function RegisterPage() {
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: RegisterFormValues) {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      if (!supabase) {
        setError("Supabase ist nicht konfiguriert. Bitte Umgebungsvariablen setzen.")
        return
      }

      const { error: authError } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
      })

      if (authError) {
        if (authError.message.includes("already registered") || authError.status === 422) {
          setError("Diese E-Mail-Adresse ist bereits registriert. Bitte melden Sie sich an oder setzen Sie Ihr Passwort zurück.")
          return
        }
        setError("Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.")
        return
      }

      setSuccess(true)
    } catch {
      setError("Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <AuthCard
        title="E-Mail bestätigen"
        description="Fast geschafft!"
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
              Wir haben Ihnen eine Bestätigungsmail gesendet. Bitte klicken Sie auf den Link in der E-Mail, um Ihr Konto zu aktivieren.
            </span>
          </AlertDescription>
        </Alert>
      </AuthCard>
    )
  }

  return (
    <AuthCard
      title="Registrieren"
      description="Erstellen Sie ein neues Konto"
      footer={
        <div className="w-full text-center">
          <Link href="/login" className="kern-link kern-body">
            Bereits ein Konto? Jetzt anmelden
          </Link>
        </div>
      }
    >
      {error && (
        <Alert variant="danger" className="mb-4">
          <AlertDescription>
            <span className="kern-body">{error}</span>
            {error.includes("bereits registriert") && (
              <span className="flex gap-2 mt-2">
                <Link href="/login" className="kern-link">
                  Anmelden
                </Link>
                <span className="kern-body">oder</span>
                <Link href="/reset-password" className="kern-link">
                  Passwort zurücksetzen
                </Link>
              </span>
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
                <FormLabel>Passwort</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Mindestens 8 Zeichen"
                    autoComplete="new-password"
                    aria-label="Passwort"
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
            aria-label="Registrieren"
          >
            {isLoading ? "Wird registriert..." : "Konto erstellen"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}
