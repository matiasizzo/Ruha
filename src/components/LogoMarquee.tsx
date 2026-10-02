import type { Locale } from "@/content/site";
import { marquee } from "@/content/site";
import { t } from "@/lib/i18n";

/**
 * Franja de marcas en movimiento, debajo del hero.
 *
 * Es la prueba más rápida de que RÜHA es multimarca: el visitante ve pasar
 * Wyndham, IHG y las plataformas de distribución sin leer un párrafo.
 *
 * - La lista se repite dos veces y la animación corre hasta la mitad, así el
 *   bucle no tiene salto. La copia va oculta para lectores de pantalla.
 * - Se frena al pasar el mouse, y con prefers-reduced-motion queda quieta y se
 *   puede recorrer a mano (ver globals.css).
 * - Hoy van los nombres en texto. Cuando lleguen los PNG aprobados, cada marca
 *   en site.ts recibe su `logo` y acá se muestra la imagen.
 */
export default function LogoMarquee({ locale }: { locale: Locale }) {
  const items = (copy: boolean) =>
    marquee.map((item) => (
      <li
        key={`${item.name}-${copy}`}
        className="flex shrink-0 items-center gap-3 px-10"
        aria-hidden={copy || undefined}
      >
        {item.logo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.logo} alt={copy ? "" : item.name} className="h-10 w-auto object-contain" />
        ) : (
          <span className="whitespace-nowrap text-[20px] font-medium tracking-[-0.01em] text-ink">
            {item.name}
          </span>
        )}
        <span className="whitespace-nowrap rounded-full border border-line px-2.5 py-0.5 text-[11px] text-ink-faint">
          {t(item.kind, locale)}
        </span>
      </li>
    ));

  return (
    <section
      aria-label={locale === "es" ? "Marcas y plataformas con las que operamos" : "Brands and platforms we work with"}
      className="marquee relative overflow-hidden border-b border-line bg-page py-9"
    >
      <ul className="marquee-track flex w-max">
        {items(false)}
        {items(true)}
      </ul>

      {/* Degradé en los bordes: las marcas entran y salen, no aparecen cortadas. */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-page to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-page to-transparent" aria-hidden="true" />
    </section>
  );
}
