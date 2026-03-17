export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="kern-title kern-title--large">AI Coding Starter Kit</h1>
        <p className="kern-body">
          Starte mit der Bearbeitung von{" "}
          <code className="kern-badge kern-badge--info">
            <span className="kern-label kern-label--small">src/app/page.tsx</span>
          </code>
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="kern-btn kern-btn--primary"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="kern-label">Dokumentation</span>
          </a>
          <a
            className="kern-btn kern-btn--secondary"
            href="https://www.kern-ux.de/komponenten"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="kern-label">KERN UX Komponenten</span>
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="kern-link flex items-center gap-2"
          href="https://nextjs.org/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          Lernen
        </a>
        <a
          className="kern-link flex items-center gap-2"
          href="https://www.kern-ux.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          KERN UX
        </a>
        <a
          className="kern-link flex items-center gap-2"
          href="https://nextjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js
        </a>
      </footer>
    </div>
  )
}
