import { APARTMENT, REVIEWS } from "@/lib/apartment";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["VacationRental", "LodgingBusiness", "LocalBusiness"],
        "@id": "https://pinadasun.com/#lodging",
        name: APARTMENT.name,
        logo: "https://pinadasun.com/images/logopinadasun.webp",
        description:
          "Vivienda vacacional de alta gama con gran terraza privada, piscina comunitaria y barbacoa en Villamartín, Orihuela Costa. 2 dormitorios, confort premium y a 5 min de Zenia Boulevard.",
        url: "https://pinadasun.com",
        telephone: APARTMENT.phone,
        email: APARTMENT.email,
        priceRange: "79€ - 139€",
        currenciesAccepted: "EUR",
        paymentAccepted: "Credit Card, PayPal, Bank Transfer",
        checkinTime: APARTMENT.checkIn,
        checkoutTime: APARTMENT.checkOut,
        numberOfRooms: APARTMENT.bedrooms,
        petsAllowed: false,
        smokingAllowed: false,
        image: [
          "https://pinadasun.com/images/terrace-hero.webp",
          "https://pinadasun.com/images/playa-v2.webp",
        ],
        address: {
          "@type": "PostalAddress",
          streetAddress: "Calle Galápagos 3",
          addressLocality: "Orihuela Costa",
          addressRegion: "Alicante",
          postalCode: "03189",
          addressCountry: "ES",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: APARTMENT.lat,
          longitude: APARTMENT.lng,
        },
        hasMap: APARTMENT.googleMapsUrl,
        occupancy: {
          "@type": "QuantitativeValue",
          minValue: 1,
          maxValue: APARTMENT.maxGuests,
        },
        amenityFeature: [
          {
            "@type": "LocationFeatureSpecification",
            name: "Piscina comunitaria",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Gran terraza privada con pérgola y barbacoa",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Aire acondicionado frío/calor",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Wi-Fi de alta velocidad",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Cocina totalmente equipada",
            value: true,
          },
          {
            "@type": "LocationFeatureSpecification",
            name: "Aparcamiento fácil en la zona",
            value: true,
          },
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: APARTMENT.rating.toString(),
          bestRating: "5",
          worstRating: "1",
          ratingCount: APARTMENT.reviewCount.toString(),
        },
        review: REVIEWS.map((rev) => ({
          "@type": "Review",
          author: {
            "@type": "Person",
            name: rev.author,
          },
          reviewRating: {
            "@type": "Rating",
            ratingValue: (rev.rating || 5).toString(),
            bestRating: "5",
          },
          reviewBody: rev.quote,
        })),
        sameAs: [
          "https://g.page/r/CX3tNGuZfWsbEBM/review",
        ],
      },
      {
        "@type": "FAQPage",
        "@id": "https://pinadasun.com/#faq",
        mainEntity: [
          {
            "@type": "Question",
            name: "¿Cuál es el horario de check-in y check-out en Pinada Sun?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `El check-in se realiza a partir de las ${APARTMENT.checkIn} y el check-out hasta las ${APARTMENT.checkOut}.`,
            },
          },
          {
            "@type": "Question",
            name: "¿Cuántos huéspedes pueden alojarse?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `La capacidad máxima es de ${APARTMENT.maxGuests} huéspedes en ${APARTMENT.bedrooms} dormitorios con ${APARTMENT.beds} camas.`,
            },
          },
          {
            "@type": "Question",
            name: "¿Cuál es la estancia mínima en Pinada Sun?",
            acceptedAnswer: {
              "@type": "Answer",
              text: `La estancia mínima es de ${APARTMENT.minNights} noches para garantizar una experiencia de descanso óptima.`,
            },
          },
          {
            "@type": "Question",
            name: "¿Dispone de terraza privada y barbacoa?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Sí, la vivienda dispone de una amplia terraza privada con zona de porche, comedor exterior, barbacoa y acceso a la piscina comunitaria.",
            },
          },
          {
            "@type": "Question",
            name: "¿A qué distancia se encuentra de Zenia Boulevard y las playas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Se encuentra a solo 5 minutos en coche del centro comercial Zenia Boulevard y a 10 minutos de las playas y calas con Bandera Azul de Orihuela Costa (La Zenia, Cala Capitán, Playa Flamenca).",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
