# RÜHA · sitio web

Sitio corporativo de RÜHA Hospitality Group: operadora hotelera multimarca y
administradora de propiedades en México.

No es un sitio de hotel. Es un sitio de venta B2B: la audiencia principal son
desarrolladores y dueños de activos, y la conversión del sitio es la descarga
del deck corporativo a cambio del correo. No hay motor de reservas, carrito ni
pasarela de pagos, y no debe haberlos.

## Cómo correrlo

```bash
npm install
npm run dev     # http://localhost:3000 → redirige a /es
npm run build   # 22 páginas estáticas (11 rutas × 2 idiomas)
```

## Stack

| Capa | Elección | Nota |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Todas las páginas se prerenderizan estáticas |
| Estilos | Tailwind v4 | Tokens de marca definidos en `src/app/globals.css` |
| Idiomas | Rutas `/es` y `/en` | Resuelto a mano en `src/lib/i18n.ts`, sin dependencias |
| Tipografía | Poppins (`next/font`) | Es la tipografía de la identidad de Monarca |
| Contenido | `src/content/site.ts` | Fuente única; es el esquema a replicar cuando entre un CMS |

## Estructura

```
src/
├── app/
│   ├── [locale]/            layout raíz (define <html lang>) + páginas
│   │   ├── page.tsx                    home
│   │   ├── nosotros/
│   │   ├── que-hacemos/
│   │   ├── portafolio/  + aperturas/
│   │   ├── marcas/
│   │   ├── desarrolladores/ + deck/    la página que convierte
│   │   ├── casos/
│   │   ├── contacto/
│   │   ├── trabaja-con-nosotros/
│   │   └── aviso-de-privacidad/
│   ├── api/leads/           recepción de los tres formularios (sin conectar)
│   └── globals.css          paleta, tipografía y animaciones
├── components/
├── content/site.ts          TODO el contenido editable
├── lib/i18n.ts              rutas, diccionario de interfaz
└── middleware.ts            raíz y rutas sin idioma → /es o /en
```

Los slugs son iguales en los dos idiomas a propósito: un solo árbol de archivos
y enlaces que sobreviven al cambio de idioma.

## Decisiones de diseño

- **Un solo mundo visual, en café oscuro.** No hay tema claro conmutable: es una
  decisión de dirección de arte, no un olvido.
- **El sitio no depende de fotografía.** Casa Selva abre en octubre de 2026 y
  Dazzler en marzo de 2027, así que buena parte del material va a ser render.
  Los fondos son atmósferas construidas en CSS, pensadas para que sustituirlas
  por foto o video sea cambiar una capa.
- **El mapa dibuja el país completo y marca sólo los cuatro destinos reales.**
  Separa el hecho de la ambición sin fingir cobertura nacional. La silueta se
  genera proyectando coordenadas, no con un trazo dibujado a mano.
- **Las marcas de franquicia caen a texto si no hay logo.** Su uso público suele
  requerir aprobación del franquiciante; cambiar o retirar un logo es tocar
  `brands` en `site.ts` y nada más.
- **Movimiento contenido y siempre con `prefers-reduced-motion`.** Revelados al
  entrar en pantalla, contadores en las cifras y deriva lenta del hero.

## Lo que falta para poder publicar

Contenido que depende del cliente (marcado con `TODO` en el código):

- [ ] Vectoriales del logo y manual de marca de Monarca
- [ ] Cifras agregadas confirmadas (`stats` en `site.ts`)
- [ ] Deck corporativo en PDF, versión final
- [ ] Fotos: retratos de los tres socios, propiedades en operación, renders
- [ ] PNG de Wyndham, Ramada, Dazzler, Holiday Inn y Vöco
- [ ] Trayectoria de los socios y resultado publicable del caso Casa Selva
- [ ] Enlace real del Portal de Propietarios y correo de contacto
- [ ] Dominio definitivo (`brand.siteUrl`)

Técnico:

- [ ] Conectar `src/app/api/leads/route.ts`: antispam, envío de correo,
      persistencia del lead, enlace firmado del deck y subida de CVs a
      almacenamiento privado
- [ ] Analítica con evento propio para cada descarga del deck
- [ ] Imagen de Open Graph (los enlaces se comparten sobre todo por WhatsApp)
- [ ] Revisión legal del aviso de privacidad y banner de cookies
- [ ] Traducción al inglés revisada por humano, sobre todo en
      `/desarrolladores`

## Dominio

El sitio no fija dominio todavía: `brand.siteUrl` en `site.ts` es un
marcador. El correo corporativo de RÜHA vive en un dominio en uso y de él
depende la operación de todos los hoteles, así que **no se toca ningún
registro MX** hasta decidir el dominio definitivo y coordinar la ventana de
cambio.
