import Isotipo from "./Isotipo";

/**
 * Cargador de entrada: el isotipo aparece sobre crema y la pantalla se abre.
 *
 * Tres decisiones para que no estorbe:
 *  - Sólo en la primera página de la sesión. `introScript` corre en el <head>
 *    antes de pintar y marca <html data-intro="seen"> si ya se vio; el CSS lo
 *    oculta en ese caso, así que no hay parpadeo al navegar.
 *  - La salida es una animación CSS, no JavaScript: si el JS falla o tarda,
 *    el cargador se va igual a los 1.4 segundos.
 *  - Con prefers-reduced-motion no aparece.
 */
export default function BrandLoader() {
  return (
    <div className="brand-loader" aria-hidden="true">
      <Isotipo className="brand-loader__mark h-16 w-auto text-terra" />
    </div>
  );
}

/** Se inyecta en el <head>. Va en una sola línea y envuelto en try: si el
 *  navegador bloquea sessionStorage, el cargador simplemente se muestra. */
export const introScript =
  "try{if(sessionStorage.getItem('ruha-intro')){document.documentElement.dataset.intro='seen'}else{sessionStorage.setItem('ruha-intro','1')}}catch(e){}";
