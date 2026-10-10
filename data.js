// Default Initial Data for Karimnagar Durga Idol Finder
const DEFAULT_SITE_CONFIG = {
  header: {
    siteName: "Karimnagar Durga Idol Finder",
    siteLocation: "Karimnagar",
    tagline: "Find • Visit • Celebrate",
    logoImage: "assets/images/logo.jpg",
    contactEmail: "contact@karimnagardurgafinder.com"
  },
  hero: {
    chantTelugu: "॥ ఓం శ్రీ దుర్గాయై నమః ॥",
    mainTitle: "Karimnagar Durga",
    titleHighlight: "Idol Finder",
    subtitle: "Find • Visit • Celebrate",
    description: "Find all sacred Durga Devi pandals, Navratri mandapams, and Bathukamma celebrations across Karimnagar. Explore divine idol themes, view photos, get GPS directions and celebrate Navratri with bliss.",
    bannerBadgeText: "॥ జై దుర్గా భవానీ • Jai Mata Di ॥",
    floatingCardTitle: "Karimnagar Navratri Utsav",
    floatingCardSubtitle: "One Divine City, Infinite Blessings",
    heroImage: "assets/images/hero-durga.jpg"
  },
  stats: {
    locationsCount: 95,
    themesCount: 84,
    photosCount: 280,
    locationLabel: "Karimnagar",
    homeSublabel: "Our Sacred City",
    quoteTelugu: "“సకల శుభ ప్రదాయినీ శ్రీ దుర్గాదేవి”",
    quoteSub: "॥ శ్రీ మాత్రే నమః ॥"
  },
  mapSection: {
    eyebrow: "Interactive Navratri Map",
    title: "Durga Pandals & Mandapams",
    titleHighlight: "in Karimnagar",
    description: "Find every verified Durga Mata pandal and Navratri mandapam across Karimnagar. View live photos, special alankarams, and get turn-by-turn GPS driving directions directly in Google Maps.",
    defaultCenter: [18.4386, 79.1288], // Karimnagar City Center
    defaultZoom: 14
  },
  mustVisitSection: {
    eyebrow: "Must Visit",
    title: "Must Visit Durga Pandals",
    description: "The top priority Durga mandapams and magnificent pandals you shouldn't miss this Navratri festival season across Karimnagar.",
    badgeText: "Priority Pandals"
  },
  uniqueSection: {
    eyebrow: "Special Alankarams",
    title: "Unique Durga Idols & Themes",
    description: "Explore creatively themed Navadurga avatars, golden & silver alankarams, eco-friendly idols, and creative themes across Karimnagar."
  },
  gallerySection: {
    eyebrow: "Navratri Gallery",
    title: "Moments from Across Karimnagar",
    description: "Photos from various Durga pandals, Bathukamma celebrations, Maha Aartis, and Dandiya nights."
  },
  areasSection: {
    eyebrow: "Areas",
    title: "Browse by Area in Karimnagar",
    description: "Jump straight to any Karimnagar colony or neighbourhood to explore nearby pandals."
  },
  ctaSection: {
    title: "Be a Part of the Navratri Celebration",
    description: "Know a Durga Mata pandal or Navratri mandapam that's not listed? Help us add it. Every submission with 2+ photos is reviewed and approved before it appears on the live map.",
    quoteText: "“May Goddess Durga bring peace, health, and prosperity to every home in Karimnagar” 🔱",
    namasteImage: "assets/images/logo.jpg"
  },
  footer: {
    developerNames: "@chintuvarun_3008",
    developerInstagram: "https://instagram.com/chintuvarun_3008",
    copyrightText: "Karimnagar Durga Idol Finder © 2026 | Celebrate Culture | Support Local | Keep Karimnagar Beautiful",
    version: "v4.0.0"
  }
};

const DEFAULT_MANDAPAMS = [
  {
    id: "kd-1",
    slug: "tower-circle-sri-kanaka-durga",
    name: "Tower Circle Sri Kanaka Durga Devi Mandapam",
    teluguName: "టవర్ సర్కిల్ శ్రీ కనకదుర్గా దేవి మండపం",
    area: "Tower Circle",
    address: "Near Historic Clock Tower, Tower Circle Road, Karimnagar",
    latitude: 18.4386,
    longitude: 79.1288,
    description: "Grand central Tower Circle Durga Pandal featuring magnificent golden Kanaka Durga alankaram, dazzling serial lighting, and 24/7 devotional darshan.",
    priority: 1,
    isVerified: true,
    isMustVisit: true,
    categories: ["unique", "famous", "traditional"],
    photos: [
      { url: "assets/images/hero-durga.jpg", caption: "Sri Kanaka Durga Devi Main Alankaram", isPublished: true },
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Tower Circle Night Illumination", isPublished: true },
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Maha Deeparadhana Darshan", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "https://www.instagram.com/karimnagar_durga_official",
    instagramHandle: "@karimnagar_durga_official",
    reelsCount: 6,
    reels: [
      { url: "https://www.instagram.com/reel/durga1", caption: "Maha Aarti & Kumkumarchana" }
    ],
    views: 3840
  },
  {
    id: "kd-2",
    slug: "mukarampura-mahishasura-mardhini",
    name: "Mukarampura Sri Mahishasura Mardhini Utsav Samithi",
    teluguName: "ముకరంపుర శ్రీ మహిషాసుర మర్దిని ఉత్సవ సమితి",
    area: "Mukarampura",
    address: "Main Road, Opp. Venkateshwara Temple, Mukarampura, Karimnagar",
    latitude: 18.4412,
    longitude: 79.1325,
    description: "Fierce and magnificent 16-feet Mahishasura Mardhini idol with lion vahana. Renowned for daily Chandi Homam and grand evening Dandiya celebrations.",
    priority: 2,
    isVerified: true,
    isMustVisit: true,
    categories: ["unique", "famous"],
    photos: [
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Mahishasura Mardhini Main Darshan", isPublished: true },
      { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80", caption: "Grand Evening Pandal View", isPublished: true },
      { url: "assets/images/hero-durga.jpg", caption: "Navaratri Special Pooja", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "https://www.instagram.com/mukarampura_durga",
    instagramHandle: "@mukarampura_durga",
    reelsCount: 4,
    reels: [],
    views: 2950
  },
  {
    id: "kd-3",
    slug: "mankammathota-raja-rajeshwari",
    name: "Mankammathota Sri Sri Raja Rajeshwari Devi Pandal",
    teluguName: "మంకమ్మతోట శ్రీ శ్రీ రాజరాజేశ్వరి దేవి మండపం",
    area: "Mankammathota",
    address: "Near Mankamma Temple, 4th Lane, Mankammathota, Karimnagar",
    latitude: 18.4345,
    longitude: 79.1240,
    description: "Sacred Nava Durga alankarams changing every day of Navratri. Decorated with natural flowers, temple gopuram setup, and special Bathukamma festivities.",
    priority: 3,
    isVerified: true,
    isMustVisit: true,
    categories: ["unique", "traditional", "famous"],
    photos: [
      { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", caption: "Raja Rajeshwari Alankaram", isPublished: true },
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Flower Gopuram Setup", isPublished: true },
      { url: "assets/images/hero-durga.jpg", caption: "Bathukamma Utsav View", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "https://www.instagram.com/mankammathota_youth",
    instagramHandle: "@mankammathota_youth",
    reelsCount: 3,
    reels: [],
    views: 2410
  },
  {
    id: "kd-4",
    slug: "collectorate-chowrasta-nava-durga",
    name: "Collectorate Chowrasta Sri Navadurga Mahotsavam",
    teluguName: "కలెక్టరేట్ చౌరస్తా శ్రీ నవదుర్గా మహోత్సవం",
    area: "Collectorate Chowrasta",
    address: "Collectorate Complex Junction, Karimnagar",
    latitude: 18.4468,
    longitude: 79.1221,
    description: "High-profile Navadurga display with 9 avatar depictions side-by-side. Vast darshan queue management and sacred prasadam distribution.",
    priority: 4,
    isVerified: true,
    isMustVisit: true,
    categories: ["famous", "unique"],
    photos: [
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Navadurga Darshan Pavilion", isPublished: true },
      { url: "assets/images/hero-durga.jpg", caption: "Navadurga Main Idol", isPublished: true },
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Grand Evening Aarti", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@collectorate_durga",
    reelsCount: 2,
    reels: [],
    views: 1980
  },
  {
    id: "kd-5",
    slug: "karkhanagadda-lalitha-tripura-sundari",
    name: "Karkhanagadda Sri Lalitha Tripura Sundari Mandapam",
    teluguName: "కార్ఖానాగడ్డ శ్రీ లలితా త్రిపుర సుందరి మండపం",
    area: "Karkhanagadda",
    address: "Old Bus Depot Road, Karkhanagadda, Karimnagar",
    latitude: 18.4420,
    longitude: 79.1365,
    description: "Mesmerizing Lalitha Tripura Sundari avatar adorned with gold ornaments, traditional Carnatic devotional music, and Suvasini Pooja.",
    priority: 5,
    isVerified: true,
    isMustVisit: true,
    categories: ["traditional", "unique"],
    photos: [
      { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80", caption: "Lalitha Devi Idol", isPublished: true },
      { url: "assets/images/hero-durga.jpg", caption: "Gold Alankaram Darshan", isPublished: true },
      { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", caption: "Suvasini Pooja Gathering", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@karkhanagadda_durga",
    reelsCount: 1,
    reels: [],
    views: 1720
  },
  {
    id: "kd-6",
    slug: "jyothi-nagar-sri-mahalakshmi-durga",
    name: "Jyothi Nagar Sri Mahalakshmi Durga Devi Pandal",
    teluguName: "జ్యోతి నగర్ శ్రీ మహాలక్ష్మి దుర్గాదేవి మండపం",
    area: "Jyothi Nagar",
    address: "Near Water Tank, Main Road, Jyothi Nagar, Karimnagar",
    latitude: 18.4485,
    longitude: 79.1410,
    description: "Golden Dhana Lakshmi and Durga avatar with eco-friendly natural clay idol, flower rangolis, and Bathukamma cultural programs.",
    priority: 6,
    isVerified: true,
    isMustVisit: false,
    categories: ["eco-friendly", "traditional"],
    photos: [
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Mahalakshmi Avatar", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@jyothinagar_durga",
    reelsCount: 2,
    reels: [],
    views: 1450
  },
  {
    id: "kd-7",
    slug: "sapthagiri-colony-annapoorna-devi",
    name: "Sapthagiri Colony Sri Annapoorna Devi Mandapam",
    teluguName: "సప్తగిరి కాలనీ శ్రీ అన్నపూర్ణా దేవి మండపం",
    area: "Sapthagiri Colony",
    address: "Park Street, Sapthagiri Colony, Karimnagar",
    latitude: 18.4312,
    longitude: 79.1180,
    description: "Divine Sri Annapoorna Devi alankaram surrounded by authentic Varanasi temple replica and daily Annadanam to thousands of devotees.",
    priority: 7,
    isVerified: true,
    isMustVisit: true,
    categories: ["unique", "famous"],
    photos: [
      { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", caption: "Annapoorna Devi Darshan", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@sapthagiri_durga",
    reelsCount: 3,
    reels: [],
    views: 1890
  },
  {
    id: "kd-8",
    slug: "vavilalapalli-saraswathi-durga",
    name: "Vavilalapalli Sri Saraswathi Durga Pandal",
    teluguName: "వావిలాలపల్లి శ్రీ సరస్వతీ దుర్గా మండపం",
    area: "Vavilalapalli",
    address: "Community Hall Grounds, Vavilalapalli, Karimnagar",
    latitude: 18.4280,
    longitude: 79.1350,
    description: "Pure white marble-finish Saraswathi Devi concept idol playing divine Veena, with Aksharabhyasam poojas for children.",
    priority: 8,
    isVerified: true,
    isMustVisit: false,
    categories: ["traditional", "eco-friendly"],
    photos: [
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Saraswathi Devi Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@vavilalapalli_durga",
    reelsCount: 1,
    reels: [],
    views: 1320
  },
  {
    id: "kd-9",
    slug: "geetha-bhavan-durga-bhavani",
    name: "Geetha Bhavan Sri Durga Bhavani Navratri Samithi",
    teluguName: "గీతా భవన్ శ్రీ దుర్గా భవానీ నవరాత్రి సమితి",
    area: "Geetha Bhavan",
    address: "Geetha Bhavan Circle, Jagtial Road, Karimnagar",
    latitude: 18.4450,
    longitude: 79.1290,
    description: "Iconic 14-feet Simhavahini Durga Bhavani with golden Trishul and LED light waterfall backdrop. Grand Dandiya Ras on Durgashtami.",
    priority: 9,
    isVerified: true,
    isMustVisit: true,
    categories: ["famous", "unique"],
    photos: [
      { url: "assets/images/hero-durga.jpg", caption: "Durga Bhavani Grand Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "https://www.instagram.com/geethabhavan_durga",
    instagramHandle: "@geethabhavan_durga",
    reelsCount: 5,
    reels: [],
    views: 2670
  },
  {
    id: "kd-10",
    slug: "court-road-simhavahini-durga",
    name: "Court Road Sri Simhavahini Durga Mandapam",
    teluguName: "కోర్టు రోడ్ శ్రీ సింహవాహిని దుర్గా మండపం",
    area: "Court Road",
    address: "Opp. District Court Complex, Court Road, Karimnagar",
    latitude: 18.4398,
    longitude: 79.1235,
    description: "Glorious Simhavahini Devi idol with brass lamps and Vedic chanting by renowned pandits. High devotional ambiance.",
    priority: 10,
    isVerified: true,
    isMustVisit: false,
    categories: ["traditional"],
    photos: [
      { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80", caption: "Simhavahini Darshan", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@courtroad_durga",
    reelsCount: 1,
    reels: [],
    views: 1210
  },
  {
    id: "kd-11",
    slug: "ramnagar-mahakali-durga",
    name: "Ramnagar Sri Mahakali Durga Samithi",
    teluguName: "రాంనగర్ శ్రీ మహాకాళీ దుర్గా సమితి",
    area: "Ramnagar",
    address: "Near Ramalayam, Ramnagar Main Road, Karimnagar",
    latitude: 18.4330,
    longitude: 79.1420,
    description: "Powerfully sculpted Ugra Mahakali avatar with authentic Bengal artisans setup and daily evening Dhaak drum beats.",
    priority: 11,
    isVerified: true,
    isMustVisit: true,
    categories: ["unique", "famous"],
    photos: [
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Mahakali Avatar Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@ramnagar_durga",
    reelsCount: 3,
    reels: [],
    views: 1650
  },
  {
    id: "kd-12",
    slug: "vidyanagar-gayatri-devi",
    name: "Vidyanagar Sri Gayatri Devi Mandapam",
    teluguName: "విద్యానగర్ శ్రీ గాయత్రీ దేవి మండపం",
    area: "Vidyanagar",
    address: "1st Cross Road, Vidyanagar, Karimnagar",
    latitude: 18.4410,
    longitude: 79.1450,
    description: "Five-faced Sri Gayatri Devi idol with divine radiance, flower jewelry and daily Sahasranama archana.",
    priority: 12,
    isVerified: true,
    isMustVisit: false,
    categories: ["traditional"],
    photos: [
      { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", caption: "Gayatri Devi Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@vidyanagar_durga",
    reelsCount: 1,
    reels: [],
    views: 1140
  },
  {
    id: "kd-13",
    slug: "kashmirgadda-bala-tripura-sundari",
    name: "Kashmirgadda Sri Bala Tripura Sundari Mandapam",
    teluguName: "కాశ్మీర్‌గడ్డ శ్రీ బాలా త్రిపుర సుందరి మండపం",
    area: "Kashmirgadda",
    address: "Near Water Reservoir, Kashmirgadda, Karimnagar",
    latitude: 18.4470,
    longitude: 79.1370,
    description: "Serene Bala Tripura Sundari alankaram decorated with silk sarees and pearls. Famous for youth Kumkuma poojas.",
    priority: 13,
    isVerified: true,
    isMustVisit: false,
    categories: ["traditional"],
    photos: [
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Bala Tripura Sundari", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@kashmirgadda_durga",
    reelsCount: 1,
    reels: [],
    views: 980
  },
  {
    id: "kd-14",
    slug: "kaman-chowrasta-chandi-devi",
    name: "Kaman Chowrasta Sri Chandi Devi Mandapam",
    teluguName: "కమాన్ చౌరస్తా శ్రీ చండీ దేవి మండపం",
    area: "Kaman Chowrasta",
    address: "Heritage Kaman Arch, Kaman Chowrasta, Karimnagar",
    latitude: 18.4360,
    longitude: 79.1305,
    description: "Historical Kaman arch setup with powerful 18-armed Chandi Devi idol, laser illumination, and grand Dasara procession.",
    priority: 14,
    isVerified: true,
    isMustVisit: true,
    categories: ["famous", "unique"],
    photos: [
      { url: "assets/images/hero-durga.jpg", caption: "Sri Chandi Devi Pandal", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@kamanchowrasta_durga",
    reelsCount: 4,
    reels: [],
    views: 2150
  },
  {
    id: "kd-15",
    slug: "housing-board-durga-mata",
    name: "Housing Board Colony Sri Durga Mata Pandal",
    teluguName: "హౌసింగ్ బోర్డ్ కాలనీ శ్రీ దుర్గా మాత మండపం",
    area: "Housing Board Colony",
    address: "Central Park Grounds, Housing Board Colony, Karimnagar",
    latitude: 18.4250,
    longitude: 79.1200,
    description: "Vibrant community celebration featuring evening Garba, musical bhajans, and eco-friendly clay idol immersion.",
    priority: 15,
    isVerified: true,
    isMustVisit: false,
    categories: ["eco-friendly"],
    photos: [
      { url: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=800&q=80", caption: "Housing Board Durga Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@housingboard_durga",
    reelsCount: 2,
    reels: [],
    views: 1340
  },
  {
    id: "kd-16",
    slug: "bhagyanagar-navratri-samithi",
    name: "Bhagyanagar Sri Durga Navratri Samithi",
    teluguName: "భాగ్యనగర్ శ్రీ దుర్గా నవరాత్రి సమితి",
    area: "Bhagyanagar",
    address: "Near Sai Baba Temple, Bhagyanagar, Karimnagar",
    latitude: 18.4435,
    longitude: 79.1150,
    description: "Grand golden Simhasanam with Mahadurga idol, daily Annadanam and cultural Kuchipudi dance performances.",
    priority: 16,
    isVerified: true,
    isMustVisit: false,
    categories: ["traditional", "famous"],
    photos: [
      { url: "https://images.unsplash.com/photo-1567591414240-e14188b71d99?auto=format&fit=crop&w=800&q=80", caption: "Bhagyanagar Idol View", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@bhagyanagar_durga",
    reelsCount: 1,
    reels: [],
    views: 1090
  },
  {
    id: "kd-17",
    slug: "rekurthi-durga-mandapam",
    name: "Rekurthi Sri Durga Parameshwari Mandapam",
    teluguName: "రేకుర్తి శ్రీ దుర్గా పరమేశ్వరి మండపం",
    area: "Rekurthi",
    address: "Near Rekurthi Flyover, Karimnagar",
    latitude: 18.4550,
    longitude: 79.1080,
    description: "Spectacular highway pandal with 20-feet illuminated arch and traditional Bathukamma festivities.",
    priority: 17,
    isVerified: true,
    isMustVisit: false,
    categories: ["unique"],
    photos: [
      { url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80", caption: "Rekurthi Durga Idol", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@rekurthi_durga",
    reelsCount: 1,
    reels: [],
    views: 890
  },
  {
    id: "kd-18",
    slug: "padmanagar-durga-utsav",
    name: "Padmanagar Sri Durga Utsav Committee",
    teluguName: "పద్మానగర్ శ్రీ దుర్గా ఉత్సవ కమిటీ",
    area: "Padmanagar",
    address: "Manair River Road, Padmanagar, Karimnagar",
    latitude: 18.4200,
    longitude: 79.1310,
    description: "Riverside scenic Durga pandal with special lotus theme decorations and evening Deepotsavam.",
    priority: 18,
    isVerified: true,
    isMustVisit: false,
    categories: ["unique", "eco-friendly"],
    photos: [
      { url: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?auto=format&fit=crop&w=800&q=80", caption: "Padmanagar Pandal", isPublished: true }
    ],
    videoUrl: "",
    instagramUrl: "",
    instagramHandle: "@padmanagar_durga",
    reelsCount: 2,
    reels: [],
    views: 1120
  }
];

const DEFAULT_AREAS = [
  "Tower Circle",
  "Mukarampura",
  "Mankammathota",
  "Collectorate Chowrasta",
  "Karkhanagadda",
  "Jyothi Nagar",
  "Sapthagiri Colony",
  "Vavilalapalli",
  "Geetha Bhavan",
  "Court Road",
  "Ramnagar",
  "Vidyanagar",
  "Kashmirgadda",
  "Kaman Chowrasta",
  "Housing Board Colony",
  "Bhagyanagar",
  "Rekurthi",
  "Padmanagar",
  "Chinthakunta",
  "Ganeshnagar",
  "Alugunoor",
  "Subhashnagar",
  "Kishan Nagar",
  "Gandhi Road"
];

// LocalStorage Manager Functions
const STORAGE_KEYS = {
  CONFIG: "karimnagar_durga_site_config_v1",
  MANDAPAMS: "karimnagar_durga_mandapams_v1",
  AREAS: "karimnagar_durga_areas_v1",
  AUTH: "karimnagar_durga_admin_auth",
  LIKES: "karimnagar_durga_photo_likes_v1"
};

function getSiteConfig() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading siteConfig from localStorage:", e);
  }
  return DEFAULT_SITE_CONFIG;
}

function saveSiteConfig(config) {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
}

function getMandapams() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.MANDAPAMS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading mandapams from localStorage:", e);
  }
  return DEFAULT_MANDAPAMS;
}

function saveMandapams(mandapams) {
  localStorage.setItem(STORAGE_KEYS.MANDAPAMS, JSON.stringify(mandapams));
}

function getAreasList() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.AREAS);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading areas from localStorage:", e);
  }
  return DEFAULT_AREAS;
}

function saveAreasList(areas) {
  localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(areas));
}

// Photo Likes Manager
function getPhotoLikesMap() {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.LIKES);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    console.error("Error reading photo likes:", e);
  }
  return {};
}

function savePhotoLikesMap(likesMap) {
  localStorage.setItem(STORAGE_KEYS.LIKES, JSON.stringify(likesMap));
}

function isPhotoLiked(photoKey) {
  const map = getPhotoLikesMap();
  return !!(map[photoKey] && map[photoKey].liked);
}

function getPhotoLikeCount(photoKey, defaultLikes = 12) {
  const map = getPhotoLikesMap();
  if (map[photoKey] && typeof map[photoKey].count === 'number') {
    return map[photoKey].count;
  }
  return defaultLikes;
}

function togglePhotoLike(photoKey, defaultLikes = 12) {
  const map = getPhotoLikesMap();
  const current = map[photoKey] || { count: defaultLikes, liked: false };
  if (current.liked) {
    current.liked = false;
    current.count = Math.max(0, current.count - 1);
  } else {
    current.liked = true;
    current.count += 1;
  }
  map[photoKey] = current;
  savePhotoLikesMap(map);
  return current;
}

// Direct Image Downloader (works with Data URL, relative paths & remote URLs)
function triggerPhotoDownload(imageUrl, fileName = "Karimnagar_Durga_Photo.jpg") {
  // If it's a data url or local path, trigger direct anchor download
  if (imageUrl.startsWith("data:") || imageUrl.startsWith("assets/") || imageUrl.startsWith("./")) {
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return;
  }

  // If it's a remote URL, fetch as blob to force browser download prompt
  fetch(imageUrl)
    .then(res => res.blob())
    .then(blob => {
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 2000);
    })
    .catch(err => {
      console.warn("Direct blob fetch failed, falling back to window open:", err);
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

function resetAllDataToDefault() {
  localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(DEFAULT_SITE_CONFIG));
  localStorage.setItem(STORAGE_KEYS.MANDAPAMS, JSON.stringify(DEFAULT_MANDAPAMS));
  localStorage.setItem(STORAGE_KEYS.AREAS, JSON.stringify(DEFAULT_AREAS));
  localStorage.removeItem(STORAGE_KEYS.LIKES);
}

// Client-side image compression to Base64 Data URL
function processImageFile(file, callback, maxWidth = 1200, quality = 0.85) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const img = new Image();
    img.onload = function () {
      const canvas = document.createElement("canvas");
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
      } else {
        if (height > maxWidth) {
          width = Math.round((width * maxWidth) / height);
          height = maxWidth;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      const dataUrl = canvas.toDataURL("image/jpeg", quality);
      callback(dataUrl);
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}
