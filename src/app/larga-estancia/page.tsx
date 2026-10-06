import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Reveal, MaskLines } from "@/components/reveal";
import { IconWhatsApp, IconMail, IconArrowRight, AmenityIcon } from "@/components/icons";
import { APARTMENT, IMAGES } from "@/lib/apartment";
import { Logo } from "@/components/logo";

export const metadata: Metadata = {
  title: "Alquiler por meses en Orihuela Costa | Pinada Sun",
  description:
    "Escapa del frío y teletrabaja desde Orihuela Costa. Tarifas especiales para estancias de media y larga temporada. Fibra óptica, mesa de trabajo y terraza soleada.",
  alternates: {
    canonical: "https://pinadasun.com/larga-estancia",
  },
};

function SectionLabel({
  children,
  color = "gold",
}: {
  children: React.ReactNode;
  color?: "gold" | "pine" | "clay" | "ocean";
}) {
  const colorClass = color === "gold" ? "text-sun" : color === "pine" ? "text-ocean-light" : "text-clay";
  const lineClass = color === "gold" ? "bg-sun" : color === "pine" ? "bg-ocean-light" : "bg-clay";

  return (
    <p className={`mb-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] ${colorClass}`}>
      <span className={`h-px w-8 ${lineClass}`} />
      {children}
    </p>
  );
}

const BENEFITS = [
  {
    icon: "wifi",
    title: "Fibra Óptica de Alta Velocidad",
    desc: "Conexión estable y rápida perfecta para videollamadas y trabajo en remoto sin interrupciones.",
  },
  {
    icon: "ac",
    title: "Climatización Eficiente",
    desc: "Aire acondicionado por conductos Daikin (frío/calor) en todas las estancias para un confort térmico ideal.",
  },
  {
    icon: "kitchen",
    title: "Cocina 100% Equipada",
    desc: "Electrodomésticos completos, lavavajillas, horno y menaje pensado para hacer vida normal durante meses.",
  },
  {
    icon: "terrace",
    title: "Winter Sun Garantizado",
    desc: "Orientación sur que garantiza sol en la terraza y en la vivienda durante todo el invierno. Ideal para desayunar al sol.",
  },
];

export default function LargaEstanciaPage() {
  const whatsappMsg = encodeURIComponent(
    "Hola Raquel y Jose Miguel, estoy interesado en recibir presupuesto e información para alquilar Pinada Sun por varios meses. Mis fechas aproximadas serían..."
  );

  return (
    <div className="overflow-x-clip bg-linen">
      <Header />

      {/* HERO SECTION */}
      <section className="relative flex min-h-[70vh] flex-col justify-end pt-32">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={IMAGES.hero}
            alt="Terraza soleada ideal para estancias de invierno"
            className="kb h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pine-deep via-pine-deep/80 to-pine-deep/40" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <MaskLines
            lines={["TELETRABAJO Y WINTER SUN", "ESTANCIAS DE TEMPORADA"]}
            lineClassName="text-[11px] font-body font-semibold uppercase tracking-[0.32em] text-sun-light"
            delay={100}
            stagger={100}
          />
          <h1 className="mt-6 font-display text-[11vw] leading-[0.95] tracking-tight text-cream sm:text-[8vw] md:text-[5.5vw]">
            <MaskLines
              lines={["Tu hogar al sol,", "durante meses."]}
              lineClassName=""
              delay={350}
              stagger={160}
            />
          </h1>
          <Reveal delay={700}>
            <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-cream/90">
              Escapa del invierno europeo, teletrabaja junto al mar o simplemente tómate una larga pausa. Ofrecemos <strong>tarifas mensuales especiales</strong> para estancias de media temporada en nuestro apartamento en Orihuela Costa.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CONDICIONES & BENEFICIOS */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <SectionLabel color="pine">Por qué elegirnos</SectionLabel>
            <Reveal>
              <h2 className="font-display text-4xl leading-tight tracking-tight text-ink md:text-5xl">
                Preparado para la vida real
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 text-[16px] leading-relaxed text-ink-soft">
                A diferencia de los alquileres puramente vacacionales, Pinada Sun está acondicionado como una primera vivienda. Tienes a tu disposición espacio de almacenaje, una cocina en la que realmente se puede cocinar a diario y un entorno residencial tranquilo todo el año.
              </p>
            </Reveal>
            
            <div className="mt-12 space-y-8">
              {BENEFITS.map((b, i) => (
                <Reveal key={b.title} delay={150 + i * 100}>
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-pine/10 text-pine">
                      <AmenityIcon name={b.icon as any} className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-[16px] font-bold text-ink">{b.title}</h3>
                      <p className="mt-1 text-[14.5px] leading-relaxed text-ink-soft">{b.desc}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* CAJA DE PRECIOS/CONTACTO */}
          <div className="lg:mt-8">
            <Reveal delay={300}>
              <div className="rounded-2xl border border-line bg-white p-8 shadow-sm md:p-10">
                <h3 className="font-display text-3xl text-ink">Solicitar Presupuesto</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                  Las tarifas para largas estancias varían según los meses elegidos y la duración total. Ponte en contacto directamente con nosotros para recibir una oferta personalizada.
                </p>
                
                <div className="mt-8 space-y-4">
                  <p className="text-[13px] font-semibold uppercase tracking-widest text-pine">
                    Qué necesitamos saber:
                  </p>
                  <ul className="space-y-2 text-[14.5px] text-ink-soft">
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> Fechas aproximadas (Llegada y salida)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> Número de personas
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-sun">✔</span> Si necesitas alguna adaptación para teletrabajo
                    </li>
                  </ul>
                </div>

                <div className="mt-10 flex flex-col gap-4">
                  <a
                    href={`https://wa.me/${APARTMENT.whatsapp.replace(/\D/g, "")}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#25D366] px-6 py-4 text-[15px] font-bold text-white transition-all hover:bg-[#20ba5a] hover:scale-[1.02] shadow-md"
                  >
                    <IconWhatsApp className="h-5 w-5" />
                    Contactar por WhatsApp
                  </a>
                  
                  <a
                    href={`mailto:${APARTMENT.email}?subject=Solicitud Larga Estancia`}
                    className="flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-linen px-6 py-4 text-[15px] font-bold text-ink transition-colors hover:bg-line/50"
                  >
                    <IconMail className="h-5 w-5 text-pine" />
                    Enviar un Email
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER SIMPLIFICADO */}
      <footer className="bg-pine-deep text-cream py-12 border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-5 text-center">
          <Logo isLight />
          <p className="text-[14px] text-cream/70 max-w-md">
            Alquiler de temporada en Orihuela Costa. Trato directo y sin intermediarios.
          </p>
          <div className="flex items-center gap-6 text-[13px] text-sun-light mt-4">
            <a href="/" className="hover:text-cream transition-colors">← Volver a la web principal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
