// Central content file — all copy, hours, contact details and image paths live here.
// Swap images by replacing the imports below. Placeholder labels describe the ideal real photo.
import hero from "@/assets/hero.jpg";
import mursik from "@/assets/mursik.jpg";
import interior from "@/assets/interior.jpg";
import greens from "@/assets/greens.jpg";

export const images = {
  hero: { src: hero, w: 1600, h: 1008, label: "HERO: nyama choma platter at the table, evening light" },
  mursik: { src: mursik, w: 1024, h: 1024, label: "DRINKS: mursik poured from a sotet gourd, chai & mandazi" },
  interior: { src: interior, w: 1280, h: 960, label: "INTERIOR: dining room at full service" },
  greens: { src: greens, w: 1024, h: 1024, label: "FOOD: kimiet, managu, saga, chicken, chapati spread" },
};

export const site = {
  name: "Eldoret Restaurant",
  tagline: "Fire, gourd and ugali — the Rift Valley table.",
  intro:
    "Goat ribs slow-roasted over acacia charcoal, mursik cured the Kalenjin way in smoked gourds, and chai brewed strong enough for a morning on the farm.",
  address: "Uganda Road, opposite Zion Mall, Eldoret, Kenya",
  phone: "+254 700 000 000",
  email: "hello@eldoretrestaurant.co.ke",
  whatsapp: "254700000000",
  mapQuery: "Zion Mall Eldoret Kenya",
  currency: "KSh",
  priceRange: "KSh 400 – 2,500",
  payments: ["M-Pesa", "Visa & Mastercard", "Cash"],
  services: ["Dine-in", "Takeaway", "Delivery", "Catering", "Private events"],
  socials: [
    { name: "Instagram", href: "https://instagram.com" },
    { name: "Facebook", href: "https://facebook.com" },
    { name: "TikTok", href: "https://tiktok.com" },
    { name: "Google Reviews", href: "https://google.com/maps" },
  ],
  announcement: {
    id: "mashujaa-2026",
    text: "Mashujaa Day, 20 Oct: open 10am–11pm with a whole-goat feast for groups of 10+.",
  },
};

// 0 = Sunday. Times in 24h "HH:MM". kitchenClose = last orders.
export type DayHours = { open: string; close: string; kitchenClose: string } | null;
export const hours: Record<number, DayHours> = {
  0: { open: "09:00", close: "21:00", kitchenClose: "20:30" },
  1: { open: "07:00", close: "22:00", kitchenClose: "21:30" },
  2: { open: "07:00", close: "22:00", kitchenClose: "21:30" },
  3: { open: "07:00", close: "22:00", kitchenClose: "21:30" },
  4: { open: "07:00", close: "22:00", kitchenClose: "21:30" },
  5: { open: "07:00", close: "23:30", kitchenClose: "22:30" },
  6: { open: "08:00", close: "23:30", kitchenClose: "22:30" },
};
export const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type Diet = "vegetarian" | "vegan" | "gluten-free" | "halal" | "spicy";
export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: "starters" | "mains" | "desserts" | "drinks" | "kids" | "specials";
  diet: Diet[];
  allergens: string[];
  image?: keyof typeof images;
  chefsPick?: boolean;
  soldOut?: boolean;
  signature?: boolean;
};

export const categories = [
  { id: "starters", label: "Starters" },
  { id: "mains", label: "Mains" },
  { id: "specials", label: "Specials" },
  { id: "desserts", label: "Desserts" },
  { id: "drinks", label: "Drinks" },
  { id: "kids", label: "Kids" },
] as const;

export const menu: MenuItem[] = [
  { id: "mandazi", name: "Mandazi basket", description: "Six cardamom-and-coconut mandazi, fried to order, with honey from Kerio Valley hives.", price: 250, category: "starters", diet: ["vegetarian", "halal"], allergens: ["Gluten", "Milk"], image: "mursik" },
  { id: "mutura", name: "Mutura bites", description: "Grilled Kenyan blood sausage, sliced and served with kachumbari and pili pili.", price: 450, category: "starters", diet: ["spicy"], allergens: [] },
  { id: "samosa", name: "Ndengu samosas", description: "Crisp pastry with spiced green grams and coriander. Four pieces.", price: 300, category: "starters", diet: ["vegan", "halal"], allergens: ["Gluten"] },
  { id: "choma-goat", name: "Nyama choma — goat ribs (½ kg)", description: "Uasin Gishu goat, salted only, roasted slowly over acacia charcoal. With ugali and kachumbari.", price: 1200, category: "mains", diet: ["gluten-free", "halal"], allergens: [], image: "hero", chefsPick: true, signature: true },
  { id: "choma-beef", name: "Nyama choma — beef (½ kg)", description: "Grass-fed beef from Moiben, charred edges, juicy centre. With mukimo or ugali.", price: 1100, category: "mains", diet: ["gluten-free", "halal"], allergens: [] },
  { id: "kienyeji", name: "Kienyeji chicken", description: "Free-range chicken from Kaptagat, slow-stewed in tomato and dhania, or roasted whole.", price: 1500, category: "mains", diet: ["gluten-free", "halal"], allergens: [], image: "greens", signature: true },
  { id: "kimiet", name: "Kimiet & isageek", description: "Finger-millet ugali with traditional managu, saga and sour milk-wilted greens.", price: 650, category: "mains", diet: ["vegetarian", "gluten-free"], allergens: ["Milk"], image: "greens", chefsPick: true },
  { id: "matumbo", name: "Matumbo fry", description: "Tripe pan-fried with onion, tomato and green chilli. A Saturday favourite.", price: 700, category: "mains", diet: ["spicy", "halal"], allergens: [] },
  { id: "githeri", name: "Githeri ya nyumbani", description: "Maize and beans simmered with carrots and avocado on the side.", price: 500, category: "mains", diet: ["vegan", "gluten-free"], allergens: [] },
  { id: "whole-goat", name: "Whole-goat feast (serves 10)", description: "A full goat roasted on the open fire, with soup, ugali, kimiet, greens and mursik.", price: 18000, category: "specials", diet: ["gluten-free", "halal"], allergens: ["Milk"], chefsPick: true },
  { id: "fish-ugali", name: "Wet fry tilapia", description: "Whole Lake Victoria tilapia in tomato-onion gravy. Friday only.", price: 1400, category: "specials", diet: ["gluten-free", "halal"], allergens: ["Fish"], soldOut: true },
  { id: "pumpkin", name: "Roast pumpkin & honey", description: "Wood-roasted pumpkin, Kerio honey, toasted groundnuts.", price: 350, category: "desserts", diet: ["vegetarian", "gluten-free"], allergens: ["Peanuts"] },
  { id: "mkate", name: "Mkate wa sinia", description: "Coconut rice cake, warm, with mursik cream.", price: 400, category: "desserts", diet: ["vegetarian", "gluten-free"], allergens: ["Milk"] },
  { id: "mursik", name: "Mursik (½ litre)", description: "Fermented milk cured in a sotet gourd rubbed with cromwo charcoal. Smoky, sour, essential.", price: 300, category: "drinks", diet: ["vegetarian", "gluten-free"], allergens: ["Milk"], image: "mursik", chefsPick: true, signature: true },
  { id: "chai", name: "Chai ya maziwa", description: "Kericho tea boiled with whole milk and ginger. Pot for two.", price: 250, category: "drinks", diet: ["vegetarian", "gluten-free"], allergens: ["Milk"] },
  { id: "sugarcane", name: "Fresh sugarcane & lime", description: "Pressed at the counter.", price: 200, category: "drinks", diet: ["vegan", "gluten-free"], allergens: [] },
  { id: "kids-choma", name: "Little choma plate", description: "Tender beef strips, small ugali, sweet carrots and a mandazi.", price: 550, category: "kids", diet: ["halal"], allergens: ["Gluten", "Milk"] },
  { id: "kids-chips", name: "Chips & kienyeji drumstick", description: "Hand-cut chips with one roasted drumstick.", price: 500, category: "kids", diet: ["gluten-free", "halal"], allergens: [] },
];

export const specialsToday = ["whole-goat", "kimiet", "mursik"];

export const reviews = [
  { name: "Wanjiru K.", rating: 5, text: "The goat ribs came out crackling at the edges, and the mursik tasted exactly like my grandmother's in Nandi Hills.", source: "Google" },
  { name: "Brian Kiprop", rating: 5, text: "We booked the whole-goat feast for my brother's graduation. Twelve of us, not a crumb left.", source: "TripAdvisor" },
  { name: "Amina H.", rating: 4, text: "Morning chai and mandazi before the drive to Kitale has become a ritual. Fast, warm, honest.", source: "Google" },
];

export const press = ["Nation", "The Standard", "Taifa Leo", "KTN", "Kass FM"];

export const story = {
  teaser:
    "Opened in 2014 by Mama Chepkoech Rotich, who spent thirty years feeding athletes at Iten training camps. Same fire, same gourds, now on Uganda Road.",
  people: [
    { role: "Founder", name: "Chepkoech Rotich", bio: "Raised in Kapsabet, Mama Chepkoech still cures every batch of mursik herself, using cromwo wood from her family land." },
    { role: "Head Chef", name: "Kipchumba Langat", bio: "Trained in Nairobi hotels, came home to cook over charcoal. Kipchumba runs the fire pit and won't let a rib leave under-rested." },
    { role: "Pastry & Breakfast", name: "Jepkosgei Too", bio: "Up at 4am for the mandazi. Her coconut mkate wa sinia sells out by noon most Saturdays." },
  ],
  suppliers: [
    { name: "Moiben Livestock Co-op", what: "Goat and grass-fed beef, slaughtered within 24 hours of roasting." },
    { name: "Kaptagat Kienyeji Farmers", what: "Free-range chicken and eggs from twelve smallholder families." },
    { name: "Rotich family land, Kapsabet", what: "Cromwo charcoal for curing gourds; fresh milk from our own herd." },
    { name: "Kericho Highlands estates", what: "Loose-leaf black tea for every pot of chai." },
    { name: "Kerio Valley beekeepers", what: "Raw acacia honey for mandazi and desserts." },
  ],
};

export const gallery = [
  { key: "hero", tag: "food" },
  { key: "interior", tag: "interior" },
  { key: "mursik", tag: "food" },
  { key: "greens", tag: "food" },
  { key: "interior", tag: "events" },
  { key: "hero", tag: "events" },
] as const;

export const contactInfo = {
  directions: "From the Eldoret town clock, head west on Uganda Road for 600m. We're on the left, opposite Zion Mall.",
  parking: "Free secure parking for 30 cars behind the building, with a guard until closing.",
  transport: "Matatus on the Kapsoya and Langas routes stop at Zion Mall, 1 minute's walk. Boda bodas wait at the gate.",
  accessibility: "Step-free entrance and ground-floor dining, one accessible toilet. High chairs on request.",
};
