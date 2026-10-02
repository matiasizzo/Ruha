"use client";

import { useEffect, useRef } from "react";

/**
 * Video de fondo del hero.
 *
 * - Siempre muteado, en bucle e inline: es la única forma de que los
 *   navegadores móviles lo reproduzcan solo.
 * - Con prefers-reduced-motion no se reproduce y queda el póster.
 * - Si el archivo no existe todavía, el navegador muestra el póster, así que
 *   el hero nunca queda vacío.
 */
export default function HeroVideo({ src, poster }: { src: string; poster: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }
    // play() devuelve una promesa que se rechaza si el navegador lo bloquea;
    // en ese caso queda el póster, que es exactamente lo que queremos.
    video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="absolute inset-0 h-full w-full object-cover"
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
