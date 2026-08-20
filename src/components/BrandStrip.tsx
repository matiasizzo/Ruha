import type { Locale } from "@/content/site";
import { brands } from "@/content/site";
import { t } from "@/lib/i18n";

/**
 * Franja de marcas. Es una de las dos afirmaciones que el brief pide dejar
 * clarísimas: operadora multimarca.
 *
 * El uso público de marca de franquicia suele requerir aprobación del
 * franquiciante, así que cada marca cae a texto si no hay logo cargado. Cambiar
 * o retirar un logo es tocar `brands` en site.ts y nada más.
 */
export default function BrandStrip({ locale, showSegment = false }: { locale: Locale; showSegment?: boolean }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {brands.map((brandItem) => (
        <li key={brandItem.id} className="panel flex flex-col gap-2 px-5 py-7 text-center">
          {brandItem.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={brandItem.logo}
              alt={brandItem.name}
              className="mx-auto h-8 w-auto object-contain opacity-80"
            />
          ) : (
            <span className="text-[15px] font-medium text-cream">{brandItem.name}</span>
          )}
          <span className="text-[13px] tracking-normal text-cream-faint">
            {brandItem.group}
          </span>
          {showSegment && (
            <span className="text-[13px] text-cream-dim">{t(brandItem.segment, locale)}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
