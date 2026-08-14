import LicenseGenerator from "@/components/LicenseGenerator";
import { MdGavel } from "react-icons/md";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://miguelacm.es/tools/license-generator";
const EMBED_URL = process.env.NEXT_PUBLIC_EMBED_URL || "https://miguelacm.es/embed/license-generator";

export const metadata = {
  title: "Generador de Licencias Open Source Gratis",
  description:
    "Genera el texto de licencias MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC o Unlicense para tu repositorio con año y autor personalizados. Copia o descarga el archivo LICENSE listo.",
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Generador de Licencias Open Source Gratis",
  url: SITE_URL,
  description:
    "Genera el texto de licencias MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC o Unlicense para tu repositorio con año y autor personalizados. Copia o descarga el archivo LICENSE listo.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  inLanguage: "es-ES",
  offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
  author: {
    "@type": "Person",
    name: "Miguel Ángel Colorado Marin",
    url: "https://miguelacm.es",
  },
  featureList: [
    "6 licencias: MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC, Unlicense",
    "Año y autor personalizables",
    "Generación instantánea del texto legal",
    "Copiar resultado con un clic",
    "Descarga directa del archivo LICENSE",
    "Sin registro",
    "Código abierto",
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="min-h-screen px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary">
              <MdGavel className="text-base" />
              Herramienta gratuita · Código abierto
            </div>
            <h1 className="mb-3 text-4xl font-bold text-white md:text-5xl">
              Generador de Licencias
            </h1>
            <p className="mb-2 text-lg text-text-muted">
              Genera el archivo LICENSE de tu proyecto open source en segundos, con tu nombre y el año correctos.
            </p>
            <p className="text-sm text-text-muted/60">
              Hecho por{" "}
              <a
                href="https://miguelacm.es"
                target="_blank"
                rel="noopener noreferrer"
                className="gradient-text font-medium hover:opacity-80 transition-opacity"
              >
                MACM
              </a>{" "}
              · Sin registro · Sin anuncios · 100% en el navegador
            </p>
          </div>

          <div className="glass rounded-2xl border border-border/20 p-6 md:p-8">
            <LicenseGenerator />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                icon: "⚖️",
                title: "6 licencias disponibles",
                desc: "MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC y Unlicense, las más usadas en proyectos open source.",
              },
              {
                icon: "✏️",
                title: "Año y autor personalizados",
                desc: "Rellena el titular de los derechos y el año una sola vez y el texto legal se genera automáticamente.",
              },
              {
                icon: "💾",
                title: "Copiar o descargar",
                desc: "Obtén el archivo LICENSE listo para colocar en la raíz de tu repositorio con un solo clic.",
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="glass rounded-xl border border-border/15 p-5"
              >
                <span className="mb-3 block text-2xl">{item.icon}</span>
                <h3 className="mb-1 font-semibold text-white">{item.title}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-4 text-lg font-semibold text-white">
              Cómo generar tu archivo LICENSE
            </h2>
            <ol className="space-y-3">
              {[
                { n: 1, text: "Elige la licencia: MIT, Apache 2.0, GPL 3.0, BSD 3-Clause, ISC o Unlicense." },
                { n: 2, text: "Indica el año y el autor o titular de los derechos." },
                { n: 3, text: "Revisa el texto legal generado en el panel." },
                { n: 4, text: "Copia el texto o descarga directamente el archivo LICENSE." },
              ].map((step) => (
                <li key={step.n} className="flex gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                    {step.n}
                  </span>
                  <p className="text-sm text-text-muted leading-relaxed">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 space-y-4">
            <h2 className="text-lg font-semibold text-white">Preguntas frecuentes</h2>
            {[
              {
                q: "¿Cuál es la diferencia entre MIT y Apache 2.0?",
                a: "Ambas son licencias permisivas muy similares, pero Apache 2.0 añade una concesión explícita de patentes y exige indicar los cambios realizados sobre el código original, protecciones que MIT no incluye.",
              },
              {
                q: "¿Por qué GPL 3.0 y Apache 2.0 muestran un resumen en vez del texto legal completo?",
                a: "Para el archivo LICENSE del repositorio se incluye el resumen legal más el enlace oficial al texto completo, tal y como recomiendan la Free Software Foundation y la Apache Software Foundation respectivamente — es la práctica estándar en miles de proyectos reales en GitHub.",
              },
              {
                q: "¿Necesito registrar la licencia en algún organismo oficial?",
                a: "No. Basta con incluir el archivo LICENSE en la raíz de tu repositorio; el copyright y la licencia se aplican automáticamente por el mero hecho de publicar el código con ese fichero presente.",
              },
              {
                q: "¿Puedo cambiar de licencia más adelante?",
                a: "Sí, aunque solo puedes hacerlo sobre el código del que eres el único titular de los derechos. Si el proyecto ya tiene otros colaboradores, normalmente necesitarás su consentimiento para relicenciarlo.",
              },
              {
                q: "¿Qué licencia debería elegir para un proyecto personal?",
                a: "MIT es la opción más popular por su simplicidad y permisividad. Si te preocupa que empresas usen tu código sin devolver mejoras, GPL 3.0 obliga a mantener el código derivado también abierto.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-xl border border-border/20 bg-white/3 p-5"
              >
                <h3 className="mb-2 font-medium text-white">{item.q}</h3>
                <p className="text-sm text-text-muted leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-border/20 bg-white/3 p-6">
            <h2 className="mb-2 font-semibold text-white">
              Integra el generador de licencias en tu web
            </h2>
            <p className="mb-4 text-sm text-text-muted">
              Puedes embeber este generador en cualquier web con un simple iframe.
            </p>
            <div className="mb-3 rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">Iframe (integración directa):</p>
              <code className="text-xs text-green-400 break-all">
                {`<iframe src="${EMBED_URL}" width="100%" height="700" style="border:none;border-radius:12px;" title="Generador de Licencias Open Source Gratis — miguelacm.es" loading="lazy"></iframe>`}
              </code>
            </div>
            <div className="rounded-lg bg-black/40 p-3">
              <p className="mb-1 text-xs text-text-muted/60">
                Enlace con atribución (recomendado para backlink):
              </p>
              <code className="text-xs text-green-400 break-all">
                {`<a href="${SITE_URL}" target="_blank" rel="noopener">Generador de licencias open source gratis por MACM</a>`}
              </code>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
