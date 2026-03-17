import { z } from "zod"

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z
    .string()
    .min(1, "Passwort ist erforderlich"),
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  confirmPassword: z
    .string()
    .min(1, "Passwort-Bestätigung ist erforderlich"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
})

export type RegisterFormValues = z.infer<typeof registerSchema>

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "E-Mail ist erforderlich")
    .email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
})

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>

export const newPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Passwort muss mindestens 8 Zeichen lang sein"),
  confirmPassword: z
    .string()
    .min(1, "Passwort-Bestätigung ist erforderlich"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwörter stimmen nicht überein",
  path: ["confirmPassword"],
})

export type NewPasswordFormValues = z.infer<typeof newPasswordSchema>
