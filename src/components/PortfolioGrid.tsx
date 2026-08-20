"use client";

import { useMemo, useState } from "react";
import type { Locale, Property } from "@/content/site";
import { ui } from "@/lib/i18n";
import PropertyCard from "./PropertyCard";

/**
 * Grid del portafolio con filtro por grupo de marca.
 *
 * El filtro no es decoración: es la forma más barata de reforzar que la
 * operadora es multimarca, porque obliga al visitante a ver que hay más de una
 * bandera. Los grupos salen de las propias propiedades, así que agregar una
 * marca nueva en site.ts la hace aparecer sola.
 */
export default function PortfolioGrid({
  properties,
  locale,
}: {
  properties: Property[];
  locale: Locale;
}) {
  const groups = useMemo(() => {
    const found = new Set<string>();
    for (const property of properties) {
      if (property.brandLabel?.includes("Wyndham")) found.add("Wyndham");
      if (property.brandLabel?.includes("IHG")) found.add("IHG");
    }
    return Array.from(found);
  }, [properties]);

  const [active, setActive] = useState<string | null>(null);

  const visible = active
    ? properties.filter((property) => property.brandLabel?.includes(active))
    : properties;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <FilterButton active={active === null} onClick={() => setActive(null)}>
          {ui("allBrands", locale)}
        </FilterButton>
        {groups.map((group) => (
          <FilterButton key={group} active={active === group} onClick={() => setActive(group)}>
            {group}
          </FilterButton>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {visible.map((property, index) => (
          <PropertyCard key={property.slug} property={property} locale={locale} index={index} />
        ))}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`border px-5 py-2.5 text-[13px] tracking-normal transition-colors ${
        active
          ? "border-gold bg-gold text-cacao"
          : "border-hairline text-cream-dim hover:border-hairline-strong hover:text-cream"
      }`}
    >
      {children}
    </button>
  );
}
