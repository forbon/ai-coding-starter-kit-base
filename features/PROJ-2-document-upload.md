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

### Approach
Files are uploaded directly from the browser to Supabase Storage using signed upload URLs. A `submissions` record is created in the database to group all files under a named check session. After all files are uploaded, the user confirms and is routed to the processing page (PROJ-3).

### Page Structure
```
app/(protected)/upload/page.tsx
```

### Component Structure
```
UploadPage
+-- UploadForm
|   +-- SubmissionNameInput (required, max 100 chars)
|   +-- FileDropzone (react-dropzone, drag & drop or click)
|   |   +-- FileList
|   |       +-- FileItem
|   |           +-- FileName + FileSize
|   |           +-- UploadProgressBar (per-file %)
|   |           +-- RemoveButton
|   +-- FormatHint (PDF, JPG, PNG, DWG · max 50 MB)
|   +-- ValidationError (shown if 0 files or invalid format/size)
|   +-- SubmitButton ("Prüfung starten")
```

### Data Flow
1. User enters submission name and selects files
2. On submit: create `submissions` record in DB (status: `pending`)
3. Upload each file to Supabase Storage at `{user_id}/{submission_id}/{filename}`
4. Create `uploaded_files` record for each file
5. Update submission status to `processing`
6. Redirect user to `/check/{submission_id}`

### Storage Layout
- Bucket: `documents` (private, RLS enforced)
- Path pattern: `{user_id}/{submission_id}/{filename}`
- Duplicate filenames: append counter suffix server-side (e.g. `plan_2.pdf`)

### Database Tables Used
- `submissions`: id, user_id, name, status, created_at
- `uploaded_files`: id, submission_id, file_name, file_type, storage_path, file_size

### File Validation (client + server)
- Accepted MIME types: `application/pdf`, `image/jpeg`, `image/png`, `image/vnd.dwg` / `application/acad`
- Max size: 50 MB per PDF/DWG, 20 MB per image
- Max files: 20 per submission
- Validation enforced both in FileDropzone (UX) and in API route (security)

### Dependencies
- `@supabase/ssr` — Supabase client with storage support
- `react-dropzone` — Drag-and-drop file selection UI

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
