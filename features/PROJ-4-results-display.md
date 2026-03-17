# PROJ-4: Results Display

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Dependencies
- Requires: PROJ-3 (AI Completeness Check) — displays the check result data

## User Stories
- As a user, I want to see a clear overview of my check results so that I can quickly understand the overall status of my Bauantrag
- As an Entwurfsverfasser, I want to see each required item with a status (vollständig / fehlend / unvollständig) so that I know exactly where gaps are
- As a user, I want to read plain-German explanations for each missing item so that I know what action to take
- As a Bauherr, I want a summary section showing how many items are complete vs. missing so that I can gauge the overall completeness at a glance
- As a user, I want to be able to filter or sort the results (e.g., show only missing items) so that I can focus on what needs attention

## Acceptance Criteria
- [ ] Results page shows the submission name and upload date
- [ ] Summary section shows total items checked, number complete, number incomplete, number missing
- [ ] Each checklist item shows: item name, status badge (vollständig / unvollständig / fehlend), and plain-German description
- [ ] Items can be filtered by status (all / nur fehlend / nur unvollständig)
- [ ] Files that could not be parsed are listed separately with an explanation
- [ ] Results are read-only — users cannot manually override AI results
- [ ] Page is fully accessible on desktop and tablet (responsive layout)
- [ ] Results link to the PDF export option (PROJ-5)
- [ ] Results link to the check history (PROJ-6)
- [ ] If no issues found, show a success state ("Ihr Antrag scheint vollständig zu sein")

## Edge Cases
- What if there are 0 checklist items returned? → Show error state, prompt user to retry or contact support
- What if the user refreshes the page? → Results must still be shown (persisted in database via PROJ-3)
- What if the user shares the results URL with someone else? → Unauthorized users see a 403/redirect to login
- What if results are still loading when the user opens the page? → Show a processing state with auto-refresh

## Technical Requirements
- Performance: Results page must load in < 2 seconds (data fetched from DB, not re-run AI)
- Security: Results accessible only to the owning user (RLS)
- Accessibility: Status badges must use color + icon + text (not color alone) for colorblind users

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
