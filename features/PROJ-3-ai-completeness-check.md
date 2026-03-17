# PROJ-3: AI Completeness Check

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Dependencies
- Requires: PROJ-1 (User Authentication) — check is tied to a user account
- Requires: PROJ-2 (Document Upload) — needs uploaded documents as input

## User Stories
- As an Entwurfsverfasser, I want the system to automatically analyze my uploaded documents so that I don't have to manually go through the BauO NRW checklist
- As a user, I want to see a loading/processing state during analysis so that I know the system is working
- As a user, I want the AI to identify which required documents are present, which are missing, and what information is incomplete
- As a Bauherr, I want the output to be in plain German so that I understand what I need to do next without legal expertise
- As a user, I want to know if the AI was unable to read a specific file so that I can provide a better version

## Acceptance Criteria
- [ ] After upload confirmation, the AI check starts automatically
- [ ] The system extracts text and relevant data from PDF files
- [ ] The system extracts visible content from image files (JPG/PNG) via OCR or vision AI
- [ ] DWG files are parsed for key metadata (scale, drawing type, dimensions)
- [ ] The AI evaluates the uploaded documents against a BauO NRW completeness checklist
- [ ] The check produces a structured result: list of items with status (vollständig / fehlend / unvollständig)
- [ ] Each missing or incomplete item includes a plain-German explanation of what is needed
- [ ] If a file cannot be parsed, it is flagged individually with an explanation
- [ ] The check result is saved to the database linked to the user and upload session
- [ ] Processing time shown to user; timeout after 3 minutes with error message and retry option
- [ ] The AI prompt is grounded in official BauO NRW requirements (§§ to be defined in architecture)

## Edge Cases
- What if all uploaded files are unreadable? → Show error with guidance to re-upload clearer files
- What if the AI returns an ambiguous result? → Default to "unvollständig" (incomplete) rather than "vollständig"
- What if the Claude API is unavailable? → Show service error, allow user to retry later; check not billed/used
- What if the documents are for a non-NRW project? → AI flags this with a warning; check continues on best effort
- What if the user navigates away during processing? → Check continues in background; result available in history (PROJ-6)
- What if cost per check is too high? → Implement token limit per check; warn user if truncation occurred

## Technical Requirements
- AI: Claude API (claude-sonnet-4-6 or later) with vision capabilities for images
- Processing: Server-side only (API keys never exposed to client)
- BauO NRW: Checklist of required items codified as system prompt context
- Timeout: 3-minute hard limit on AI processing
- Cost: Monitor token usage per check; alert if avg cost exceeds threshold

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)

### Approach
AI processing runs entirely server-side in a Next.js API Route. The Claude API (`claude-sonnet-4-6`) analyzes documents using its vision capabilities for images and text extraction for PDFs. DWG files are parsed for structural metadata only. The result is a structured JSON object saved to the database. The browser polls the submission status until `completed` or `failed`.

### Page Structure
```
app/(protected)/check/[id]/page.tsx  ← Processing state / polling UI
app/api/check/route.ts               ← Server-side AI processing endpoint
```

### Component Structure
```
CheckPage (polls submission status every 3s)
+-- ProcessingCard
|   +-- StepIndicator (Hochladen ✓ → Analysieren ⟳ → Abgeschlossen)
|   +-- StatusMessage ("Dokumente werden analysiert…")
|   +-- ProgressSpinner
|   +-- TimeoutWarning (shown after 2.5 minutes)
|   +-- RetryButton (shown on status: failed)
```

### Processing Flow (server-side API Route)
1. Receive `submission_id` from trigger after upload
2. Fetch all `uploaded_files` records for the submission
3. For each file:
   - **PDF**: Extract text content (using pdf-parse or similar)
   - **Images (JPG/PNG)**: Pass directly to Claude vision API
   - **DWG**: Extract metadata (layer names, title block info)
   - **Unreadable**: Mark file as `parse_status: failed`
4. Build a prompt with: extracted content + BauO NRW checklist (§ 70)
5. Call Claude API with structured output request (JSON schema)
6. Claude returns array of check items with status + description
7. Save results to `check_results` table
8. Update submission status to `completed`

### BauO NRW Checklist (§ 70 Bauantragsunterlagen)
The AI system prompt includes this fixed checklist as required context:

| Category | Item |
|----------|------|
| Formulare | Bauantragsformular (NRW), Vollmacht (if applicable) |
| Pläne | Amtlicher Lageplan, Grundrisse (all floors), Ansichten (all 4 sides), Schnitte |
| Beschreibungen | Baubeschreibung, Betriebsbeschreibung (commercial) |
| Nachweise | Standsicherheit, Brandschutz, Wärmeschutz, Abstandsflächen, GRZ/GFZ-Berechnung |
| Entwurfsverfasser | Ausweiskopie, Bauvorlageberechtigung |

### AI Output Schema (structured JSON)
Claude is instructed to return:
```
{
  items: [
    {
      category: string,
      item_name: string,
      status: "vollständig" | "unvollständig" | "fehlend",
      description: string  // plain German, what is needed
    }
  ],
  warnings: string[]  // e.g. "Dokument scheint kein NRW-Projekt zu sein"
}
```

### Database Tables Used
- `submissions`: status updated to `processing` → `completed` / `failed`
- `check_results`: one row per checklist item (category, item_name, status, description)
- `uploaded_files`: parse_status updated per file

### Limits & Cost Controls
- Token limit per check: ~100k input tokens (truncate older documents if needed, warn user)
- Hard timeout: 3 minutes (API route timeout)
- On timeout: update submission to `failed`, user shown retry option

### Dependencies
- `@anthropic-ai/sdk` — Claude API client (server-side only)
- `pdf-parse` — Extract text from PDF files server-side

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
