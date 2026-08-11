"use client";

import Link from "next/link";
import { useState } from "react";
import type { Locale } from "@/content/site";
import { href, routes } from "@/lib/i18n";

export type LeadKind = "contact" | "deck" | "job";

type Copy = Record<Locale, string>;

const labels: Record<string, Copy> = {
  name: { es: "Nombre y apellido", en: "Full name" },
  email: { es: "Correo", en: "Email" },
  phone: { es: "Teléfono o WhatsApp", en: "Phone or WhatsApp" },
  company: { es: "Empresa", en: "Company" },
  role: { es: "Puesto de interés", en: "Role of interest" },
  project: { es: "Cuéntanos del activo", en: "Tell us about the asset" },
  city: { es: "Ciudad del proyecto", en: "Project city" },
  cv: { es: "CV (PDF)", en: "CV (PDF)" },
  consent: {
    es: "Acepto el tratamiento de mis datos conforme al aviso de privacidad.",
    en: "I accept the processing of my data under the privacy notice.",
  },
  privacyLink: { es: "Leer el aviso", en: "Read the notice" },
  sending: { es: "Enviando…", en: "Sending…" },
  errorGeneric: {
    es: "No pudimos enviar el formulario. Vuelve a intentarlo o escríbenos directamente.",
    en: "We couldn't send the form. Try again or write to us directly.",
  },
};

const submitLabel: Record<LeadKind, Copy> = {
  contact: { es: "Enviar", en: "Send" },
  deck: { es: "Descargar el deck", en: "Download the deck" },
  job: { es: "Enviar postulación", en: "Send application" },
};

const successLabel: Record<LeadKind, Copy> = {
  contact: {
    es: "Recibido. Te respondemos en menos de 24 horas hábiles.",
    en: "Received. We'll reply within one business day.",
  },
  deck: {
    es: "Listo. Te mandamos el deck al correo que nos dejaste.",
    en: "Done. We've sent the deck to the email you gave us.",
  },
  job: {
    es: "Gracias. Revisamos tu postulación y te escribimos si hay match.",
    en: "Thank you. We'll review your application and get in touch if there's a match.",
  },
};

/**
 * Formulario de captura. Un solo componente para los tres casos del sitio:
 * contacto B2B, descarga del deck y bolsa de trabajo.
 *
 * La descarga del deck es el único evento realmente medible del sitio, así que
 * conviene que pase por acá y no por un enlace suelto a un PDF.
 */
export default function LeadForm({ kind, locale }: { kind: LeadKind; locale: Locale }) {
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const data = new FormData(event.currentTarget);
    data.set("kind", kind);
    data.set("locale", locale);

    try {
      const response = await fetch("/api/leads", { method: "POST", body: data });
      if (!response.ok) throw new Error("request failed");
      setState("done");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <div className="border border-gold/50 bg-cacao-raised/60 p-8">
        <p className="text-[17px] leading-relaxed text-cream">{successLabel[kind][locale]}</p>
      </div>
    );
  }

  const field =
    "w-full border border-hairline bg-cacao-deep px-4 py-3.5 text-[15px] text-cream placeholder:text-cream-faint focus:border-gold focus:outline-none";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{labels.name[locale]}</span>
          <input name="name" required autoComplete="name" className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className="eyebrow">{labels.email[locale]}</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>

      {kind !== "job" && (
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.company[locale]}</span>
            <input name="company" className={field} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.phone[locale]}</span>
            <input name="phone" type="tel" autoComplete="tel" className={field} />
          </label>
        </div>
      )}

      {kind === "contact" && (
        <>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.city[locale]}</span>
            <input name="city" className={field} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.project[locale]}</span>
            <textarea name="project" rows={5} className={field} />
          </label>
        </>
      )}

      {kind === "job" && (
        <>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.role[locale]}</span>
            <input name="role" className={field} />
          </label>
          <label className="flex flex-col gap-2">
            <span className="eyebrow">{labels.cv[locale]}</span>
            {/* TODO: al conectar el backend, subir a almacenamiento privado
                (no adjuntar el CV a un correo) y fijar un límite de tamaño. */}
            <input name="cv" type="file" accept="application/pdf" className={field} />
          </label>
        </>
      )}

      <label className="flex items-start gap-3 pt-2">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#A54F0C]"
        />
        <span className="text-[13px] leading-relaxed text-cream-dim">
          {labels.consent[locale]}{" "}
          <Link href={href(locale, routes.privacy)} className="text-gold underline underline-offset-4">
            {labels.privacyLink[locale]}
          </Link>
        </span>
      </label>

      {state === "error" && (
        <p className="border border-terra/60 bg-terra/10 px-4 py-3 text-[14px] text-cream">
          {labels.errorGeneric[locale]}
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="mt-2 self-start bg-cream px-8 py-4 font-mono text-[11px] uppercase tracking-[0.16em] text-cacao transition-colors hover:bg-gold disabled:cursor-not-allowed disabled:opacity-60"
      >
        {state === "sending" ? labels.sending[locale] : submitLabel[kind][locale]}
      </button>
    </form>
  );
}
