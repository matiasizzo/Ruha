"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * Zoom por scroll: las piezas crecen a distinta velocidad mientras la sección
 * queda fija, de manera que el visitante las atraviesa.
 *
 * Basado en el componente ZoomParallax publicado, con estos cambios:
 *
 *  1. Importa de motion/react en lugar de framer-motion. Es la misma API —
 *     motion es el sucesor del paquete— y el proyecto ya lo tiene por el
 *     parallax de puntero. Instalar los dos duplicaría la librería de
 *     animación en el bundle.
 *  2. Acepta una pieza central propia, no sólo imágenes: acá el que se acerca
 *     es el logo, y termina de pasar por encima para entregar la pantalla a la
 *     sección siguiente.
 *  3. Respeta prefers-reduced-motion. Con el movimiento desactivado no hay
 *     zoom, la sección mide una pantalla y la composición se ve quieta.
 *  4. Las posiciones salen de una tabla en lugar de una cadena de clases
 *     condicionales, que era imposible de ajustar sin romper algo.
 *
 * El costo a tener en cuenta: cada pantalla de scroll acá es una pantalla sin
 * información. En un sitio que le vende a alguien que entró a evaluar una
 * operadora, eso se paga.
 */

interface ZoomImage {
  src: string;
  alt?: string;
  /** Pie opcional; sirve para que la pieza diga algo además de decorar. */
  label?: string;
}

interface ZoomParallaxProps {
  /** Hasta seis imágenes alrededor de la pieza central. */
  images: ZoomImage[];
  /** Pieza central, la que más se acerca. */
  centerpiece?: ReactNode;
  /** Alto total del recorrido. Más alto, más lento el zoom. */
  height?: string;
  className?: string;
}

/**
 * Posición y escala final de cada pieza. La primera fila es la central; el
 * resto se reparte alrededor para que el encuadre quede equilibrado mientras
 * todo crece.
 */
const LAYERS = [
  { top: "0vh", left: "0vw", height: "30vh", width: "30vw", scale: 9 },
  { top: "-30vh", left: "5vw", height: "30vh", width: "35vw", scale: 4 },
  { top: "-10vh", left: "-25vw", height: "45vh", width: "20vw", scale: 5 },
  { top: "0vh", left: "27.5vw", height: "25vh", width: "25vw", scale: 6 },
  { top: "27.5vh", left: "5vw", height: "25vh", width: "20vw", scale: 5 },
  { top: "27.5vh", left: "-22.5vw", height: "25vh", width: "30vw", scale: 6 },
  { top: "22.5vh", left: "25vw", height: "15vh", width: "15vw", scale: 8 },
];

export function ZoomParallax({
  images,
  centerpiece,
  height = "260vh",
  className = "",
}: ZoomParallaxProps) {
  const container = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  // Los hooks no pueden ir dentro de un condicional, así que el destino de
  // cada escala se decide acá: con movimiento reducido, todas se quedan en 1.
  const to = (value: number) => (reduced ? 1 : value);

  const scales = [
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[0].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[1].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[2].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[3].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[4].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[5].scale)]),
    useTransform(scrollYProgress, [0, 1], [1, to(LAYERS[6].scale)]),
  ];

  // La pieza central se desvanece sobre el final: es lo que hace que el logo
  // "pase" y entregue la pantalla en lugar de quedar tapándola.
  const centerOpacity = useTransform(
    scrollYProgress,
    [0, 0.7, 0.95],
    [1, 1, reduced ? 1 : 0],
  );

  // Los pies estorban apenas empieza el zoom.
  const labelOpacity = useTransform(scrollYProgress, [0, 0.18], [1, reduced ? 1 : 0]);

  const layers = LAYERS.slice(0, images.length + (centerpiece ? 1 : 0));

  return (
    <div
      ref={container}
      className={`relative ${className}`}
      style={{ height: reduced ? "100vh" : height }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {layers.map((layer, index) => {
          const isCenter = Boolean(centerpiece) && index === 0;
          const image = centerpiece ? images[index - 1] : images[index];

          return (
            <motion.div
              key={index}
              style={{ scale: scales[index], opacity: isCenter ? centerOpacity : undefined }}
              className="absolute top-0 flex h-full w-full items-center justify-center"
            >
              <div
                className="relative"
                style={{
                  top: layer.top,
                  left: layer.left,
                  height: layer.height,
                  width: layer.width,
                }}
              >
                {isCenter ? (
                  <div className="flex h-full w-full items-center justify-center">
                    {centerpiece}
                  </div>
                ) : (
                  image && (
                    <figure className="h-full w-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={image.src}
                        alt={image.alt ?? ""}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                      {image.label && (
                        <motion.figcaption
                          style={{ opacity: labelOpacity }}
                          className="mt-2 text-[12px] tracking-normal text-cream-faint"
                        >
                          {image.label}
                        </motion.figcaption>
                      )}
                    </figure>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
