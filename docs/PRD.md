# Product Requirements Document

## Vision
BauCheck NRW is a SaaS web application that enables architects (Entwurfsverfasser) and building owners (Bauherren) to check the completeness of their building permit applications (Bauanträge) against the Bauordnung NRW. By leveraging AI document analysis, the platform automatically identifies missing documents and required actions — saving time and reducing costly back-and-forth with building authorities.

## Target Users

**Primary: Entwurfsverfasser (Architects / Planners)**
- Licensed architects and planners who submit building permits on behalf of clients
- Pain point: Manual completeness checks are time-consuming; incomplete applications cause rejection delays
- Need: Fast, reliable pre-submission completeness check to catch gaps before submission

**Secondary: Bauherren (Building Owners)**
- Private individuals or developers managing their own building permit process
- Pain point: Unfamiliar with legal requirements; uncertain about which documents to include
- Need: Simple, guided output showing exactly what is missing and what to do next

## Core Features (Roadmap)

| Priority | Feature | Status |
|----------|---------|--------|
| P0 (MVP) | User Authentication | Planned |
| P0 (MVP) | Document Upload | Planned |
| P0 (MVP) | AI Completeness Check | Planned |
| P0 (MVP) | Results Display | Planned |
| P1 | PDF Report Export | Planned |
| P1 | Check History | Planned |

## Success Metrics
- Time to first completed check < 5 minutes
- Check accuracy rate > 90% (validated against actual BauO NRW requirements)
- User return rate > 40% (measured via check history usage)
- Document parsing error rate < 5%

## Constraints
- Solo developer, MVP as fast as possible
- Must comply with DSGVO for handling sensitive architectural documents
- AI analysis cost per check must remain manageable (monitor Claude API token usage)
- DWG file parsing requires additional library (e.g., ezdxf or similar)
- Initial scope: Bauordnung NRW only

## Non-Goals
- No automatic submission to building authorities
- No replacement for legal advice or Baurechtsexpert consultation
- No support for other German state building codes in v1
- No cost estimation or project management features
- No mobile app (web-first only)

---

Use `/requirements` to create detailed feature specifications for each item in the roadmap above.
