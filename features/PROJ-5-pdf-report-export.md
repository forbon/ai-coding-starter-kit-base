# PROJ-5: PDF Report Export

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Dependencies
- Requires: PROJ-4 (Results Display) — exports the structured check result as PDF

## User Stories
- As an Entwurfsverfasser, I want to download a formal PDF report of the completeness check so that I can share it with the Bauherr or keep it as documentation
- As a Bauherr, I want a printable summary of missing items so that I can hand it to my architect
- As a user, I want the PDF to include the submission name, check date, and all results so that the report is self-contained and traceable

## Acceptance Criteria
- [ ] User can trigger PDF export from the results page via a "PDF herunterladen" button
- [ ] PDF is generated server-side and downloaded to the user's device
- [ ] PDF contains: BauCheck NRW logo/header, submission name, check date, user email
- [ ] PDF contains a summary section (total items, complete, incomplete, missing counts)
- [ ] PDF contains the full checklist with status and plain-German explanation for each item
- [ ] PDF is formatted for A4 print (readable font sizes, proper page breaks)
- [ ] PDF generation completes in < 10 seconds
- [ ] File is named meaningfully (e.g., `BauCheck_MusterProjekt_2026-03-17.pdf`)
- [ ] If PDF generation fails, user sees an error and can retry

## Edge Cases
- What if the results contain very many items? → PDF paginates correctly without cutting off table rows
- What if the user clicks "Download" multiple times rapidly? → Debounce — only generate once, show loading state
- What if the PDF service times out? → Show error with retry option; do not leave user with a broken download

## Technical Requirements
- PDF generation: Server-side only (e.g., via Puppeteer, react-pdf, or similar)
- File not stored server-side — generated on demand and streamed to client
- No cost per export beyond server compute (no third-party PDF API required)

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
