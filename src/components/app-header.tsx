import { Button } from "@/components/ui/button"

interface AppHeaderProps {
  userEmail?: string | null
}

export function AppHeader({ userEmail }: AppHeaderProps) {
  return (
    <header style={{ borderBottom: "var(--kern-metric-border-width-light) solid var(--kern-color-layout-border-light)", backgroundColor: "var(--kern-color-layout-background-default)" }}>
      <div className="flex items-center justify-between px-6 py-3 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <h1 className="kern-title kern-title--small">BauCheck NRW</h1>
        </div>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="kern-body kern-body--small kern-body--muted">
              {userEmail}
            </span>
          )}
          <form action="/api/auth/logout" method="POST">
            <Button type="submit" variant="secondary" size="sm">
              Abmelden
            </Button>
          </form>
        </div>
      </div>
    </header>
  )
}
