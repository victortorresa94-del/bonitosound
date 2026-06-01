import Link from "next/link";
import Image from "next/image";
import { Section, Cta } from "@/components/ui";
import { Superhero } from "@/components/Superhero";
import { InstagramFeed, SpotifyEmbed } from "@/components/Embeds";
import { RosterHover } from "@/components/RosterHover";
import { findLogo } from "@/lib/assets";
import { MarqueeLogoWall } from "@/components/motion";
import { getArtists } from "@/lib/content";
import { findAsset } from "@/lib/assets";
import { brands, memberships, support, supportPending, team, site } from "@/lib/site";

/* Motivos decorativos */
function Star({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M12 2c.6 5 .8 7.4 5 8-4.2.6-4.4 3-5 8-.6-5-.8-7.4-5-8 4.2-.6 4.4-3 5-8Z" fill="currentColor" />
    </svg>
  );
}
function Note({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden>
      <path d="M9 17V5l10-2v12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="6" cy="17" r="3" stroke="currentColor" strokeWidth="2" />
      <circle cx="16" cy="15" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
function Squiggle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 16" className={className} fill="none" aria-hidden preserveAspectRatio="none">
      <path d="M2 8c10-10 20 10 30 0s20-10 30 0 16-2 16-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const verticals = [
  { title: "Eventos", slug: "eventos", href: "/eventos", kicker: "01 — B2B", desc: "Activaciones para marcas y giras. Del brief al titular en 6 semanas.", state: "eventos" as const },
  { title: "Records", slug: "records", href: "/records", kicker: "02 — Artistas", desc: "Sello, booking, management, distribución y editorial.", state: "records" as const },
  { title: "Lab", slug: "lab", href: "/lab", kicker: "03 — Tecnología", desc: "Artiverse y Giraverse. El software que el sector no tiene.", state: "home" as const },
  { title: "Jaleo Sound", slug: "jaleo", href: "/jaleo-sound", kicker: "04 — Festival", desc: "Cultura española y latina en Amsterdam. Por qué no.", state: "home" as const },
];

const stats = [
  { n: "30", suffix: "", unit: "años", label: "en la industria musical" },
  { n: "17", suffix: "", unit: "marcas", label: "premium nos llaman" },
  { n: "200", suffix: "+", unit: "users", label: "en Artiverse" },
  { n: "5", suffix: "", unit: "verticales", label: "un solo ecosistema" },
];

const jaleoLineup = [
  { name: "Grupo Puerto", line: "Afro-latin melodic jazz." },
  { name: "Lucía Conde", line: "Nostalgia española + electrónica holandesa." },
  { name: "Andrés Barrios — Km.0", line: "Flamenco al piano, contemporáneo." },
  { name: "AlexAbril", line: "Flamenco-jazz fusion." },
];

export default function Home() {
  const roster = getArtists().filter((a) => a.tier === "booking").slice(0, 6);
  const rosterItems = roster.map((a) => ({
    slug: a.slug,
    name: a.name,
    genre: a.genre,
    image: a.image ?? findAsset("artistas", a.slug),
  }));
  const heroArt = findAsset("marca", "superheroe-home");

  return (
    <>
      {/* ───────────── 1. HERO ───────────── */}
      <section className="relative overflow-hidden">
        {/* Blobs decorativos (CSS, sin WebGL — el HeroCanvas se veía cortado) */}
        <div
          className="pointer-events-none absolute -left-32 -top-24 -z-10 h-[34rem] w-[34rem] rounded-full opacity-70 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(31,184,154,0.22), transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -right-24 top-40 -z-10 h-[28rem] w-[28rem] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(27,110,230,0.16), transparent 70%)" }}
        />
        <Star className="absolute left-[12%] top-32 h-6 w-6 text-accent-warm/70" />
        <Note className="absolute right-[14%] top-44 hidden h-8 w-8 text-accent-blue/50 md:block" />
        <Star className="absolute bottom-24 right-[28%] h-4 w-4 text-accent-blue/40" />

        <div className="wrap grid items-center gap-10 py-20 md:grid-cols-[1.25fr_0.75fr] md:py-28">
          <div className="stagger">
            <p className="eyebrow">El ecosistema cultural del sector musical</p>
            <h1 className="display mt-5 text-[clamp(3rem,9vw,7rem)] leading-[0.9]">
              No hacemos<br />eventos. Hacemos{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent-blue">jaleo</span>
                <svg className="absolute -bottom-2 left-0 w-full text-accent-warm" viewBox="0 0 200 16" fill="none" aria-hidden preserveAspectRatio="none">
                  <path d="M2 12C40 4 160 4 198 11" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
                </svg>
              </span>.
            </h1>
            <p className="mt-8 max-w-xl text-lg text-text-secondary md:text-xl">
              En la música nadie te regala nada. Llevamos 30 años en la industria. Hace tres montamos Bonito Sound para hacerlo como hay que hacerlo.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Cta href="/eventos/marcas">Cuéntanos qué necesitas →</Cta>
              <Cta href="/records" variant="ghost">Explorar el ecosistema</Cta>
            </div>
          </div>

          <div className="relative mx-auto w-3/4 max-w-sm animate-fade-in md:w-full">
            <div className="absolute inset-0 -z-10 rounded-[42%_58%_62%_38%/45%_42%_58%_55%]" style={{ background: "var(--bg-tertiary)" }} />
            {heroArt ? (
              <Image src={heroArt} alt="Bonito Sound" width={600} height={600} priority className="h-auto w-full" />
            ) : (
              <Superhero state="home" className="w-full" />
            )}
          </div>
        </div>
      </section>

      {/* ───────────── 2. TIRA DE MARCAS ───────────── */}
      <section className="border-y border-subtle bg-bg-secondary py-8">
        <p className="wrap mb-6 text-center text-xs uppercase tracking-[0.2em] text-text-muted">Producimos para</p>
        <MarqueeLogoWall items={brands} dir="marcas" speed={38} />
      </section>

      {/* ───────────── 3. LO QUE HACEMOS ───────────── */}
      <Section>
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Lo que hacemos</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
            La música no es una vertical.<span className="text-accent-blue"> Es un sistema.</span>
          </h2>
          <p className="mt-5 text-lg text-text-secondary">
            Y los proyectos culturales que duran son los que tienen a alguien que entiende el sistema entero — no solo su trozo.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {verticals.map((v) => {
            const img = findAsset("secciones", v.slug);
            return (
              <Link key={v.href} href={v.href} className="group relative flex flex-col rounded-3xl border border-subtle bg-bg-primary p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent-blue/40 hover:shadow-[0_24px_60px_-24px_rgba(27,110,230,0.3)]">
                <div className="mb-6 h-20 w-20">
                  {img ? (
                    <Image src={img} alt="" width={80} height={80} className="h-full w-full object-contain transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  ) : (
                    <Superhero state={v.state} className="h-full w-full" />
                  )}
                </div>
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{v.kicker}</p>
                <h3 className="display mt-1 text-2xl">{v.title}</h3>
                <p className="mt-2 flex-1 text-sm text-text-secondary">{v.desc}</p>
                <span className="mt-5 text-sm font-semibold text-accent-blue">Ver →</span>
              </Link>
            );
          })}
        </div>
      </Section>

      {/* ───────────── 4. STATS — limpio, contundente ───────────── */}
      <section className="relative overflow-hidden border-y border-subtle bg-text-primary py-24 text-bg-primary md:py-32">
        <Star className="absolute left-[8%] top-12 h-8 w-8 text-accent-warm/40" />
        <Note className="absolute bottom-16 right-[10%] h-10 w-10 text-white/15" />
        <Squiggle className="absolute right-1/4 top-20 h-4 w-32 text-accent-warm/30" />

        <div className="wrap">
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Los números</p>
          <h2 className="display mt-3 max-w-3xl text-[clamp(2.4rem,5vw,3.8rem)] leading-tight">
            Lo que <span className="italic text-accent-warm">no se dice</span>, pero se cuenta.
          </h2>

          {/* Lista tipo cuenta — cada stat en una fila grande con divisor */}
          <ul className="mt-20 divide-y divide-white/15 border-y border-white/15">
            {stats.map((s, i) => (
              <li key={s.label} className="group grid grid-cols-12 items-baseline gap-4 py-10 md:py-14">
                <span className="col-span-1 self-start pt-3 text-xs text-white/35">0{i + 1}</span>
                <div className="col-span-11 grid grid-cols-1 items-baseline gap-3 md:grid-cols-[auto_1fr] md:gap-12">
                  <div className="flex items-baseline gap-3">
                    <span className="display text-[clamp(4.5rem,12vw,9rem)] leading-[0.85] tracking-tight">
                      {s.n}<span className="text-accent-warm">{s.suffix}</span>
                    </span>
                    <span className="text-xl text-white/45 md:text-2xl">{s.unit}</span>
                  </div>
                  <p className="self-end pb-4 text-base text-white/70 md:pb-6 md:text-right md:text-lg">
                    {s.label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── 5. ROSTER — lista hover (Earth Agency) ───────────── */}
      <Section className="border-t border-subtle">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow mb-4">Roster</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
              Artistas que no necesitan que les expliquemos quiénes son.
            </h2>
          </div>
          <Cta href="/artistas" variant="ghost">Roster completo →</Cta>
        </div>
        <div className="mt-12">
          <RosterHover items={rosterItems} />
        </div>
      </Section>

      {/* ───────────── 6. JALEO SOUND — banner cartel-festival ───────────── */}
      <section className="relative overflow-hidden text-white" style={{ background: "var(--jaleo-red)" }}>
        {/* Halos */}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[40rem] w-[40rem] rounded-full opacity-40 blur-3xl" style={{ background: "#ff8a5c" }} />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-[36rem] w-[36rem] rounded-full opacity-25 blur-3xl" style={{ background: "#fff" }} />
        <Star className="absolute left-[8%] top-24 h-10 w-10 text-white/30" />
        <Note className="absolute right-[12%] top-40 hidden h-12 w-12 text-white/25 md:block" />
        <Star className="absolute bottom-32 left-[40%] h-5 w-5 text-white/40" />
        <Squiggle className="absolute bottom-20 right-1/4 h-4 w-40 text-white/25" />

        <div className="wrap relative py-24 md:py-32">
          {/* Header del cartel */}
          <div className="grid items-end gap-8 md:grid-cols-[1.6fr_1fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Festival propio · Amsterdam</p>
              <h2 className="display mt-4 text-[clamp(3.5rem,11vw,10rem)] leading-[0.85] tracking-tight">
                Jaleo<br /><span className="italic">Sound</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg text-white/85 md:text-xl">
                No massive stages, no VIP fences, no nonsense. Just music, good taste, great food and people.
              </p>
            </div>
            {/* Bloque fechas */}
            <div className="rounded-3xl border-2 border-white/30 bg-white/5 p-6 backdrop-blur-sm md:p-8">
              <p className="text-xs uppercase tracking-[0.25em] text-white/60">Próxima edición</p>
              <p className="display mt-3 text-[clamp(2.5rem,5vw,4rem)] leading-none">11–12<span className="text-accent-warm-soft"> SEP</span></p>
              <p className="display text-[clamp(2.5rem,5vw,4rem)] leading-none">2026</p>
              <div className="mt-5 border-t border-white/20 pt-4">
                <p className="text-sm font-semibold uppercase tracking-wide text-white/80">Posthoornkerk</p>
                <p className="text-sm text-white/60">Cultural Church · Amsterdam</p>
              </div>
              <a href="https://jaleosound.com" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white underline underline-offset-4 hover:text-accent-warm-soft">
                Comprar entradas →
              </a>
            </div>
          </div>

          {/* Line-up grid */}
          <div className="mt-20">
            <div className="mb-6 flex items-end justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Line-up</p>
              <p className="text-xs text-white/50">+ artistas por anunciar</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {jaleoLineup.map((a, i) => (
                <div key={a.name} className="group relative overflow-hidden rounded-2xl border border-white/25 bg-white/[0.06] p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.12]">
                  <p className="text-xs text-white/40">0{i + 1}</p>
                  <h3 className="display mt-2 text-2xl md:text-3xl">{a.name}</h3>
                  <p className="mt-2 text-sm text-white/70">{a.line}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Playlist embebida */}
          <div className="mt-20 grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">La banda sonora</p>
              <h3 className="display mt-4 text-3xl md:text-4xl">Suena así.</h3>
              <p className="mt-4 max-w-md text-white/75">
                La playlist oficial de Jaleo. Para entender el festival antes de pisar Amsterdam.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link href="/jaleo-sound" className="btn bg-white font-semibold text-[color:var(--jaleo-red)]">
                  Conocer Jaleo →
                </Link>
                <a href="https://jaleosound.com" target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white">
                  jaleosound.com
                </a>
              </div>
            </div>
            <div className="rounded-2xl bg-black/15 p-2">
              <SpotifyEmbed type="playlist" id={site.external.spotifyJaleoPlaylistId} title="Playlist Jaleo Sound" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── 7. LAB ───────────── */}
      <Section>
        <div className="grid items-center gap-12 md:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="eyebrow mb-4">Lab</p>
            <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
              El sector mueve carreras por WhatsApp. Nos parece flipante.
            </h2>
            <p className="mt-5 max-w-2xl text-lg text-text-secondary">
              Por eso construimos software. Artiverse conecta agencias, programadores y promotores — 200+ usuarios. Giraverse llega para ordenar la circulación de giras.
            </p>
            <div className="mt-8">
              <Cta href="/lab" variant="ghost">Conocer el Lab →</Cta>
            </div>
          </div>
          <div className="relative mx-auto hidden w-2/3 md:block">
            <div className="absolute inset-0 -z-10 rounded-[58%_42%_45%_55%/52%_48%_52%_48%]" style={{ background: "var(--bg-secondary)" }} />
            <Superhero state="home" className="w-full" />
          </div>
        </div>
      </Section>

      {/* ───────────── 8. QUIÉNES SOMOS ───────────── */}
      <Section className="bg-bg-secondary">
        <div className="max-w-3xl">
          <p className="eyebrow mb-4">Quiénes somos</p>
          <h2 className="display text-[clamp(2rem,5vw,3.6rem)] leading-[1.02]">
            Gente del sector. Cansada del sector.
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p) => {
            const photo = findLogo("equipo", p.name);
            return (
              <div key={p.name} className="rounded-3xl border border-subtle bg-bg-primary p-6">
                <div className="relative mb-5 aspect-square overflow-hidden rounded-2xl border border-subtle bg-bg-tertiary">
                  {photo && <Image src={photo} alt={p.name} fill sizes="(max-width: 768px) 50vw, 22vw" className="object-cover" />}
                </div>
                <h3 className="display text-lg">{p.name}</h3>
                <p className="mt-1 text-sm text-accent-warm">{p.role}</p>
                <p className="mt-2 text-sm text-text-secondary">{p.line}</p>
              </div>
            );
          })}
        </div>

        {/* Membresías — grid grande, visible */}
        <div className="mt-20">
          <p className="eyebrow mb-6">Miembros activos de</p>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {memberships.map((m) => {
              const src = findLogo("instituciones", m);
              return (
                <div key={m} className="group flex aspect-[3/2] items-center justify-center rounded-xl border border-subtle bg-bg-primary p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent-blue/30 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.15)]">
                  {src ? (
                    <Image src={src} alt={m} width={120} height={60} className="h-12 w-auto max-w-[80%] object-contain opacity-70 transition-opacity group-hover:opacity-100" />
                  ) : (
                    <span className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">{m}</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Apoyos — grid también visible */}
        <div className="mt-12">
          <p className="eyebrow mb-6">Con el apoyo de</p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {support.map((s) => {
              const src = findLogo("apoyos", s);
              return (
                <div key={s} className="flex aspect-[3/2] items-center justify-center rounded-xl border border-subtle bg-bg-primary p-4">
                  {src ? (
                    <Image src={src} alt={s} width={140} height={70} className="h-14 w-auto max-w-[85%] object-contain opacity-80" />
                  ) : (
                    <span className="text-center text-xs font-semibold uppercase tracking-wide text-text-secondary">{s}</span>
                  )}
                </div>
              );
            })}
          </div>
          {supportPending.length > 0 && (
            <p className="mt-4 text-xs text-text-muted">
              También con el apoyo de: {supportPending.join(" · ")}.
            </p>
          )}
        </div>
      </Section>

      {/* ───────────── 9. EN DIRECTO ───────────── */}
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

      {/* ───────────── 10. CTA FINAL ───────────── */}
      <Section className="pb-28">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-text-primary px-8 py-16 text-center text-bg-primary md:py-24">
          <Star className="absolute left-[12%] top-12 h-6 w-6 text-accent-warm/60" />
          <Note className="absolute bottom-12 right-[14%] h-8 w-8 text-white/20" />
          <h2 className="display mx-auto max-w-3xl text-[clamp(2rem,5vw,3.8rem)] leading-[1]">
            ¿Marca, artista o promotor? Hablamos.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/65">
            Una llamada de 30 minutos. Tú cuentas qué necesitas, nosotros te decimos qué se puede hacer de verdad.
          </p>
          <div className="mt-9 flex justify-center">
            <Link href="/contacto" className="btn bg-bg-primary font-semibold text-text-primary">Hablamos →</Link>
          </div>
        </div>
      </Section>
    </>
  );
}
