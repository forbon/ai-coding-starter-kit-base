# PROJ-6: Check History

## Status: Planned
**Created:** 2026-03-17
**Last Updated:** 2026-03-17

## Dependencies
- Requires: PROJ-1 (User Authentication) — history is tied to a user account
- Requires: PROJ-3 (AI Completeness Check) — history entries are created when checks complete

## User Stories
- As a user, I want to see a list of all my previous Bauantrag checks so that I can track my submissions over time
- As an Entwurfsverfasser, I want to re-open a previous check result so that I can review it again without re-uploading
- As a user, I want to delete a check from my history so that I can remove outdated or test submissions
- As a user, I want each history entry to show the submission name, check date, and overall status at a glance

## Acceptance Criteria
- [ ] History page lists all checks belonging to the logged-in user, sorted by date (newest first)
- [ ] Each history entry shows: submission name, date of check, total items, completeness status summary (e.g., "3 fehlend")
- [ ] User can click an entry to view the full results (PROJ-4)
- [ ] User can delete a history entry with a confirmation dialog
- [ ] Deleting a history entry also deletes the associated uploaded files from storage
- [ ] History page is paginated if more than 20 entries exist
- [ ] Empty state is shown for users with no checks yet, with a CTA to start a new check
- [ ] History entries are accessible only to the owning user (RLS enforced)

## Edge Cases
- What if the check is still processing when shown in history? → Show a "wird geprüft..." loading state with auto-refresh
- What if the user deletes an entry that is currently being processed? → Cancel processing and clean up files
- What if there are hundreds of entries? → Pagination (20 per page) with search/filter by name
- What if a history entry's files were already deleted? → Show results from DB (results persist even if files are purged)

## Technical Requirements
- Performance: History list loads in < 1 second (lightweight query, no file loading)
- Security: Row-level security on all history and file queries
- Storage: Define file retention policy — uploaded files deleted after X days or on user request

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
