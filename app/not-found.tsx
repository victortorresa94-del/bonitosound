import { Section, Heading, Eyebrow, Cta } from "@/components/ui";
import { serverLocale } from "@/lib/locale-server";
import { tr } from "@/lib/copy-ca";

export default function NotFound() {
  const locale = serverLocale();
  return (
    <Section className="text-center">
      <Eyebrow>Error 404</Eyebrow>
      <Heading as="h1">{tr(locale, "Aquí no hay jaleo.")}</Heading>
      <p className="mx-auto mt-5 max-w-md text-text-secondary">
        {tr(locale, "Esta página no existe o la movimos. El jaleo está en otra parte.")}
      </p>
      <div className="mt-9 flex justify-center">
        <Cta href="/">Volver a casa →</Cta>
      </div>
    </Section>
  );
}
