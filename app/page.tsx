import Link from "next/link";
import Image from "next/image";
import { Section, Cta } from "@/components/ui";
import { Superhero } from "@/components/Superhero";
import { InstagramFeed } from "@/components/Embeds";
import { MarqueeLogoWall } from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, memberships, support, team } from "@/lib/site";

/* Motivos decorativos inline (estilo mockups Víctor: estrellas, notas, ondas) */
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M12 2c.6 5 .8 7.4 5 8-4.2.6-4.4 3-5 8-.6-5-.8-7.4-5-8 4.2-.6 4.4-3 5-8Z"
        fill="currentColor"
      />
    </svg>
  );
}
function Note({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path
        d="M9 17V5l10-2v12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="15" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

const verticals = [
  {
    title: "Eventos",
    slug: "eventos",
    href: "/eventos",
    kicker: "01 — B2B",
    desc: "Activaciones para marcas y giras. Del brief al titular en 6 semanas.",
    state: "eventos" as const,
  },
  {
    title: "Records",
    slug: "records",
    href: "/records",
    kicker: "02 — Artistas",
    desc: "Sello, booking, management, distribución y editorial.",
    state: "records" as const,
  },
  {
    title: "Lab",
    slug: "lab",
    href: "/lab",
    kicker: "03 — Tecnología",
    desc: "Artiverse y Giraverse. El software que el sector no tiene.",
    state: "home" as const,
  },
  {
    title: "Jaleo Sound",
    slug: "jaleo",
    href: "/jaleo-sound",
    kicker: "04 — Festival",
    desc: "Cultura española y latina en Amsterdam. Por qué no.",
    state: "home" as const,
  },
];

const stats = [
  { n: "30", suffix: " años", label: "en la industria musical" },
  { n: "17", suffix: "", label: "marcas premium" },
  { n: "200", suffix: "+", label: "usuarios en Artiverse" },
  { n: "5", suffix: "", label: "verticales, un ecosistema" },
];

export default function Home() {
  const roster = getArtists()
    .filter((a) => a.tier === "booking")
    .slice(0, 6);
  const heroArt = findAsset("marca", "superheroe-home");

  return (
    <>
      {/* ───────────── HERO ───────────── */}
      <section className="relative overflow-hidden">
        {/* Blobs decorativos */}
        <div
          className="pointer-events-none absolute -left-32 -top-24 -z-10 h-[34rem] w-[34rem] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(31,184,154,0.22), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -right-24 top-40 -z-10 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(27,110,230,0.16), transparent 70%)" }}
        />
        {/* Motivos */}
        <Star className="absolute left-[12%] top-32 h-6 w-6 text-accent-warm/70" />
        <Note className="absolute right-[14%] top-44 hidden h-8 w-8 text-accent-blue/50 md:block" />
        <Star className="absolute bottom-24 right-[28%] h-4 w-4 text-accent-blue/40" />

        <div className="wrap grid items-center gap-10 py-20 md:grid-cols-[1.25fr_0.75fr] md:py-28">
          <div className="stagger">
            <p className="eyebrow">El ecosistema cultural del sector musical</p>
            <h1 className="display mt-5 text-[clamp(3rem,9vw,7rem)] leading-[0.9]">
              No hacemos
              <br />
              eventos. Hacemos{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent-blue">jaleo</span>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-accent-warm"
                  viewBox="0 0 200 16"
                  fill="none"
                  aria-hidden
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 12C40 4 160 4 198 11"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              .
            </h1>
            <p className="mt-8 max-w-xl text-lg text-text-secondary md:text-xl">
              En la música nadie te regala nada. Llevamos 30 años en la
              industria. Hace tres montamos Bonito Sound para hacerlo como hay
              que hacerlo.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
              <Cta href="/records" variant="ghost">
                Explorar el ecosistema
              </Cta>
            </div>
          </div>

          <div className="relative mx-auto w-3/4 max-w-sm animate-fade-in md:w-full">
            {/* Blob de fondo del personaje */}
            <div
              className="absolute inset-0 -z-10 rounded-[42%_58%_62%_38%/45%_42%_58%_55%]"
              style={{ background: "var(--bg-tertiary)" }}
            />
            {heroArt ? (
              <Image
                src={heroArt}
                alt="Bonito Sound"
                width={600}
                height={600}
                priority
                className="h-auto w-full"
              />
            ) : (
              <Superhero state="home" className="w-full" />
            )}
          </div>
        </div>
      </section>

      {/* ───────────── TIRA DE CONFIANZA (marcas) ───────────── */}
      <section className="border-y border-subtle bg-bg-secondary py-8">
        <p className="wrap mb-6 text-center text-xs uppercase tracking-[0.2em] text-text-muted">
          Producimos para
        </p>
        <MarqueeLogoWall items={brands} dir="marcas" speed={38} />
      </section>

      {/* ───────────── LO QUE HACEMOS ───────────── */}
      <Section>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Lo que hacemos</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
            La música no es una vertical.
            <span className="text-accent-blue"> Es un sistema.</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            Y los proyectos culturales que duran son los que tienen a alguien
            que entiende el sistema entero — no solo su trozo.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v) => {
            const img = findAsset("secciones", v.slug);
            return (
              <Link
                key={v.href}
                href={v.href}
                data-cursor="link"
                className="group relative flex flex-col rounded-3xl border border-subtle bg-bg-primary p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(27,110,230,0.3)]"
              >
                <div className="mb-6 h-20 w-20">
                  {img ? (
                    <Image
                      src={img}
                      alt=""
                      width={80}
                      height={80}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
                    />
                  ) : (
                    <Superhero state={v.state} className="h-full w-full" />
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  {v.kicker}
                </p>
                <h3 className="display mt-1 text-2xl">{v.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-secondary">
                  {v.desc}
                </p>
                <span className="mt-5 text-sm font-semibold text-accent-blue">
                  Ver →
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ───────────── STATS ───────────── */}
      <section className="border-y border-subtle bg-text-primary py-16 text-bg-primary md:py-20">
        <div className="wrap grid grid-cols-2 gap-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="display text-[clamp(2.6rem,6vw,4.5rem)] leading-none">
                {s.n}
                <span className="text-accent-warm">{s.suffix}</span>
              </p>
              <p className="mt-3 text-sm text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────── ROSTER ───────────── */}
      <Section>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Roster</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
              Artistas que no necesitan que les expliquemos quiénes son.
            </h2>
          </div>
          <Cta href="/artistas" variant="ghost">
            Roster completo →
          </Cta>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {roster.map((a, i) => {
            const photo = a.image ?? findAsset("artistas", a.slug);
            return (
              <Link
                key={a.slug}
                href={`/artistas/${a.slug}`}
                data-cursor="link"
                className={`group relative overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary ${
                  i === 0 ? "col-span-2 row-span-2 aspect-square lg:col-span-2 lg:row-span-2" : "aspect-[3/4]"
                }`}
              >
                {photo && (
                  <Image
                    src={photo}
                    alt={a.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="display text-xl leading-none text-white md:text-2xl">
                    {a.name}
                  </p>
                  <p className="mt-1 text-[11px] uppercase tracking-wide text-white/70">
                    {a.genre}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ───────────── JALEO (identidad roja) ───────────── */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{ background: "var(--jaleo-red)", color: "#fff" }}
      >
        <div
          className="pointer-events-none absolute -right-20 -top-24 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "#ff8a5c" }}
        />
        <Star className="absolute left-[10%] top-16 h-8 w-8 text-white/30" />
        <Note className="absolute bottom-20 right-[16%] h-10 w-10 text-white/25" />
        <div className="wrap relative">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
            Festival propio · Amsterdam
          </p>
          <h2 className="display mt-4 max-w-3xl text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.95]">
            Y un festival propio en Amsterdam, porque por qué no.
          </h2>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            No massive stages, no VIP fences, no nonsense. Just music, good
            taste, great food and people.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="https://jaleosound.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-white font-semibold text-[color:var(--jaleo-red)]"
            >
              Web del festival →
            </a>
            <Link
              href="/jaleo-sound"
              className="btn border border-white/40 text-white"
            >
              Conocer Jaleo →
            </Link>
          </div>
        </div>
      </section>

      {/* ───────────── LAB ───────────── */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4">Lab</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              Por eso construimos software. Artiverse conecta agencias,
              programadores y promotores — 200+ usuarios. Giraverse llega para
              ordenar la circulación de giras.
            </p>
            <div className="mt-8">
              <Cta href="/lab" variant="ghost">
                Conocer el Lab →
              </Cta>
            </div>
          </div>
          <div className="relative mx-auto hidden w-2/3 md:block">
            <div
              className="absolute inset-0 -z-10 rounded-[58%_42%_45%_55%/52%_48%_52%_48%]"
              style={{ background: "var(--bg-secondary)" }}
            />
            <Superhero state="home" className="w-full" />
          </div>
        </div>
      </Section>

      {/* ───────────── QUIÉNES SOMOS ───────────── */}
      <Section className="bg-bg-secondary">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Quiénes somos</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
            Gente del sector. Cansada del sector.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => {
            const photo = findAsset(
              "equipo",
              p.name
                .toLowerCase()
                .normalize("NFD")
                .replace(/[̀-ͯ]/g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, ""),
            );
            return (
              <div
                key={p.name}
                className="rounded-3xl border border-subtle bg-bg-primary p-6"
              >
                <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  {photo && (
                    <Image
                      src={photo}
                      alt={p.name}
                      fill
                      sizes="(max-width: 768px) 50vw, 22vw"
                      className="object-cover"
                    />
                  )}
                </div>
                <h3 className="display text-lg">{p.name}</h3>
                <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
                <p className="mt-2 text-sm text-text-secondary">{p.line}</p>
              </div>
            );
          })}
        </div>
        <div className="mt-14 space-y-8">
          <MarqueeLogoWall
            items={memberships}
            dir="instituciones"
            label="Miembros activos de"
            speed={30}
          />
          <MarqueeLogoWall
            items={support}
            dir="apoyos"
            label="Con el apoyo de"
            speed={30}
            direction="right"
          />
        </div>
      </Section>

      {/* ───────────── EN DIRECTO ───────────── */}
      <Section>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">En directo</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
            Lo que se cuece, según Instagram.
          </h2>
        </div>
        <div className="mt-10">
          <InstagramFeed />
        </div>
      </Section>

      {/* ───────────── CTA FINAL ───────────── */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-text-primary px-8 py-16 text-center text-bg-primary md:py-24">
          <Star className="absolute left-[12%] top-12 h-6 w-6 text-accent-warm/60" />
          <Note className="absolute bottom-12 right-[14%] h-8 w-8 text-white/20" />
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5vw,3.8rem)] leading-[1]">
            ¿Marca, artista o promotor? Hablamos.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/65">
            Una llamada de 30 minutos. Tú cuentas qué necesitas, nosotros te
            decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-9 flex justify-center">
            <Link
              href="/contacto"
              className="btn bg-bg-primary font-semibold text-text-primary"
            >
              Hablamos →
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
