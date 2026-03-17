---
paths:
  - "src/components/**"
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
  - "src/hooks/**"
---

# Frontend Development Rules

## KERN UX First (MANDATORY)
- Before creating ANY UI component, check if a KERN UX wrapper exists: `ls src/components/ui/`
- NEVER create custom implementations of: Button, Input, Select, Checkbox, Switch, Dialog, Modal, Alert, Toast, Table, Tabs, Card, Badge, Dropdown, Popover, Tooltip, Navigation, Sidebar, Breadcrumb
- All UI components use KERN UX CSS classes (kern-*) from @kern-ux/native
- Custom components are ONLY for business-specific compositions that internally use KERN primitives
- Reference: https://www.kern-ux.de/komponenten

## Import Pattern
```tsx
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
```

## Component Standards
- Use Tailwind CSS for layout, KERN CSS classes for component styling
- All components must be responsive (mobile 375px, tablet 768px, desktop 1440px)
- Implement loading states, error states, and empty states
- Use semantic HTML and ARIA labels for accessibility (KERN emphasizes Barrierefreiheit)
- Keep components small and focused
- Use TypeScript interfaces for all props

## Auth Best Practices (Supabase)
- Use `window.location.href` for post-login redirect (not `router.push`)
- Always verify `data.session` exists before redirecting
- Always reset loading state in all code paths (success, error, finally)
