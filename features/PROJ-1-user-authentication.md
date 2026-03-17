# PROJ-1: User Authentication

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

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
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
