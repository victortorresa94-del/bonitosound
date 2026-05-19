/**
 * Muro de logos. v1 = tipográfico (los logos en alta resolución están
 * pendientes de recopilar, §14). Cuando lleguen, se sustituye por <Image/>.
 */
export function LogoWall({
  items,
  label,
}: {
  items: readonly string[];
  label?: string;
}) {
  return (
    <div>
      {label && <p className="eyebrow mb-6">{label}</p>}
      <div className="grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {items.map((name) => (
          <div
            key={name}
            className="flex items-center justify-center rounded-xl border border-subtle bg-bg-secondary/40 px-4 py-6 text-center text-sm font-semibold tracking-wide text-text-secondary transition-colors hover:border-subtle hover:text-text-primary"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
