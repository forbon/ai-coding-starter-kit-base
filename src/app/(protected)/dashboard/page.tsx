import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h2 className="kern-title kern-title--large">
          Willkommen bei BauCheck NRW
        </h2>
        <p className="kern-subline mt-2">
          Vollstaendigkeitspruefung fuer Bauantraege
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Neue Pruefung starten</CardTitle>
          <CardDescription>
            Laden Sie Ihre Bauantragsunterlagen hoch und lassen Sie diese automatisch auf Vollstaendigkeit pruefen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard">
            <Button variant="primary">
              Neue Pruefung starten
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
