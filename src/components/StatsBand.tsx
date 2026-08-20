import type { Locale } from "@/content/site";
import { stats } from "@/content/site";
import { t } from "@/lib/i18n";
import Counter from "./Counter";
import Reveal from "./Reveal";

/**
 * Lo primero que mira un desarrollador. El conteo de marcas es la forma más
 * rápida de comunicar que la operadora es multimarca.
 */
export default function StatsBand({ locale }: { locale: Locale }) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <Reveal key={index} delay={index * 90} className="panel px-6 py-10 lg:px-8 lg:py-12">
          <p className="display text-[clamp(2.75rem,6vw,4.5rem)] text-cream">
            <Counter value={stat.value} />
            {stat.suffix}
          </p>
          <p className="mt-3 max-w-[18ch] text-[13px] leading-snug text-cream-dim">
            {t(stat.label, locale)}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
