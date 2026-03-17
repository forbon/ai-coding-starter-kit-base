# PROJ-2: Document Upload

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Dependencies
- Requires: PROJ-1 (User Authentication) — only logged-in users can upload documents

## User Stories
- As an Entwurfsverfasser, I want to upload multiple files (PDF, images, DWG) at once so that I can provide all documents for a Bauantrag in one step
- As a user, I want to give my submission a name (e.g., "Neubau Musterstraße 5") so that I can identify it later in my check history
- As a user, I want to see upload progress so that I know when my files are ready for analysis
- As a user, I want to remove a file from my upload before submitting so that I can correct mistakes
- As a user, I want to be informed if a file format is not supported so that I know what to do

## Acceptance Criteria
- [ ] User can upload PDF files (up to 50 MB per file)
- [ ] User can upload image files: JPG, PNG (up to 20 MB per file)
- [ ] User can upload DWG files (up to 50 MB per file)
- [ ] User can upload multiple files in a single session (up to 20 files per check)
- [ ] User can name the submission (required field, max 100 characters)
- [ ] Upload progress is shown per file (percentage or spinner)
- [ ] User can remove individual files before confirming the upload
- [ ] Unsupported file formats are rejected with a clear error message listing accepted formats
- [ ] Files exceeding size limits are rejected with a clear size error
- [ ] Uploaded files are stored securely and linked to the user's account
- [ ] After upload confirmation, user is directed to the AI check (PROJ-3)

## Edge Cases
- What if the internet connection drops mid-upload? → Show error, allow retry without re-selecting files
- What if the user uploads 0 files and tries to proceed? → Show validation error requiring at least one file
- What if a file is corrupted or unreadable? → Accept upload but flag it during AI analysis (PROJ-3)
- What if the user uploads duplicate filenames? → Append a counter suffix to avoid overwriting (e.g., plan_2.pdf)
- What if storage quota is exceeded? → Show a user-friendly error and prevent upload

## Technical Requirements
- Storage: Files stored in Supabase Storage with private bucket (user-scoped access only)
- Security: Files accessible only to the owning user (RLS policies)
- DSGVO: Files deleted after check is complete (or on user request) — retention policy TBD
- Accepted MIME types enforced server-side, not just client-side

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
