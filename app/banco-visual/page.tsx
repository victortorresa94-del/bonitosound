import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { Section, Heading, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "Banco visual",
  description: "Repositorio de imágenes generadas — no indexado.",
  robots: { index: false, follow: false },
};

const dir = path.join(process.cwd(), "public", "img", "banco");

function listImages(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.(png|webp|jpe?g|avif)$/i.test(f))
    .sort();
}

export default function BancoVisual() {
  const files = listImages();
  return (
    <>
      <section className="border-b border-subtle">
        <div className="wrap py-20 md:py-28">
          <div className="stagger max-w-3xl">
            <Eyebrow>Interno · noindex</Eyebrow>
            <Heading as="h1">Banco visual.</Heading>
            <p className="mt-7 text-lg text-text-secondary">
              Todas las imágenes generadas que no están colocadas en un slot
              concreto del sitio. Para usar una: copia su nombre, muévela a la
              carpeta que toque y cablea con <code>findAsset</code>.
            </p>
            <p className="mt-3 text-sm text-text-muted">
              {files.length} {files.length === 1 ? "imagen" : "imágenes"} en{" "}
              <code>public/img/banco/</code>
            </p>
          </div>
        </div>
      </section>

      <Section>
        {files.length === 0 ? (
          <div className="rounded-3xl border border-subtle bg-bg-secondary p-12 text-center">
            <p className="text-text-secondary">
              El banco está vacío. Lánzate{" "}
              <code className="text-text-primary">npm run generate-images</code>{" "}
              cuando el entorno tenga red abierta y la key configurada.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {files.map((f) => (
              <figure
                key={f}
                className="overflow-hidden rounded-2xl border border-subtle"
              >
                <div className="relative aspect-square bg-bg-tertiary">
                  <Image
                    src={`/img/banco/${f}`}
                    alt={f}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="border-t border-subtle px-4 py-3 text-xs text-text-muted">
                  {f}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
