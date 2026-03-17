import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BauCheck NRW",
  description: "Vollständigkeitsprüfung für Bauanträge nach BauO NRW",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-kern-theme="light">
      <body>
        {children}
      </body>
    </html>
  );
}
