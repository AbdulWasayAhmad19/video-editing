export type Reel = {
  slug: string;
  title: string;
  client: string;
  category: string;
  description: string;
  video: string;
  poster: string;
  duration: string;
  tools: string[];
  year: string;
  /** Defaults to "portrait" (9:16). Use "landscape" for 16:9 videos. */
  orientation?: "portrait" | "landscape";
};

export type ReelSection = {
  id: string;
  title: string;
  description: string;
  reels: Reel[];
};

export const portfolio = {
  header: {
    name: "Abdul Wasay Ahmad",
    title: "Video Editor | Reels & Short-Form Promos | CapCut, Premiere Pro, After Effects",
    location: "Lahore, Pakistan",
    email: "wasay12005@gmail.com",
    // TODO: put your WhatsApp number here in international format (no spaces or +), e.g. "923001234567"
    whatsapp: "",
    links: [
      { name: "Instagram", url: "https://www.instagram.com/abdulwasay19" },
      // TODO: paste the exact URL of your "Trending Memes" Facebook page here.
      { name: "Facebook", url: "https://www.facebook.com/" },
    ],
  },
  about:
    "I'm Abdul Wasay, a video editor from Lahore. I shoot and edit short-form promo reels for local brands — restaurants, electronics stores and retail shops — cutting fast, punchy vertical videos for Instagram, TikTok and Facebook that get businesses noticed and bring customers through the door.",

  principles: [
    {
      title: "Hook in 3 seconds",
      description:
        "Every reel opens on the strongest frame — a neon sign, a sizzling grill, a storefront reveal — so viewers don't swipe away.",
    },
    {
      title: "Rhythm & beat sync",
      description:
        "Cuts, zooms and transitions land on the beat. Trending audio, speed ramps and motion text keep the energy high from the first frame to the last.",
    },
    {
      title: "Colour that sells",
      description:
        "Clean colour grading and sharp text overlays make food look tasty, products look premium and shops look busy.",
    },
  ],

  /** Client Projects, split into sections. Each section gets its own player on the page. */
  reelSections: [
    {
      id: "promo-reels",
      title: "Business promo reels",
      description:
        "Shot on location and edited for local businesses in Lahore — restaurants, real estate, electronics and retail.",
      reels: [
        {
          slug: "raw-district-by-imtiaz",
          title: "Raw District by Imtiaz",
          client: "Raw District by Imtiaz",
          category: "Real Estate",
          description:
            "On-camera project reel for Raw District by Imtiaz — location shots near the metro, animated word-by-word captions and clean cuts that keep viewers watching to the end.",
          video: "/reels/raw-district-by-imtiaz.mp4",
          poster: "/reels/raw-district-by-imtiaz.jpg",
          duration: "0:48",
          tools: ["CapCut", "Animated Captions", "Colour Grade"],
          year: "2026",
        },
        {
          slug: "murshid-fast-food",
          title: "Murshid Fast Food",
          client: "Murshid Fast Food",
          category: "Food & Restaurants",
          description:
            "Storefront-to-kitchen promo reel: exterior reveal, dining area and quick food shots cut to the beat with smooth transitions.",
          video: "/reels/murshid-fast-food.mp4",
          poster: "/reels/murshid-fast-food.jpg",
          duration: "0:20",
          tools: ["CapCut", "Colour Grade", "Beat Sync"],
          year: "2026",
        },
        {
          slug: "alkhair-food-planet",
          title: "Alkhair Food Planet",
          client: "Alkhair Food Planet",
          category: "Food & Restaurants",
          description:
            "Neon-sign reveal and fast menu highlights cut to trending audio — short, loud and made for Instagram Reels.",
          video: "/reels/alkhair-food-planet.mp4",
          poster: "/reels/alkhair-food-planet.jpg",
          duration: "0:09",
          tools: ["CapCut", "Speed Ramp", "Transitions"],
          year: "2026",
        },
        {
          slug: "abdullah-electronics",
          title: "Abdullah Electronics",
          client: "Abdullah Electronics",
          category: "Retail & Stores",
          description:
            "Showroom walkthrough with product close-ups, motion text and clean pacing to show off the range and the space.",
          video: "/reels/abdullah-electronics.mp4",
          poster: "/reels/abdullah-electronics.jpg",
          duration: "0:33",
          tools: ["Premiere Pro", "Motion Text", "Colour Grade"],
          year: "2026",
        },
        {
          slug: "zamzam-store",
          title: "Zamzam Departmental Store",
          client: "Zamzam Departmental Store",
          category: "Retail & Stores",
          description:
            "Street-to-shelf reveal with zoom transitions and bright colour grading so the store looks welcoming and well-stocked.",
          video: "/reels/zamzam-store.mp4",
          poster: "/reels/zamzam-store.jpg",
          duration: "0:11",
          tools: ["CapCut", "Zoom Transitions", "Colour Grade"],
          year: "2026",
        },
      ],
    },
    {
      id: "ai-promotional-reels",
      title: "AI promotional reels",
      description:
        "Brand ads built with AI-generated footage, then cut, graded and finished by hand — no shoot, no studio.",
      reels: [
        {
          slug: "ai-roja-perfume",
          title: "Roja Perfume",
          client: "Roja",
          category: "AI Promo",
          description:
            "Sunset-by-the-sea perfume ad made from AI-generated shots — slow, cinematic pacing that ends on the bottle and the brand line.",
          video: "/reels/ai-roja-perfume.mp4",
          poster: "/reels/ai-roja-perfume.jpg",
          duration: "0:10",
          tools: ["AI Video", "Colour Grade", "Sound Design"],
          year: "2026",
          orientation: "landscape",
        },
        {
          slug: "ai-elva-watches",
          title: "Elva Watches",
          client: "Elva",
          category: "AI Promo",
          description:
            "Luxury watch ad created with AI visuals — a soft morning mood leading into the box reveal and gold close-ups.",
          video: "/reels/ai-elva-watches.mp4",
          poster: "/reels/ai-elva-watches.jpg",
          duration: "0:10",
          tools: ["AI Video", "Colour Grade", "Product Reveal"],
          year: "2026",
        },
      ],
    },
    {
      id: "before-after",
      title: "Before & after edits",
      description:
        "Raw footage on one side, the finished edit on the other — captions, colour, zooms and motion text added.",
      reels: [
        {
          slug: "before-after-1",
          title: "Talking-Head Edit",
          client: "Client edit",
          category: "Before & After",
          description:
            "A plain on-camera clip turned into a polished reel with bold captions, zoom punches and a cleaner grade.",
          video: "/reels/before-after-1.mp4",
          poster: "/reels/before-after-1.jpg",
          duration: "0:22",
          tools: ["CapCut", "Captions", "Colour Grade"],
          year: "2026",
        },
        {
          slug: "before-after-2",
          title: "Consultant Reel",
          client: "Client edit",
          category: "Before & After",
          description:
            "Sit-down interview footage reworked with animated keyword captions and tighter cuts to keep viewers watching.",
          video: "/reels/before-after-2.mp4",
          poster: "/reels/before-after-2.jpg",
          duration: "0:40",
          tools: ["CapCut", "Motion Text", "Beat Sync"],
          year: "2026",
        },
        {
          slug: "before-after-3",
          title: "Office Promo",
          client: "Client edit",
          category: "Before & After",
          description:
            "Office and product footage lifted with colour correction, reframing and on-brand text overlays.",
          video: "/reels/before-after-3.mp4",
          poster: "/reels/before-after-3.jpg",
          duration: "0:27",
          tools: ["CapCut", "Colour Grade", "Reframing"],
          year: "2026",
        },
      ],
    },
  ] as ReelSection[],

  services: [
    {
      id: "reels",
      title: "Promo Reels",
      description:
        "15–60 second vertical reels for Instagram, TikTok and Facebook that show off your shop, your food or your products — shot on location if you're in Lahore.",
      highlights: [
        { title: "Shot & Edited", desc: "Storefront, interior and product footage captured on site" },
        { title: "Made for Vertical", desc: "9:16 framing, safe zones and captions for mobile" },
        { title: "Trending Audio", desc: "Cut to the sounds people are already watching" },
      ],
      tags: ["Instagram Reels", "TikTok", "Facebook", "9:16", "Promo"],
    },
    {
      id: "editing",
      title: "Short-Form Editing",
      description:
        "Send me your raw clips — I cut, colour, caption and sync them to audio, and hand back a ready-to-post reel within 48 hours.",
      highlights: [
        { title: "Beat-Synced Cuts", desc: "Every transition lands on the music" },
        { title: "Auto Captions", desc: "Clean, on-brand subtitles that keep silent viewers watching" },
        { title: "Colour Grading", desc: "Food that looks fresh, products that look premium" },
      ],
      tags: ["CapCut", "Premiere Pro", "DaVinci Resolve", "Captions", "48h Turnaround"],
    },
    {
      id: "motion",
      title: "Motion Text & Branding",
      description:
        "Animated logos, price cards, offer stickers and text overlays that match your brand across every video you post.",
      highlights: [
        { title: "Logo Animations", desc: "Short intros and outros with your logo" },
        { title: "Price & Offer Cards", desc: "Animated callouts for deals and menus" },
        { title: "Consistent Look", desc: "Fonts, colours and layouts reused across reels" },
      ],
      tags: ["After Effects", "Alight Motion", "Canva", "Photoshop", "Typography"],
    },
  ],

  /** Tools grouped for the marquee + toolkit grid. */
  skills: [
    { category: "Mobile Editing", items: ["CapCut", "VN Editor", "InShot", "Alight Motion"] },
    { category: "Desktop Editing", items: ["Premiere Pro", "DaVinci Resolve", "Filmora"] },
    { category: "Motion & Effects", items: ["After Effects", "Motion Text", "Speed Ramps", "Transitions"] },
    { category: "Design & Colour", items: ["Photoshop", "Lightroom", "Canva", "Colour Grading"] },
    { category: "Platforms", items: ["Instagram Reels", "TikTok", "YouTube Shorts", "Facebook"] },
  ],
};
