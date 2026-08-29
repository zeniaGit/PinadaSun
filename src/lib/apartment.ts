import { eachNight, nightsBetween } from "@/lib/dates";

export const APARTMENT = {
  name: "Pinada Sun",
  tagline: "Vivienda de Alta Gama · Gran Terraza Privada, Piscina & Barbacoa",
  subtitle: "Vivienda vacacional de alta gama en Villamartín, Orihuela Costa",
  domain: "pinadasun.com",
  city: "Orihuela Costa, Alicante",
  neighborhood: "Villamartin",
  address: "Calle Galápagos 3, 03189 Orihuela Costa, Alicante, España",
  email: "contact@pinadasun.com",
  phone: "+34 678 180 180",
  whatsapp: "+34 678 180 180",
  whatsappUrl: "https://wa.me/34678180180?text=Hola%2C%20quisiera%20informaci%C3%B3n%20y%20disponibilidad%20sobre%20Pinada%20Sun",
  ibl: "Exento (alquiler de temporada - C. Valenciana)",
  surface: 75,
  bedrooms: 2,
  maxGuests: 4,
  beds: 4,
  bathrooms: 1,
  floor: 0,
  pricePerNight: 79,
  cleaningFee: 80,
  minNights: 11,
  checkIn: "15:00",
  checkOut: "12:00",
  checkInTime: "15:00",
  checkOutTime: "12:00",
  lat: 37.942867,
  lng: -0.770276,
  googleMapsUrl: "https://maps.app.goo.gl/FZQWPfZ2VHLoDP2u5",
  rating: 5.0,
  reviewCount: 18,
  registration: "Exento (alquiler de temporada - C. Valenciana)",
} as const;

export function nightlyRate(dateISO: string, guests: number = 2): number {
  const month = Number(dateISO.slice(5, 7));
  const extraGuests = Math.max(0, Math.min(2, guests - 2));
  const supplement = extraGuests * 10;

  // Julio y Agosto: Temporada Alta (119 € base para 2 personas + 10 €/persona adicional hasta 4)
  if (month === 7 || month === 8) return 119 + supplement;

  // Abril, Mayo, Junio, Septiembre y Diciembre: Temporada Media (99 € base para 2 personas + 10 €/persona adicional hasta 4)
  if (month === 4 || month === 5 || month === 6 || month === 9 || month === 12) return 99 + supplement;

  // Temporada Baja (Enero a Marzo, Octubre y Noviembre): 79 € base para 2 personas + 10 €/persona adicional
  return 79 + supplement;
}

export function quoteStay(checkIn: string, checkOut: string, guests: number = 2) {
  const nights = nightsBetween(checkIn, checkOut);
  const nightList = eachNight(checkIn, checkOut);
  const lodging = nightList.reduce(
    (sum: number, night: string) => sum + nightlyRate(night, guests),
    0,
  );
  const cleaning = APARTMENT.cleaningFee;
  return {
    nights,
    lodging,
    cleaning,
    total: lodging + cleaning,
    average: nights > 0 ? Math.round(lodging / nights) : 0,
  };
}

export const IMAGES = {
  hero: "/images/terrace-hero.webp",
  spaceA:
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/2403dbbc-4dda-4d98-82ed-058223edcb78.jpeg?im_w=1200",
  spaceB:
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/a4f4a5ce-fc70-4aa1-b0c2-2b6fbf5f5dfc.png?im_w=1200",
  river:
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/e29271f2-d8ff-4f26-b690-beadb8f9b8f6.jpeg?im_w=1200",
  cathedral:
    "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/8527e351-6a31-42bc-9efb-d5fde92b72eb.jpeg?im_w=1200",
  beach: "/images/playa-v2.webp",
  decor: "/images/cuadros-v2.webp",
  lighting: "/images/lampara-v2.webp",
  clima: "/images/clima-v2.webp",
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  room?: string;
  objectPosition?: string;
};

export const GALLERY: GalleryItem[] = [
  {
    src: "/images/terrace-hero.webp",
    alt: "Gran terraza privada con porche cubierto, comedor exterior y barbacoa en Pinada Sun Villamartín Orihuela Costa",
    caption: "Terraza privada y porche exterior",
    room: "Exterior",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/2403dbbc-4dda-4d98-82ed-058223edcb78.jpeg?im_w=1200",
    alt: "Salón comedor luminoso y moderno con sofá confortable, Smart TV y aire acondicionado en Pinada Sun",
    caption: "Salón y comedor de diseño",
    room: "Salón",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/a4f4a5ce-fc70-4aa1-b0c2-2b6fbf5f5dfc.png?im_w=1200",
    alt: "Dormitorio principal con cama matrimonial de alta gama y colchón viscoelástico en Villamartín",
    caption: "Dormitorio principal con cama matrimonial",
    room: "Dormitorios",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/a78bcab7-e184-49f6-a508-d3a9bec5ef58.jpeg?im_w=1200",
    alt: "Segundo dormitorio con dos camas individuales confortables y armarios empotrados en Orihuela Costa",
    caption: "Segundo dormitorio con camas confort",
    room: "Dormitorios",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/e29271f2-d8ff-4f26-b690-beadb8f9b8f6.jpeg?im_w=1200",
    alt: "Piscina comunitaria rodeada de jardines mediterráneos en urbanización tranquila de Villamartín",
    caption: "Piscina comunitaria y jardines",
    room: "Zonas comunes",
  },
  {
    src: "/images/playa-v2.webp",
    alt: "Calas y playas de Bandera Azul en Orihuela Costa (La Zenia, Cala Capitán) a 10 minutos",
    caption: "Calas y playas de Orihuela Costa",
    room: "Entorno",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/8527e351-6a31-42bc-9efb-d5fde92b72eb.jpeg?im_w=1200",
    alt: "Solárium y terraza exterior privada con orientación soleada todo el año en Alicante",
    caption: "Solarium y terraza exterior",
    room: "Exterior",
  },
];

export const DETAIL_PHOTOS: GalleryItem[] = [
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/49b8d797-70b4-4be0-bffb-c74708b62adc.jpeg?im_w=1200",
    alt: "Cocina independiente totalmente equipada con horno, inducción y lavavajillas en Pinada Sun",
    caption: "Cocina independiente",
    room: "Cocina",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/7c32afda-7e20-41da-93a2-21e52386d65b.jpeg?im_w=1200",
    alt: "Baño moderno con plato de ducha extra amplio de 150 cm y toallas de alta calidad",
    caption: "Ducha XL de 150 cm",
    room: "Baño",
  },
  {
    src: "/images/lampara-v2.webp",
    alt: "Detalles de iluminación cálida y ambiente acogedor en dormitorios de Pinada Sun",
    caption: "Iluminación cálida",
    room: "Dormitorios",
  },
  {
    src: "/images/clima-v2.webp",
    alt: "Sistema de climatización frío calor silencioso para máximo confort en vacaciones",
    caption: "Climatización integral",
    room: "Confort",
  },
  {
    src: "/images/cuadros-v2.webp",
    alt: "Decoración cuidada y diseño contemporáneo mediterráneo en Pinada Sun Orihuela Costa",
    caption: "Diseño & confort interior",
    room: "Salón",
  },
];

export const PHOTOS = GALLERY;

export type Amenity = { icon: string; title: string; desc: string };

export const AMENITIES: Amenity[] = [
  {
    icon: "terrace",
    title: "Gran terraza privada",
    desc: "Porche cubierto, comedor al aire libre y barbacoa de exterior.",
  },
  {
    icon: "pool",
    title: "Piscina & Jardines",
    desc: "Piscina comunitaria cuidada y amplias zonas verdes de descanso.",
  },
  {
    icon: "bed",
    title: "2 Dormitorios Confort",
    desc: "1 cama de matrimonio + 2 individuales (90 cm) con colchones de alta densidad.",
  },
  {
    icon: "bath",
    title: "Baño con Ducha XL",
    desc: "Plato de ducha amplio de 150 cm, toallas de gramaje superior y secador.",
  },
  {
    icon: "pot",
    title: "Cocina Independiente completamente equipada",
    desc: "Placa inducción, horno, lavavajillas, lavadora, microondas y cafetera.",
  },
  {
    icon: "snow",
    title: "Climatización Inverter",
    desc: "Aire acondicionado frío/calor de bajo ruido y ventiladores de techo.",
  },
  {
    icon: "wifi",
    title: "Fibra Óptica 1 Gbps",
    desc: "Conexión de máxima velocidad, Smart TV y canales internacionales.",
  },
  {
    icon: "car",
    title: "Aparcamiento Gratuito",
    desc: "Estacionamiento cómodo y sin coste en el acceso directo a la vivienda.",
  },
];

export type Guarantee = { icon: string; title: string; desc: string };

export const GUARANTEES: Guarantee[] = [
  {
    icon: "shield",
    title: "Reserva Directa Garantizada",
    desc: "Sin comisiones de intermediarios. Mejor precio oficial y confirmación directa con los anfitriones.",
  },
  {
    icon: "sparkles",
    title: "Calidad y Limpieza Certificada",
    desc: "Protocolo exhaustivo de higienización y preparación con ropa de cama y toallas de estándar hotelero.",
  },
  {
    icon: "award",
    title: "Confort y Acabados de Alta Gama",
    desc: "Vivienda completamente renovada, mobiliario seleccionado, electrodomésticos eficientes y climatización integral.",
  },
  {
    icon: "key",
    title: "Atención Exclusiva & Check-in",
    desc: "Recepción impecable y soporte continuo durante tu estancia para que tu única ocupación sea disfrutar.",
  },
];

export type Place = {
  name: string;
  distance: string;
  time: string;
  desc: string;
};

export const PLACES: Place[] = [
  {
    name: "CC Zenia Boulevard",
    distance: "2,8 km",
    time: "5 min en coche",
    desc: "El mayor centro comercial al aire libre de Alicante con más de 150 tiendas y gastronomía",
  },
  {
    name: "Playas de Orihuela Costa",
    distance: "4,5 km",
    time: "8-10 min en coche",
    desc: "Cala Capitán, Playa Flamenca y La Zenia con distintivo Bandera Azul y aguas cristalinas",
  },
  {
    name: "Campos de Golf Internacionales",
    distance: "1,2 km",
    time: "2-3 min",
    desc: "Ubicación privilegiada junto a Villamartín Golf, Las Ramblas y Campoamor Golf",
  },
  {
    name: "Villamartín Plaza",
    distance: "1,5 km",
    time: "3 min",
    desc: "Exclusivo enclave gastronómico y de ocio con ambiente cosmopolita y restaurantes",
  },
  {
    name: "Supermercados & Servicios",
    distance: "1,0 km",
    time: "2 min",
    desc: "Mercadona, Aldi, centros médicos y farmacias a escasos minutos",
  },
  {
    name: "Aeropuertos Alicante y Murcia",
    distance: "54 km / 49 km",
    time: "40-45 min",
    desc: "Conexión directa y rápida por autovía con Alicante-Elche (ALC) y Corvera (RMU)",
  },
];

export type Review = {
  quote: string;
  author: string;
  from: string;
  rating?: number;
};

export const REVIEWS: Review[] = [
  {
    quote:
      "Una estancia de diez. El apartamento transmite calidad desde que entras: la terraza privada con barbacoa es sensacional y la piscina una gozada. La ubicación junto a los campos de golf y Zenia Boulevard es perfecta.",
    author: "Carlos & Sophie",
    from: "Bruselas · Estancia de 2 semanas",
    rating: 5,
  },
  {
    quote:
      "Reformado con un gusto exquisito y materiales de gran calidad. El plato de ducha de 150 cm, la cocina y los colchones son de nivel superior. La atención de los anfitriones fue impecable y de total confianza.",
    author: "David M.",
    from: "Madrid · Huésped verificado",
    rating: 5,
  },
  {
    quote:
      "Fantástica experiencia en Pinada Sun. Muy cerca de las mejores calas de Orihuela Costa y de La Zenia. Urbanización tranquila, sol todo el día y una terraza que invita a no salir de casa.",
    author: "Elin & Lars",
    from: "Gotemburgo · Huéspedes verificados",
    rating: 5,
  },
];

export const AMENITIES_EN: Amenity[] = [
  {
    icon: "terrace",
    title: "Large Private Terrace",
    desc: "Covered porch, alfresco dining area, and private outdoor barbecue.",
  },
  {
    icon: "pool",
    title: "Swimming Pool & Gardens",
    desc: "Well-maintained community pool and spacious landscaped relaxation lawns.",
  },
  {
    icon: "bed",
    title: "2 Comfort Bedrooms",
    desc: "1 queen bed + 2 twin beds (90 cm) with high-density memory foam mattresses.",
  },
  {
    icon: "bath",
    title: "Bathroom with XL Shower",
    desc: "Spacious 150 cm walk-in shower, premium cotton towels, and hairdryer.",
  },
  {
    icon: "pot",
    title: "Fully-Equipped Kitchen",
    desc: "Induction cooktop, oven, dishwasher, washing machine, microwave & coffee maker.",
  },
  {
    icon: "snow",
    title: "Inverter Air Conditioning",
    desc: "Whisper-quiet cooling & heating throughout the home plus ceiling fans.",
  },
  {
    icon: "wifi",
    title: "1 Gbps Optical Fiber",
    desc: "Ultra-fast connection, Smart TV with international streaming channels.",
  },
  {
    icon: "car",
    title: "Free On-Site Parking",
    desc: "Easy, convenient, and free parking right at the apartment entrance.",
  },
];

export const GUARANTEES_EN: Guarantee[] = [
  {
    icon: "shield",
    title: "Guaranteed Direct Booking",
    desc: "Zero intermediary fees. Best official rate and direct personal confirmation with hosts.",
  },
  {
    icon: "sparkles",
    title: "Certified Hygiene & Cleanliness",
    desc: "Rigorous cleaning protocol with hotel-grade linens and sanitized amenities.",
  },
  {
    icon: "award",
    title: "High-End Quality & Comfort",
    desc: "Completely renovated home, curated modern furniture, and high-efficiency appliances.",
  },
  {
    icon: "key",
    title: "Personalized Host Support",
    desc: "Seamless check-in and continuous local assistance throughout your holiday.",
  },
];

export const PLACES_EN: Place[] = [
  {
    name: "Zenia Boulevard Shopping Mall",
    distance: "2.8 km",
    time: "5 min drive",
    desc: "Alicante's largest open-air shopping resort with 150+ stores, dining & entertainment",
  },
  {
    name: "Orihuela Costa Beaches",
    distance: "4.5 km",
    time: "8-10 min drive",
    desc: "Blue Flag beaches & golden sand coves: Cala Capitán, Playa Flamenca & La Zenia",
  },
  {
    name: "Championship Golf Courses",
    distance: "1.2 km",
    time: "2-3 min",
    desc: "Prime location minutes from Villamartín Golf Club, Las Ramblas, and Campoamor",
  },
  {
    name: "Villamartín Plaza",
    distance: "1.5 km",
    time: "3 min",
    desc: "Vibrant dining & entertainment plaza with international cuisine and live music",
  },
  {
    name: "Supermarkets & Amenities",
    distance: "1.0 km",
    time: "2 min",
    desc: "Mercadona, Aldi, local pharmacies, and medical centers just down the road",
  },
  {
    name: "Alicante & Murcia Airports",
    distance: "54 km / 49 km",
    time: "40-45 min",
    desc: "Fast and easy motorway connection to Alicante-Elche (ALC) and Murcia-Corvera (RMU)",
  },
];

export const REVIEWS_EN: Review[] = [
  {
    quote:
      "A flawless 10/10 stay. The apartment radiates quality from the moment you step inside: the private terrace with BBQ is fantastic, and the pool was lovely. Perfect location next to golf courses and Zenia Boulevard.",
    author: "Carlos & Sophie",
    from: "Brussels · 2-Week Holiday",
    rating: 5,
  },
  {
    quote:
      "Refurbished with exquisite taste and premium materials. The 150 cm walk-in shower, kitchen, and mattresses are top-tier. The hosts' communication was prompt, welcoming, and completely trustworthy.",
    author: "David M.",
    from: "Madrid · Verified Guest",
    rating: 5,
  },
  {
    quote:
      "A wonderful experience at Pinada Sun. Very close to the best coves in Orihuela Costa and La Zenia. Quiet neighborhood, sunshine all day, and a terrace you never want to leave.",
    author: "Elin & Lars",
    from: "Gothenburg · Verified Guests",
    rating: 5,
  },
];

export const GALLERY_EN: GalleryItem[] = [
  {
    src: "/images/terrace-hero.webp",
    alt: "Large private terrace with covered porch, outdoor dining and BBQ at Pinada Sun",
    caption: "Private terrace & outdoor porch",
    room: "Outdoor",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/2403dbbc-4dda-4d98-82ed-058223edcb78.jpeg?im_w=1200",
    alt: "Bright and stylish living room with air conditioning and dining area",
    caption: "Designer living & dining space",
    room: "Living Room",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/a4f4a5ce-fc70-4aa1-b0c2-2b6fbf5f5dfc.png?im_w=1200",
    alt: "Master bedroom with high-comfort queen-size bed",
    caption: "Master bedroom with queen bed",
    room: "Bedrooms",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/a78bcab7-e184-49f6-a508-d3a9bec5ef58.jpeg?im_w=1200",
    alt: "Second bedroom with two comfortable twin beds and built-in wardrobes",
    caption: "Second bedroom with twin beds",
    room: "Bedrooms",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/e29271f2-d8ff-4f26-b690-beadb8f9b8f6.jpeg?im_w=1200",
    alt: "Community swimming pool and landscaped gardens in quiet residential complex",
    caption: "Community pool & gardens",
    room: "Amenities",
  },
  {
    src: "/images/playa-v2.webp",
    alt: "Crystal clear water coves and Blue Flag beaches in Orihuela Costa minutes away",
    caption: "Orihuela Costa beaches & coves",
    room: "Surroundings",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/8527e351-6a31-42bc-9efb-d5fde92b72eb.jpeg?im_w=1200",
    alt: "Sunny private terrace with optimal year-round orientation",
    caption: "Solarium & sun terrace",
    room: "Outdoor",
  },
];

export const DETAIL_PHOTOS_EN: GalleryItem[] = [
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/49b8d797-70b4-4be0-bffb-c74708b62adc.jpeg?im_w=1200",
    alt: "Independent kitchen fully equipped with quality appliances",
    caption: "Independent kitchen",
    room: "Kitchen",
  },
  {
    src: "https://a0.muscache.com/im/pictures/hosting/Hosting-1729850238063591911/original/7c32afda-7e20-41da-93a2-21e52386d65b.jpeg?im_w=1200",
    alt: "Full bathroom with extra-large 150 cm walk-in shower",
    caption: "150 cm XL walk-in shower",
    room: "Bathroom",
  },
  {
    src: "/images/lampara-v2.webp",
    alt: "Warm ambient lighting for ultimate rest and relaxation",
    caption: "Warm ambient lighting",
    room: "Bedrooms",
  },
  {
    src: "/images/clima-v2.webp",
    alt: "Integrated climate control system for year-round comfort",
    caption: "Full climate control",
    room: "Comfort",
  },
  {
    src: "/images/cuadros-v2.webp",
    alt: "Contemporary Mediterranean art and design interior accents",
    caption: "Interior design & comfort",
    room: "Living Room",
  },
];

export const MARQUEE_ITEMS = [
  "Pinada Sun",
  "pinadasun.com",
  "Orihuela Costa · Alicante",
  "75 m² · 2 dormitorios",
  "Gran terraza privada con barbacoa",
  "Piscina comunitaria",
  "Calidades de alta gama",
  "Reserva directa sin comisiones",
  "A 5 min de Zenia Boulevard",
  "Junto a campos de golf y calas",
];

export const MARQUEE_ITEMS_EN = [
  "Pinada Sun",
  "pinadasun.com",
  "Orihuela Costa · Alicante",
  "75 m² · 2 Bedrooms",
  "Large Private Terrace with BBQ",
  "Community Swimming Pool",
  "High-End Luxury Quality",
  "Direct Booking with 0% Fees",
  "5 min to Zenia Boulevard",
  "Next to Golf Courses & Coves",
];

export const HOUSE_RULES = [
  "Llegada flexible desde las 15:00. Salida antes de las 12:00.",
  "Capacidad máxima: 4 huéspedes.",
  "Estancia mínima: 11 noches.",
  "Prohibido fumar en el interior de la vivienda (permitido en terraza exterior).",
  "No se admiten mascotas.",
  "No se permiten fiestas ni eventos. Respetar el descanso vecinal de la urbanización.",
] as const;

export const RATES = [
  { season: "Baja (Ene — Mar, Oct — Nov)", months: "ene — mar, oct — nov", price: 79, desc: "2 personas (+10 €/persona extra/noche)" },
  { season: "Media (Abr — Jun, Sep, Dic)", months: "abr — jun, sep, dic", price: 99, desc: "2 personas (+10 €/persona extra/noche hasta 4 personas)" },
  { season: "Alta (Julio y Agosto)", months: "jul — ago", price: 119, desc: "2 personas (+10 €/persona extra/noche hasta 4 personas)" },
] as const;
