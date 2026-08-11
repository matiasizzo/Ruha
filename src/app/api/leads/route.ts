import { NextResponse } from "next/server";

/**
 * Recepción de formularios: contacto B2B, descarga del deck y postulaciones.
 *
 * Está deliberadamente sin conectar. Lo que falta para producción, en orden:
 *
 *  1. Antispam (Cloudflare Turnstile) verificado acá antes de seguir.
 *  2. Envío del correo al equipo con Resend, y en el caso del deck, el correo
 *     al visitante con un enlace firmado y con vencimiento al PDF.
 *  3. Persistencia del lead: una tabla o el CRM que use RÜHA. El deck sólo
 *     tiene sentido si cada descarga queda registrada.
 *  4. CVs a almacenamiento privado (Vercel Blob o S3), nunca adjuntos a un
 *     correo ni servidos desde una URL pública.
 *  5. Evento de analítica para medir descargas por origen.
 *
 * Hasta que eso exista, el endpoint valida lo mínimo y responde OK para que el
 * flujo del formulario se pueda probar de punta a punta.
 */
export async function POST(request: Request) {
  const form = await request.formData();

  const email = String(form.get("email") ?? "").trim();
  const name = String(form.get("name") ?? "").trim();
  const consent = form.get("consent");

  if (!name || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  // El consentimiento es obligatorio: hay datos personales de por medio y en
  // México el aviso de privacidad no es opcional.
  if (!consent) {
    return NextResponse.json({ error: "consent_required" }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
