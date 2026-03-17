export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8" style={{ backgroundColor: "var(--kern-color-layout-background-muted, #F7F7F9)" }}>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="kern-title kern-title--large">BauCheck NRW</h1>
          <p className="kern-subline mt-2">
            Vollständigkeitsprüfung für Bauanträge
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
