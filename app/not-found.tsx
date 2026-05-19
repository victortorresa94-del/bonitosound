import { Section, Heading, Eyebrow, Cta } from "@/components/ui";

export default function NotFound() {
  return (
    <Section className="text-center">
      <Eyebrow>Error 404</Eyebrow>
      <Heading as="h1">Aquí no hay jaleo.</Heading>
      <p className="mx-auto mt-5 max-w-md text-text-secondary">
        Esta página no existe o la movimos. El jaleo está en otra parte.
      </p>
      <div className="mt-9 flex justify-center">
        <Cta href="/">Volver a casa →</Cta>
      </div>
    </Section>
  );
}
