import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/header";
import { VisitCounter } from "@/components/visit-counter";

export const metadata: Metadata = {
  title: "Consejos de seguridad y emergencias en Orihuela Costa | Pinada Sun",
  description:
    "Evita robos y percances en tus vacaciones. Consejos sobre objetos personales en la playa, seguridad en el hogar y teléfonos de emergencia (Policía Local, 112).",
  alternates: {
    canonical: "https://pinadasun.com/guia-local/consejos-seguridad-orihuela-costa",
  },
};

export default function ConsejosSeguridadPage() {
  return (
    <div className="bg-linen min-h-screen text-ink">
      <Header />
      
      <main className="mx-auto max-w-3xl px-5 py-32 md:px-8">
        <nav className="mb-8 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-pine/60">
          <Link href="/" className="hover:text-pine transition-colors">Inicio</Link>
          <span>/</span>
          <Link href="/guia-local" className="hover:text-pine transition-colors">Guía Local</Link>
        </nav>

        <h1 className="font-display text-4xl leading-tight tracking-tight text-pine-deep md:text-5xl">
          Seguridad en vacaciones: Consejos y prevención
        </h1>
        
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium text-ink-soft">
          <span className="rounded-full bg-pine/10 px-3 py-1 text-pine">Seguridad</span>
          <span>Lectura: 3 min</span>
        </div>

        <article className="prose prose-pine mt-12 max-w-none text-[16px] leading-relaxed text-ink/90 prose-h2:font-display prose-h2:text-3xl prose-h2:text-pine-deep prose-h2:mt-12 prose-h3:text-xl prose-h3:text-pine prose-h3:mt-8 prose-li:my-2 prose-a:text-sun prose-a:font-semibold hover:prose-a:text-sun-light">
          
          <p className="lead text-lg text-ink-soft">
            Disfrutar de unas vacaciones seguras y sin sobresaltos requiere mantener la precaución, especialmente en zonas de gran afluencia turística. Aquí tienes las recomendaciones clave de seguridad para tu estancia.
          </p>

          <h2>Cuidado con los objetos personales</h2>
          <p>
            Las zonas costeras y concurridas suelen atraer a personas que buscan aprovechar un descuido. Sigue estas reglas básicas:
          </p>
          <ul>
            <li><strong>Terrazas y playas:</strong> No dejes el móvil, la cartera o las llaves a la vista en las mesas de las terrazas ni descuidados sobre la arena de la playa cuando te des un baño.</li>
            <li><strong>Vigilancia en el coche:</strong> No dejes objetos de valor (bolsos, ordenadores, maletas o dispositivos electrónicos) a la vista en el interior del vehículo cuando lo estaciones cerca de calas o en zonas de litoral. Guárdalos siempre en el maletero antes de llegar a tu destino.</li>
            <li><strong>Atención a carteristas:</strong> En mercadillos, paseos marítimos o zonas de gran afluencia, lleva el bolso cruzado o la mochila siempre cerrada y hacia delante en tu pecho.</li>
          </ul>

          <h2>Seguridad en el hogar y alojamiento</h2>
          <p>
            Al alojarte en una zona residencial, la tranquilidad es la norma, pero nunca está de más tomar precauciones estándar:
          </p>
          <ul>
            <li><strong>Puertas y ventanas:</strong> Asegúrate de cerrar bien con llave y comprobar las ventanas si te ausentas de casa, incluso por cortos periodos de tiempo o si solo bajas a la piscina.</li>
            <li><strong>Colaboración vecinal:</strong> Si observas personas con actitudes sospechosas merodeando por la urbanización o el portal, evita enfrentamientos y avisa de inmediato a las autoridades.</li>
          </ul>

          <h2>Teléfonos de emergencia</h2>
          <p>
            Ante cualquier incidencia, urgencia médica, accidente o situación de peligro, comunícate de inmediato con los servicios activos en la zona. Suelen contar con asistencia en varios idiomas.
          </p>
          
          <div className="my-8 rounded-xl bg-white p-6 shadow-sm border border-line">
            <ul className="m-0 list-none space-y-4 p-0">
              <li className="flex items-center gap-4 m-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 font-bold text-xl">
                  112
                </span>
                <div>
                  <strong>Emergencias Generales (Gratuito)</strong>
                  <p className="text-sm text-ink-soft m-0 mt-1">Asistencia sanitaria, bomberos o policía desde cualquier teléfono.</p>
                </div>
              </li>
              <li className="flex items-center gap-4 m-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine font-bold text-sm">
                  092
                </span>
                <div>
                  <strong>Policía Local de Orihuela</strong>
                  <p className="text-sm text-ink-soft m-0 mt-1">Para incidencias locales, ruidos, tráfico o robos menores.</p>
                </div>
              </li>
              <li className="flex items-center gap-4 m-0">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pine/10 text-pine font-bold text-sm">
                  062
                </span>
                <div>
                  <strong>Guardia Civil</strong>
                  <p className="text-sm text-ink-soft m-0 mt-1">Seguridad ciudadana y denuncias (El puesto principal está en Torre de la Horadada y Torrevieja).</p>
                </div>
              </li>
            </ul>
          </div>
          
          <p className="text-sm text-ink-soft">
            * Si necesitas información sobre la ubicación exacta del centro de seguridad y emergencias del Ayuntamiento de Orihuela o los horarios de atención de la Guardia Civil en la costa, consulta la web oficial del ayuntamiento o pregúntanos directamente para ayudarte.
          </p>
        </article>

        <VisitCounter pagePath="/guia-local/consejos-seguridad-orihuela-costa" />
      </main>
    </div>
  );
}
