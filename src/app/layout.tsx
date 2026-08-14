import type { Metadata } from "next";
import "./globals.css";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/license-generator";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Generador de Licencias Open Source Gratis",
    template: "%s | License Generator",
  },
  description:
    "Genera el texto de licencias MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC o Unlicense para tu repositorio con año y autor personalizados. Copia o descarga el archivo LICENSE listo.",
  keywords: [
    "generador de licencias",
    "license generator online",
    "mit license generator",
    "licencia open source gratis",
    "gpl 3.0 texto",
    "apache 2.0 texto licencia",
    "crear archivo license",
  ],
  authors: [{ name: "Miguel Ángel Colorado Marin", url: "https://miguelacm.es" }],
  creator: "Miguel Ángel Colorado Marin",
  openGraph: {
    title: "Generador de Licencias Open Source Gratis",
    description:
      "Genera el archivo LICENSE de tu proyecto open source entre 6 licencias distintas, con año y autor personalizados. Por MACM.",
    url: SITE_URL,
    siteName: "License Generator — MACM",
    type: "website",
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "Generador de Licencias Open Source Gratis",
    description: "Genera tu archivo LICENSE (MIT, Apache 2.0, GPL 3.0 y más) en segundos. Por MACM · miguelacm.es",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="author" href="https://miguelacm.es" />
        <meta name="author" content="Miguel Ángel Colorado Marin" />
        <meta name="copyright" content="Miguel Ángel Colorado Marin — miguelacm.es" />
      </head>
      <body className="antialiased">
        {children}
        <footer className="pb-8 text-center text-xs text-text-muted/40">
          ⚡ por{" "}
          <a
            href="https://miguelacm.es"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            MACM · miguelacm.es
          </a>
          {" · "}
          <a
            href="https://github.com/m-a-c-m/LicenseGenerator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted/60 transition-colors hover:text-text-muted underline-offset-2 hover:underline"
          >
            Código abierto
          </a>
        </footer>
      </body>
    </html>
  );
}
