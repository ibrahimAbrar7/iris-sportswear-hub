import jerseyImg from "@/assets/p-jersey.jpg";
import teeImg from "@/assets/p-tee.jpg";
import shortsImg from "@/assets/p-shorts.jpg";
import hoodieImg from "@/assets/p-hoodie.jpg";
import leggingsImg from "@/assets/p-leggings.jpg";
import jacketImg from "@/assets/p-jacket.jpg";
import braImg from "@/assets/p-bra.jpg";
import joggersImg from "@/assets/p-joggers.jpg";
import accessoryImg from "@/assets/p-accessory.jpg";
import shoeImg from "@/assets/p-shoe.jpg";

import heroBasketball from "@/assets/hero-basketball.jpg";
import heroSoccer from "@/assets/hero-soccer.jpg";
import heroRunning from "@/assets/hero-running.jpg";
import heroTraining from "@/assets/hero-training.jpg";
import heroLifestyle from "@/assets/hero-lifestyle.jpg";

export type Gender = "men" | "women" | "boys" | "girls";
export type Department = "clothing" | "accessories" | "footwear";

export interface Product {
  id: string;
  slug: string;
  name: string;
  brand: string;
  sport: string;
  gender: Gender;
  department: Department;
  type: string;
  typeSlug: string;
  price: number;
  salePrice?: number;
  sku: string;
  image: string;
  hoverImage: string;
  gallery: string[];
  colors: { name: string; hex: string }[];
  sizes: string[];
  fit: string;
  stock: Record<string, number>;
  description: string;
  features: string[];
  materials: string[];
  activity: string;
  collection: string;
  tags: string[];
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
  isFeatured: boolean;
}

export const sports = [
  { slug: "basketball", name: "Basketball", image: heroBasketball, blurb: "Jerseys, shorts and warm-up layers built for the court.",
    subcategories: ["Jerseys", "Shorts", "T-Shirts", "Hoodies", "Pants", "Jackets", "Compression", "Socks", "Accessories"] },
  { slug: "football", name: "Football", image: heroTraining, blurb: "Practice and game-day apparel for every position.",
    subcategories: ["Jerseys", "Training Tops", "Shorts", "Hoodies", "Pants", "Jackets", "Compression", "Socks", "Accessories"] },
  { slug: "soccer", name: "Soccer", image: heroSoccer, blurb: "Match day kits, training tops and tracksuits.",
    subcategories: ["Jerseys", "Training Wear", "Shorts", "Pants", "Tracksuits", "Jackets", "Socks", "Accessories"] },
  { slug: "running", name: "Running", image: heroRunning, blurb: "Lightweight layers engineered for every mile.",
    subcategories: ["Tops", "T-Shirts", "Shorts", "Leggings", "Jackets", "Vests", "Socks", "Accessories"] },
  { slug: "training", name: "Training", image: heroTraining, blurb: "Performance clothing for every session.",
    subcategories: ["T-Shirts", "Shorts", "Joggers", "Hoodies", "Compression", "Jackets", "Accessories"] },
  { slug: "gym", name: "Gym", image: heroTraining, blurb: "Studio-to-street essentials that move with you.",
    subcategories: ["Tops", "Leggings", "Shorts", "Joggers", "Sports Bras", "Hoodies", "Accessories"] },
  { slug: "tennis", name: "Tennis", image: heroLifestyle, blurb: "Polos, skirts and dresses with court-ready structure.",
    subcategories: ["Polos", "T-Shirts", "Shorts", "Skirts", "Dresses", "Jackets", "Socks", "Accessories"] },
  { slug: "baseball", name: "Baseball", image: heroBasketball, blurb: "Diamond-inspired jerseys, pants and layers.",
    subcategories: ["Jerseys", "T-Shirts", "Pants", "Shorts", "Jackets", "Hoodies", "Caps", "Accessories"] },
  { slug: "volleyball", name: "Volleyball", image: heroTraining, blurb: "Jerseys, tops and leggings built for the block.",
    subcategories: ["Jerseys", "Tops", "Shorts", "Leggings", "Jackets", "Accessories"] },
  { slug: "outdoor", name: "Outdoor", image: heroRunning, blurb: "Windbreakers, fleece and trail-ready layers.",
    subcategories: ["Jackets", "Fleece", "Pants", "Shorts", "Performance Tops", "Accessories"] },
  { slug: "lifestyle", name: "Lifestyle", image: heroLifestyle, blurb: "Sport-inspired clothing designed for modern life.",
    subcategories: ["T-Shirts", "Hoodies", "Sweatshirts", "Joggers", "Track Pants", "Tracksuits", "Jackets", "Shorts"] },
];

export const clothingCategories = [
  { slug: "jerseys", name: "Jerseys", blurb: "Official-inspired and performance jersey styles." },
  { slug: "t-shirts", name: "T-Shirts", blurb: "Performance and everyday sports tees." },
  { slug: "shorts", name: "Shorts", blurb: "Training, running and lifestyle shorts." },
  { slug: "hoodies", name: "Hoodies", blurb: "Premium athletic hoodies." },
  { slug: "joggers", name: "Joggers", blurb: "Comfortable performance joggers." },
  { slug: "leggings", name: "Leggings", blurb: "Performance leggings and activewear." },
  { slug: "tracksuits", name: "Tracksuits", blurb: "Complete athletic looks." },
  { slug: "jackets", name: "Jackets", blurb: "Training, outdoor and lifestyle jackets." },
  { slug: "sports-bras", name: "Sports Bras", blurb: "Performance support and training styles." },
  { slug: "compression", name: "Compression", blurb: "Performance-focused compression apparel." },
];

export const activities = ["Training", "Game Day", "Running", "Gym", "Warm-Up", "Recovery", "Travel", "Everyday", "Outdoor"];

export const brands = [
  { slug: "iris-pro", name: "IRIS Pro", blurb: "Our performance line, engineered for competition." },
  { slug: "iris-studio", name: "IRIS Studio", blurb: "Gym and studio essentials with a refined finish." },
  { slug: "iris-court", name: "IRIS Court", blurb: "Court sports apparel with heritage detailing." },
  { slug: "iris-field", name: "IRIS Field", blurb: "Field and pitch kits for training and match day." },
  { slug: "iris-trail", name: "IRIS Trail", blurb: "Weather-ready outdoor layers." },
  { slug: "iris-everyday", name: "IRIS Everyday", blurb: "Athleisure built for life off the clock." },
];

const imageFor: Record<string, string> = {
  jerseys: jerseyImg, "t-shirts": teeImg, tops: teeImg, polos: teeImg,
  shorts: shortsImg, hoodies: hoodieImg, sweatshirts: hoodieImg,
  leggings: leggingsImg, jackets: jacketImg, "sports-bras": braImg,
  joggers: joggersImg, pants: joggersImg, tracksuits: jacketImg,
  compression: teeImg, accessories: accessoryImg, footwear: shoeImg,
};

const COLORS = [
  { name: "Black", hex: "#111111" },
  { name: "Off White", hex: "#efece6" },
  { name: "Charcoal", hex: "#3a3a3a" },
  { name: "Slate", hex: "#6b7280" },
  { name: "Court Red", hex: "#a32a2a" },
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
const FITS = ["Regular Fit", "Slim Fit", "Relaxed Fit", "Oversized Fit"];

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

interface Def {
  name: string; sport: string; gender: Gender; department: Department; typeSlug: string; type: string;
  price: number; sale?: number; activity: string;
}

const defs: Def[] = [
  // Basketball
  { name: "Elite Performance Basketball Jersey", sport: "basketball", gender: "men", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 74.99, activity: "Game Day" },
  { name: "Pro Basketball Shorts", sport: "basketball", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 54.99, sale: 42.99, activity: "Game Day" },
  { name: "Court Ready Basketball Hoodie", sport: "basketball", gender: "men", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 89.99, activity: "Warm-Up" },
  { name: "Basketball Warm-Up Jacket", sport: "basketball", gender: "men", department: "clothing", typeSlug: "jackets", type: "Jackets", price: 109.99, activity: "Warm-Up" },
  { name: "Basketball Compression Tee", sport: "basketball", gender: "men", department: "clothing", typeSlug: "compression", type: "Compression", price: 44.99, activity: "Training" },
  { name: "Women's Basketball Performance Tee", sport: "basketball", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 39.99, activity: "Training" },
  { name: "Women's Court Basketball Shorts", sport: "basketball", gender: "women", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 49.99, activity: "Game Day" },
  { name: "Boys' Basketball Jersey", sport: "basketball", gender: "boys", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 44.99, activity: "Game Day" },
  // Football
  { name: "Gridiron Performance Football Jersey", sport: "football", gender: "men", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 84.99, activity: "Game Day" },
  { name: "Football Training Top", sport: "football", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 42.99, activity: "Training" },
  { name: "Football Practice Shorts", sport: "football", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 46.99, sale: 34.99, activity: "Training" },
  { name: "Football Sideline Hoodie", sport: "football", gender: "men", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 94.99, activity: "Warm-Up" },
  { name: "Boys' Football Training Tee", sport: "football", gender: "boys", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 32.99, activity: "Training" },
  // Soccer
  { name: "Performance Soccer Jersey", sport: "soccer", gender: "men", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 79.99, activity: "Game Day" },
  { name: "Soccer Training Top", sport: "soccer", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 44.99, activity: "Training" },
  { name: "Match Day Soccer Shorts", sport: "soccer", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 39.99, activity: "Game Day" },
  { name: "Soccer Training Pants", sport: "soccer", gender: "men", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 69.99, sale: 54.99, activity: "Training" },
  { name: "Soccer Training Jacket", sport: "soccer", gender: "men", department: "clothing", typeSlug: "jackets", type: "Jackets", price: 99.99, activity: "Warm-Up" },
  { name: "Women's Soccer Jersey", sport: "soccer", gender: "women", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 74.99, activity: "Game Day" },
  { name: "Girls' Soccer Training Tee", sport: "soccer", gender: "girls", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 29.99, activity: "Training" },
  { name: "Soccer Travel Tracksuit", sport: "soccer", gender: "men", department: "clothing", typeSlug: "tracksuits", type: "Tracksuits", price: 149.99, activity: "Travel" },
  // Running
  { name: "Lightweight Running T-Shirt", sport: "running", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 39.99, activity: "Running" },
  { name: "Performance Running Shorts", sport: "running", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 44.99, activity: "Running" },
  { name: "Women's Running Leggings", sport: "running", gender: "women", department: "clothing", typeSlug: "leggings", type: "Leggings", price: 84.99, sale: 64.99, activity: "Running" },
  { name: "Women's Long Sleeve Running Top", sport: "running", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 54.99, activity: "Running" },
  { name: "Reflective Running Jacket", sport: "running", gender: "women", department: "clothing", typeSlug: "jackets", type: "Jackets", price: 129.99, activity: "Running" },
  { name: "Men's Running Half-Zip", sport: "running", gender: "men", department: "clothing", typeSlug: "jackets", type: "Jackets", price: 99.99, activity: "Running" },
  { name: "Running Compression Tights", sport: "running", gender: "men", department: "clothing", typeSlug: "compression", type: "Compression", price: 74.99, activity: "Recovery" },
  // Training
  { name: "Men's Training T-Shirt", sport: "training", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 34.99, activity: "Training" },
  { name: "Women's Training Top", sport: "training", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 39.99, activity: "Training" },
  { name: "Performance Training Shorts", sport: "training", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 42.99, activity: "Training" },
  { name: "Training Joggers", sport: "training", gender: "men", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 79.99, sale: 59.99, activity: "Training" },
  { name: "Men's Training Hoodie", sport: "training", gender: "men", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 89.99, activity: "Warm-Up" },
  { name: "Training Compression Long Sleeve", sport: "training", gender: "men", department: "clothing", typeSlug: "compression", type: "Compression", price: 59.99, activity: "Training" },
  { name: "Women's Training Joggers", sport: "training", gender: "women", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 74.99, activity: "Recovery" },
  // Gym
  { name: "Men's Gym Tank", sport: "gym", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 29.99, activity: "Gym" },
  { name: "Women's Sports Bra", sport: "gym", gender: "women", department: "clothing", typeSlug: "sports-bras", type: "Sports Bras", price: 49.99, activity: "Gym" },
  { name: "Performance Gym Leggings", sport: "gym", gender: "women", department: "clothing", typeSlug: "leggings", type: "Leggings", price: 79.99, activity: "Gym" },
  { name: "Gym Training Hoodie", sport: "gym", gender: "women", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 84.99, sale: 64.99, activity: "Recovery" },
  { name: "Men's Gym Shorts", sport: "gym", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 39.99, activity: "Gym" },
  { name: "Women's Seamless Gym Top", sport: "gym", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 44.99, activity: "Gym" },
  // Tennis
  { name: "Men's Tennis Polo", sport: "tennis", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "Polos", price: 64.99, activity: "Game Day" },
  { name: "Women's Tennis Dress", sport: "tennis", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "Dresses", price: 94.99, activity: "Game Day" },
  { name: "Tennis Performance Shorts", sport: "tennis", gender: "men", department: "clothing", typeSlug: "shorts", type: "Shorts", price: 54.99, activity: "Game Day" },
  { name: "Women's Tennis Skirt", sport: "tennis", gender: "women", department: "clothing", typeSlug: "shorts", type: "Skirts", price: 59.99, activity: "Game Day" },
  // Baseball
  { name: "Baseball Performance Jersey", sport: "baseball", gender: "men", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 79.99, activity: "Game Day" },
  { name: "Baseball Training Pants", sport: "baseball", gender: "men", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 69.99, activity: "Training" },
  { name: "Boys' Baseball Tee", sport: "baseball", gender: "boys", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 29.99, activity: "Training" },
  // Volleyball
  { name: "Women's Volleyball Jersey", sport: "volleyball", gender: "women", department: "clothing", typeSlug: "jerseys", type: "Jerseys", price: 69.99, activity: "Game Day" },
  { name: "Volleyball Training Leggings", sport: "volleyball", gender: "women", department: "clothing", typeSlug: "leggings", type: "Leggings", price: 74.99, activity: "Training" },
  { name: "Girls' Volleyball Top", sport: "volleyball", gender: "girls", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 34.99, activity: "Training" },
  // Outdoor
  { name: "Windbreaker Shell Jacket", sport: "outdoor", gender: "men", department: "clothing", typeSlug: "jackets", type: "Jackets", price: 139.99, activity: "Outdoor" },
  { name: "Women's Performance Fleece", sport: "outdoor", gender: "women", department: "clothing", typeSlug: "hoodies", type: "Sweatshirts", price: 109.99, sale: 84.99, activity: "Outdoor" },
  { name: "Trail Performance Pants", sport: "outdoor", gender: "men", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 99.99, activity: "Outdoor" },
  // Lifestyle
  { name: "Oversized Sports T-Shirt", sport: "lifestyle", gender: "men", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 44.99, activity: "Everyday" },
  { name: "Premium Athletic Hoodie", sport: "lifestyle", gender: "men", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 99.99, activity: "Everyday" },
  { name: "Everyday Joggers", sport: "lifestyle", gender: "men", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 79.99, activity: "Everyday" },
  { name: "Classic Tracksuit", sport: "lifestyle", gender: "men", department: "clothing", typeSlug: "tracksuits", type: "Tracksuits", price: 159.99, sale: 129.99, activity: "Travel" },
  { name: "Women's Oversized Graphic Tee", sport: "lifestyle", gender: "women", department: "clothing", typeSlug: "t-shirts", type: "T-Shirts", price: 39.99, activity: "Everyday" },
  { name: "Women's Everyday Track Pants", sport: "lifestyle", gender: "women", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 74.99, activity: "Everyday" },
  { name: "Women's Lifestyle Tracksuit", sport: "lifestyle", gender: "women", department: "clothing", typeSlug: "tracksuits", type: "Tracksuits", price: 149.99, activity: "Travel" },
  { name: "Boys' Lifestyle Hoodie", sport: "lifestyle", gender: "boys", department: "clothing", typeSlug: "hoodies", type: "Hoodies", price: 54.99, activity: "Everyday" },
  { name: "Girls' Lifestyle Joggers", sport: "lifestyle", gender: "girls", department: "clothing", typeSlug: "joggers", type: "Joggers", price: 49.99, activity: "Everyday" },
  // Accessories
  { name: "Performance Duffel Bag", sport: "training", gender: "men", department: "accessories", typeSlug: "accessories", type: "Bags", price: 89.99, activity: "Travel" },
  { name: "Training Backpack", sport: "training", gender: "men", department: "accessories", typeSlug: "accessories", type: "Backpacks", price: 79.99, activity: "Travel" },
  { name: "Court Cap", sport: "basketball", gender: "men", department: "accessories", typeSlug: "accessories", type: "Caps", price: 29.99, activity: "Everyday" },
  { name: "Performance Crew Socks 3-Pack", sport: "running", gender: "men", department: "accessories", typeSlug: "accessories", type: "Socks", price: 24.99, activity: "Running" },
  { name: "Training Headband Set", sport: "gym", gender: "women", department: "accessories", typeSlug: "accessories", type: "Sports Accessories", price: 19.99, activity: "Gym" },
  { name: "Insulated Water Bottle", sport: "training", gender: "men", department: "accessories", typeSlug: "accessories", type: "Sports Accessories", price: 34.99, activity: "Training" },
  { name: "Women's Gym Tote", sport: "gym", gender: "women", department: "accessories", typeSlug: "accessories", type: "Bags", price: 69.99, sale: 54.99, activity: "Gym" },
  { name: "Training Gloves", sport: "gym", gender: "men", department: "accessories", typeSlug: "accessories", type: "Sports Accessories", price: 27.99, activity: "Gym" },
  // Footwear (deliberately limited)
  { name: "Road Running Shoe", sport: "running", gender: "men", department: "footwear", typeSlug: "footwear", type: "Running Shoes", price: 129.99, activity: "Running" },
  { name: "Studio Training Shoe", sport: "training", gender: "women", department: "footwear", typeSlug: "footwear", type: "Training Shoes", price: 119.99, activity: "Training" },
  { name: "Court Basketball Shoe", sport: "basketball", gender: "men", department: "footwear", typeSlug: "footwear", type: "Basketball Shoes", price: 149.99, activity: "Game Day" },
  { name: "Turf Soccer Shoe", sport: "soccer", gender: "men", department: "footwear", typeSlug: "footwear", type: "Soccer Shoes", price: 109.99, sale: 89.99, activity: "Game Day" },
  { name: "Recovery Slides", sport: "lifestyle", gender: "men", department: "footwear", typeSlug: "footwear", type: "Slides", price: 44.99, activity: "Recovery" },
];

const brandFor = (d: Def) => {
  if (d.department === "footwear") return "IRIS Pro";
  if (d.sport === "lifestyle") return "IRIS Everyday";
  if (d.sport === "outdoor") return "IRIS Trail";
  if (d.sport === "gym") return "IRIS Studio";
  if (["soccer", "football", "baseball"].includes(d.sport)) return "IRIS Field";
  if (["basketball", "tennis", "volleyball"].includes(d.sport)) return "IRIS Court";
  return "IRIS Pro";
};

export const products: Product[] = defs.map((d, i) => {
  const slug = slugify(d.name);
  const img = d.department === "footwear" ? shoeImg : d.department === "accessories" ? accessoryImg : imageFor[d.typeSlug] ?? teeImg;
  const alt = d.department === "clothing" ? (d.typeSlug === "jerseys" ? teeImg : jerseyImg) : img;
  const sizes = d.department === "accessories" ? ["One Size"]
    : d.department === "footwear" ? ["7", "8", "9", "10", "11", "12", "13"]
    : APPAREL_SIZES.slice(0, 6);
  const colors = COLORS.slice(i % 2, (i % 2) + 3);
  const stock: Record<string, number> = {};
  sizes.forEach((s, si) => { stock[s] = (i * 7 + si * 3) % 14; });
  return {
    id: `P${1000 + i}`,
    slug,
    name: d.name,
    brand: brandFor(d),
    sport: d.sport,
    gender: d.gender,
    department: d.department,
    type: d.type,
    typeSlug: d.typeSlug,
    price: d.price,
    salePrice: d.sale,
    sku: `IRS-${String(1000 + i)}-${d.typeSlug.toUpperCase().slice(0, 3)}`,
    image: img,
    hoverImage: alt,
    gallery: [img, alt, img, alt],
    colors,
    sizes,
    fit: FITS[i % FITS.length],
    stock,
    description: `${d.name} from IRIS. Designed for ${d.activity.toLowerCase()} with a clean, modern silhouette and fabric that moves with you.`,
    features: [
      "Moisture-wicking performance fabric",
      "Four-way stretch for unrestricted movement",
      "Flatlock seams to reduce chafing",
      "Breathable ventilation zones",
    ],
    materials: ["88% Polyester", "12% Elastane", "Performance knit"],
    activity: d.activity,
    collection: d.sale ? "Sale" : i % 5 === 0 ? "New Arrivals" : i % 3 === 0 ? "Best Sellers" : "Trending",
    tags: [d.sport, d.type.toLowerCase(), d.gender, d.activity.toLowerCase()],
    rating: 0,
    reviews: 0,
    isNew: i % 5 === 0,
    isBestseller: i % 3 === 0,
    isFeatured: i % 4 === 0,
  };
});

export const bySlug = (slug: string) => products.find((p) => p.slug === slug);
export const formatUSD = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export const inStock = (p: Product, size?: string) =>
  size ? (p.stock[size] ?? 0) > 0 : Object.values(p.stock).some((v) => v > 0);

export function completeTheLook(p: Product): Product[] {
  const sameSport = products.filter((x) => x.sport === p.sport && x.slug !== p.slug);
  const clothing = sameSport.filter((x) => x.department === "clothing" && x.typeSlug !== p.typeSlug);
  const accessories = sameSport.filter((x) => x.department === "accessories");
  const fallback = products.filter((x) => x.department === "clothing" && x.slug !== p.slug);
  return [...clothing, ...accessories, ...fallback].slice(0, 4);
}

export const editorial = [
  { slug: "best-basketball-clothing-for-training", title: "Best Basketball Clothing for Training", excerpt: "The layers that keep you sharp from warm-up to final whistle.", image: heroBasketball },
  { slug: "how-to-build-a-running-outfit", title: "How to Build a Running Outfit", excerpt: "Base layers, shorts and shells for every temperature.", image: heroRunning },
  { slug: "womens-training-essentials", title: "Women's Training Essentials", excerpt: "Six pieces that carry a full week of sessions.", image: heroTraining },
  { slug: "how-to-style-a-sports-jersey", title: "How to Style a Sports Jersey", excerpt: "Game-day pieces, styled for the street.", image: heroLifestyle },
];

export const heroSlides = [
  { sport: "basketball", eyebrow: "Basketball", title: "OWN THE COURT", copy: "Premium basketball apparel built for movement.", cta: "Shop Basketball", image: heroBasketball },
  { sport: "soccer", eyebrow: "Soccer", title: "PLAY WITH PURPOSE", copy: "Performance-inspired soccer clothing for training and match day.", cta: "Shop Soccer", image: heroSoccer },
  { sport: "running", eyebrow: "Running", title: "MOVE WITHOUT LIMITS", copy: "Lightweight running apparel built for every mile.", cta: "Shop Running", image: heroRunning },
  { sport: "training", eyebrow: "Training", title: "TRAIN HARD. LOOK SHARP.", copy: "Performance clothing for every workout.", cta: "Shop Training", image: heroTraining },
  { sport: "lifestyle", eyebrow: "Athleisure", title: "FROM WORKOUT TO EVERYDAY", copy: "Sport-inspired clothing designed for modern life.", cta: "Shop Lifestyle", image: heroLifestyle },
];
