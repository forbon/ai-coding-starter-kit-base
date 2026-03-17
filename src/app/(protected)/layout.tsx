import { createSupabaseServerClient } from "@/lib/supabase-server"
import { AppHeader } from "@/components/app-header"

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="min-h-screen flex flex-col bg-[var(--kern-color-gray-50)]">
      <AppHeader userEmail={user?.email} />
      <main className="flex-1">{children}</main>
    </div>
  )
}
