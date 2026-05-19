import Link from "next/link";
import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { Superhero } from "@/components/Superhero";
import { LogoWall } from "@/components/LogoWall";
import { InstagramFeed } from "@/components/Embeds";
import { getArtists } from "@/lib/content";
import { brands, memberships, support, team } from "@/lib/site";

const verticals = [
  {
    title: "Eventos",
    href: "/eventos",
    desc: "Activaciones para marcas y giras. Del brief al titular.",
    state: "eventos" as const,
  },
  {
    title: "Records",
    href: "/records",
    desc: "Sello, booking, management, distribución y editorial.",
    state: "records" as const,
  },
  {
    title: "Lab",
    href: "/lab",
    desc: "Artiverse y Giraverse. El software que el sector no tiene.",
    state: "home" as const,
  },
  {
    title: "Jaleo Sound",
    href: "/jaleo-sound",
    desc: "Festival propio de cultura española en Amsterdam.",
    state: "home" as const,
  },
];

export default function Home() {
  const roster = getArtists()
    .filter((a) => a.tier === "booking")
    .slice(0, 6);

  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden">
        <div className="wrap grid items-center gap-12 py-24 md:grid-cols-[1.3fr_1fr] md:py-32">
          <div className="stagger">
            <Eyebrow>El único ecosistema cultural integral del sector</Eyebrow>
            <Heading as="h1">
              No hacemos eventos.
              <br />
              Hacemos jaleo.
            </Heading>
            <p className="mt-7 max-w-xl text-lg text-text-secondary">
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
          <div className="mx-auto w-2/3 max-w-sm md:w-full">
            <Superhero state="home" className="w-full animate-fade-in" />
          </div>
        </div>
      </section>

      {/* 2. Lo que hacemos */}
      <Section className="border-t border-subtle">
        <Eyebrow>Lo que hacemos</Eyebrow>
        <Heading>La música no es una vertical. Es un sistema.</Heading>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Y los proyectos culturales que duran son los que tienen a alguien que
          entiende el sistema entero — no solo su trozo.
        </p>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v) => (
            <Link key={v.href} href={v.href} className="card group">
              <Superhero
                state={v.state}
                className="mb-5 h-16 w-16 opacity-80 transition-opacity group-hover:opacity-100"
              />
              <h3 className="display text-xl">{v.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{v.desc}</p>
              <span className="mt-4 inline-block text-sm text-accent-warm">
                Ver →
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. Marcas que nos eligen — prioridad B2B */}
      <Section className="bg-bg-secondary">
        <Eyebrow>Marcas que nos eligen</Eyebrow>
        <Heading>Sin grandes escenarios. Sin zonas VIP. Sin tonterías.</Heading>
        <p className="mt-5 max-w-2xl text-text-secondary">
          Producimos activaciones para Ballantine&apos;s, Pernod Ricard,
          Pepsico, Schweppes, Absolut, Universal y Gestmusic. Cuando una marca
          quiere un evento con música que la gente recuerde — no decorado
          musical — nos llaman.
        </p>
        <div className="mt-10">
          <LogoWall items={brands} />
        </div>
        <div className="mt-10">
          <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
        </div>
      </Section>

      {/* 4. Roster */}
      <Section>
        <Eyebrow>Roster</Eyebrow>
        <Heading>
          Cinco artistas que no necesitan que les expliquemos quiénes son.
        </Heading>
        <div className="mt-12 flex gap-5 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-6">
          {roster.map((a) => (
            <Link
              key={a.slug}
              href={`/artistas/${a.slug}`}
              className="group min-w-[60vw] sm:min-w-[40vw] md:min-w-0"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                <span className="absolute inset-x-0 bottom-0 flex items-end p-5">
                  <span className="display text-2xl">{a.name}</span>
                </span>
              </div>
              <p className="mt-3 text-sm text-text-muted">{a.genre}</p>
            </Link>
          ))}
        </div>
        <div className="mt-10">
          <Cta href="/artistas" variant="ghost">
            Roster completo →
          </Cta>
        </div>
      </Section>

      {/* 5. Jaleo Sound — identidad propia */}
      <section
        className="py-20 md:py-28"
        style={{ background: "var(--jaleo-red)", color: "#fff" }}
      >
        <div className="wrap">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] opacity-80">
            Festival propio
          </p>
          <h2 className="display mt-4 text-[clamp(2rem,4.5vw,3.4rem)]">
            Y un festival propio en Amsterdam, porque por qué no.
          </h2>
          <p className="mt-5 max-w-2xl text-white/85">
            Cultura española y latina. No massive stages, no VIP fences, no
            nonsense. Just music, good taste, great food and people.
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
              Open Call 2026 →
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Lab */}
      <Section className="bg-bg-secondary">
        <div className="grid items-center gap-12 md:grid-cols-[1fr_auto]">
          <div>
            <Eyebrow>Lab</Eyebrow>
            <Heading>
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </Heading>
            <p className="mt-5 max-w-2xl text-text-secondary">
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
          <Superhero state="home" className="hidden h-40 w-40 md:block" />
        </div>
      </Section>

      {/* 7. Quiénes somos */}
      <Section>
        <Eyebrow>Quiénes somos</Eyebrow>
        <Heading>Tres socios, un sistema, cero humo.</Heading>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {team.map((p) => (
            <div key={p.name} className="card">
              <h3 className="display text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
              <p className="mt-3 text-sm text-text-secondary">{p.line}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <LogoWall items={memberships} label="Miembros activos de" />
        </div>
        <div className="mt-10">
          <LogoWall items={support} label="Con el apoyo de" />
        </div>
      </Section>

      {/* 8. En directo */}
      <Section className="bg-bg-secondary">
        <Eyebrow>En directo</Eyebrow>
        <Heading>Lo que se cuece, según Instagram.</Heading>
        <div className="mt-10">
          <InstagramFeed />
        </div>
      </Section>
    </>
  );
}
