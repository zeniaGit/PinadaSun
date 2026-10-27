import { APARTMENT } from "@/lib/apartment";

export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["VacationRental", "LodgingBusiness", "LocalBusiness"],
        "@id": "https://pinadasun.com/#lodging",
        identifier: "pinada-sun",
        name: APARTMENT.name,

        logo: "https://pinadasun.com/images/logopinadasun.webp",
        description:
          "Exclusivo apartamento en Orihuela Costa con terraza, barbacoa y piscina. 2 dormitorios a 5 min de Zenia Boulevard.",
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
          "https://pinadasun.com/images/cuadros-v2.webp",
          "https://pinadasun.com/images/lampara-v2.webp",
          "https://pinadasun.com/images/clima-v2.webp",
          "https://pinadasun.com/images/swimming-pool.jpg",
          "https://pinadasun.com/images/nosotros.jpeg",
          "https://pinadasun.com/images/logopinadasun.webp",
        ],
        containsPlace: {
          "@type": ["Accommodation", "Apartment"],
          "name": APARTMENT.name,
          "additionalType": "EntirePlace",
          "numberOfRooms": APARTMENT.bedrooms,
          "numberOfBedrooms": APARTMENT.bedrooms,
          "numberOfBathroomsTotal": APARTMENT.bathrooms,
          "bed": [
            {
              "@type": "BedDetails",
              "numberOfBeds": 1,
              "typeOfBed": "Queen"
            },
            {
              "@type": "BedDetails",
              "numberOfBeds": 2,
              "typeOfBed": "Single"
            }
          ],
          "amenityFeature": [
            {
              "@type": "LocationFeatureSpecification",
              "name": "Piscina comunitaria",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Gran terraza privada con pérgola y barbacoa",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Aire acondicionado frío/calor",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Wi-Fi de alta velocidad",
              "value": true
            },
            {
              "@type": "LocationFeatureSpecification",
              "name": "Cocina totalmente equipada",
              "value": true
            }
          ],
          "occupancy": {
            "@type": "QuantitativeValue",
            "value": APARTMENT.maxGuests,
            "minValue": 1,
            "maxValue": APARTMENT.maxGuests
          }
        },
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
        sameAs: [
          "https://g.page/r/CX3tNGuZfWsbEBM/review",
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
