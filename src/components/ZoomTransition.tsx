import type { Locale } from "@/content/site";
import { brand, heroMedia } from "@/content/site";
import { t } from "@/lib/i18n";
import Isotipo from "./brand/Isotipo";
import { ZoomParallax } from "./ui/zoom-parallax";

/**
 * Puente entre la portada y el cuerpo del sitio: el logo se acerca hasta pasar
 * de largo y entregar la pantalla a las cifras.
 *
 * Las seis imágenes de alrededor son las mismas del hero, así que no hay que
 * mantener dos listas y las fotos reales entran una sola vez, en site.ts.
 */
export default function ZoomTransition({ locale }: { locale: Locale }) {
  const images = heroMedia.slice(0, 6).map((piece) => ({
    src: piece.src,
    alt: "",
    label: piece.label,
  }));

  return (
    <ZoomParallax
      images={images}
      className="bg-cacao"
      centerpiece={
        <div className="flex flex-col items-center gap-4 text-center">
          <Isotipo className="h-[9vh] w-auto text-gold" />
          <p className="font-medium tracking-[0.34em] text-cream" style={{ fontSize: "2vh" }}>
            {brand.name}
          </p>
          <p
            className="italic text-cream-faint"
            style={{ fontSize: "0.85vh" }}
          >
            {t(brand.tagline, locale)}
          </p>
        </div>
      }
    />
  );
}
