# PROJ-1: User Authentication

## Status: In Review
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Implementation Notes (Frontend)
- Auth layout with centered card design at `app/(auth)/layout.tsx`
- Login page at `/login` with email/password form, inline validation, forgot-password link, unverified-email warning
- Register page at `/register` with email/password/confirm form, 8-char minimum, success state showing email confirmation prompt
- Reset password page at `/reset-password` with request mode, email-sent confirmation, and new-password confirm mode (detects recovery link via URL hash)
- Verify email page at `/verify-email` with verified/error detection and resend-verification-email form
- All forms use Zod validation schemas (`src/lib/auth-schemas.ts`) with react-hook-form
- All edge cases from spec implemented: duplicate email, expired reset link, unverified login, resend verification
- KERN UX components used throughout: Button, Input, Label, Card, Alert, Form
- Supabase browser client set up at `src/lib/supabase.ts` (graceful null when env vars missing)

## Implementation Notes (Backend)
- Installed `@supabase/ssr` for proper SSR cookie-based session handling
- `src/lib/supabase.ts` updated to use `createBrowserClient` from `@supabase/ssr`
- `src/lib/supabase-server.ts` created with `createServerClient` using Next.js cookies() for server components and route handlers
- `src/lib/supabase-middleware.ts` created with session refresh logic and route protection rules
- `middleware.ts` at project root protects all routes; unauthenticated users redirected to `/login?returnUrl=...`; unverified users redirected to `/verify-email`; authenticated users on auth pages redirected to `/dashboard`
- `src/app/auth/callback/route.ts` handles Supabase code exchange for email verification and password reset magic links
- `src/app/api/auth/logout/route.ts` (POST) signs out user via Supabase and redirects to `/login`
- `src/components/app-header.tsx` displays "BauCheck NRW" branding + user email + logout button (KERN UX Button)
- `src/app/(protected)/layout.tsx` wraps protected pages with AppHeader and fetches user session server-side
- `src/app/(protected)/dashboard/page.tsx` placeholder with welcome message and CTA
- `src/app/page.tsx` redirects to `/dashboard` if authenticated, otherwise to `/login`
- `.env.local.example` already contains required Supabase env vars
- Build passes cleanly (`npm run build` successful)

## Dependencies
- None

## User Stories
- As an Entwurfsverfasser, I want to create an account so that my Prüfverläufe are saved and accessible across sessions
- As a Bauherr, I want to register with my email so that I can return to previous checks
- As a registered user, I want to log in securely so that only I can access my documents and results
- As a user who forgot their password, I want to reset it via email so that I can regain access to my account
- As a user, I want to log out so that my account is protected on shared devices

## Acceptance Criteria
- [ ] User can register with email and password
- [ ] Registration triggers email verification — unverified users cannot upload documents
- [ ] User can log in with valid credentials; invalid credentials show a clear error message
- [ ] User can request a password reset email and set a new password via the link
- [ ] User session persists across page reloads (stay logged in)
- [ ] User can log out from any page
- [ ] Password must be at least 8 characters; enforced on both client and server
- [ ] Registration and login forms show inline validation errors

## Edge Cases
- What if the user registers with an already-used email? → Show "E-Mail already registered" error, suggest login or password reset
- What if the verification email is not received? → Provide "resend verification email" option
- What if the reset link has expired? → Show clear expiry message with option to request a new link
- What if the user tries to access protected pages while logged out? → Redirect to login page with return URL
- What if the user tries to log in while email is unverified? → Show reminder to verify email with resend option

## Technical Requirements
- Security: Passwords hashed via Supabase Auth (bcrypt); no plain-text storage
- Security: Email verification required before accessing core features
- Session: JWT-based session via Supabase, auto-refresh
- DSGVO: Minimal data collection — only email and hashed password stored

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Approach
Supabase Auth handles the full authentication lifecycle — email/password registration, JWT session management, email verification, and password reset — with zero custom auth server code needed.

### Page Structure
```
app/(auth)/
  login/page.tsx         ← Login form
  register/page.tsx      ← Registration form
  reset-password/page.tsx ← Request reset + confirm new password
  verify-email/page.tsx  ← Landing page after email link click
```

### Component Structure
```
AuthPage
+-- AuthCard
|   +-- EmailInput
|   +-- PasswordInput (min 8 chars, enforced client + server)
|   +-- SubmitButton
|   +-- ErrorAlert (inline validation errors)
|   +-- ForgotPasswordLink / RegisterLink / LoginLink
+-- VerifyEmailPrompt
    +-- ResendVerificationButton
```

### Route Protection
- Next.js middleware checks Supabase session on every request
- Unauthenticated users are redirected to `/login?returnUrl=...`
- Unverified users are redirected to `/verify-email`

### Data Stored
- Supabase Auth manages: email, hashed password (bcrypt), email verified flag, JWT tokens
- No additional user profile table needed for MVP
- DSGVO: minimal data — only email stored, no name or phone required

### Dependencies
- `@supabase/ssr` — Supabase SSR client for Next.js App Router middleware + server components

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
