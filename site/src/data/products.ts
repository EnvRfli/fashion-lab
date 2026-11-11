export type StageId = "junior" | "senior" | "sixth";

export type CategoryId =
  | "blazers"
  | "shirts"
  | "knitwear"
  | "skirts-trousers"
  | "accessories";

export interface Product {
  slug: string;
  name: string;
  category: CategoryId;
  categoryLabel: string;
  stages: StageId[];
  price: number;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  imagePosition: string;
  summary: string;
  description: string;
  fit: string;
  fabric: string;
  care: string;
  sizes: string[];
}

export interface Stage {
  id: StageId;
  label: string;
  ages: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  shortLabel: string;
}

export const STAGES: Stage[] = [
  { id: "junior", label: "Junior", ages: "4–11" },
  { id: "senior", label: "Senior", ages: "11–16" },
  { id: "sixth", label: "Sixth", ages: "16–18" },
];

export const CATEGORIES: Category[] = [
  { id: "blazers", label: "Blazers", shortLabel: "Blazers" },
  { id: "shirts", label: "Shirts", shortLabel: "Shirts" },
  { id: "knitwear", label: "Knitwear", shortLabel: "Knitwear" },
  {
    id: "skirts-trousers",
    label: "Skirts & Trousers",
    shortLabel: "Skirts & Trousers",
  },
  { id: "accessories", label: "Accessories", shortLabel: "Accessories" },
];

export const PRODUCTS: Product[] = [
  {
    slug: "the-poplin-shirt",
    name: "The Poplin Shirt",
    category: "shirts",
    categoryLabel: "Shirts",
    stages: ["junior", "senior"],
    price: 26,
    image: "/images/product-poplin-shirt.jpg",
    imageAlt:
      "A white cotton poplin shirt on wooden hangers, held at the collar by a hand.",
    imageWidth: 1600,
    imageHeight: 2400,
    imagePosition: "50% 62%",
    summary: "A crisp white shirt with a soft collar and a clean placket.",
    description:
      "A crisp cotton poplin shirt with a soft collar, a clean placket and a single chest pocket. Cut with room through the body so it layers without bunching. Sample product description.",
    fit: "Regular fit. Sits close at the collar and easy through the chest.",
    fabric: "100% cotton poplin.",
    care: "Machine wash at 30°C. Warm iron while slightly damp. Do not bleach.",
    sizes: ["3–4Y", "5–6Y", "7–8Y", "9–10Y", "11–12Y", "13–14Y", "15–16Y"],
  },
  {
    slug: "the-wool-blazer",
    name: "The Wool Blazer",
    category: "blazers",
    categoryLabel: "Blazers",
    stages: ["senior", "sixth"],
    price: 78,
    image: "/images/product-wool-blazer.jpg",
    imageAlt:
      "A navy single-breasted blazer on a tailor's mannequin over a stone knit top.",
    imageWidth: 1600,
    imageHeight: 2400,
    imagePosition: "50% 34%",
    summary: "A single-breasted wool blazer with a notch lapel.",
    description:
      "A single-breasted blazer with a notch lapel and a two-button front. Lightly structured through the shoulder, with two flap pockets and a clean lining. Sample product description.",
    fit: "Regular fit. Designed to layer over a shirt and a fine knit.",
    fabric: "70% wool, 30% polyester. Lining: 100% viscose.",
    care: "Dry clean only. Steam lightly between wears.",
    sizes: ["11–12Y", "13–14Y", "15–16Y", "17–18Y"],
  },
  {
    slug: "the-striped-knit",
    name: "The Striped Knit",
    category: "knitwear",
    categoryLabel: "Knitwear",
    stages: ["junior", "senior"],
    price: 34,
    image: "/images/product-striped-knit.jpg",
    imageAlt:
      "A folded navy and grey striped knitted crewneck on a pale background.",
    imageWidth: 1600,
    imageHeight: 1081,
    imagePosition: "50% 50%",
    summary: "A fine-gauge crewneck in navy and grey stripes.",
    description:
      "A fine-gauge crewneck in navy and grey stripes, with ribbed cuffs and hem. Soft enough for a shirt underneath and warm enough for a cold classroom. Sample product description.",
    fit: "Regular fit. Falls at the hip.",
    fabric: "100% cotton.",
    care: "Machine wash at 30°C on a gentle cycle. Dry flat. Do not tumble dry.",
    sizes: ["5–6Y", "7–8Y", "9–10Y", "11–12Y", "13–14Y"],
  },
  {
    slug: "the-cotton-skirt",
    name: "The Cotton Skirt",
    category: "skirts-trousers",
    categoryLabel: "Skirts & Trousers",
    stages: ["junior", "senior"],
    price: 30,
    image: "/images/product-cotton-skirt.jpg",
    imageAlt:
      "A cream straight-cut skirt with fine pinstripes, laid flat on white linen.",
    imageWidth: 1600,
    imageHeight: 2133,
    imagePosition: "50% 55%",
    summary: "A straight-cut cotton skirt with fine pinstripes.",
    description:
      "A straight-cut cotton skirt with fine pinstripes and a soft drape. Finished with a simple waistband and a clean hem. Sample product description.",
    fit: "Regular fit. Sits at the natural waist.",
    fabric: "65% polyester, 35% cotton.",
    care: "Machine wash at 30°C. Warm iron. Do not bleach.",
    sizes: ["5–6Y", "7–8Y", "9–10Y", "11–12Y", "13–14Y"],
  },
  {
    slug: "the-twill-trouser",
    name: "The Twill Trouser",
    category: "skirts-trousers",
    categoryLabel: "Skirts & Trousers",
    stages: ["senior"],
    price: 38,
    image: "/images/product-twill-trouser.jpg",
    imageAlt:
      "Folded stone-coloured twill trousers beside a grey knit, leather belt, and black boots on navy fabric.",
    imageWidth: 1600,
    imageHeight: 1599,
    imagePosition: "28% 42%",
    summary: "Flat-front twill trousers in a warm stone tone.",
    description:
      "Flat-front twill trousers in a warm stone tone, cut with a straight leg and a clean waistband. A quiet alternative to grey. Sample product description. The photograph also shows a knit, belt and boots, which are not included.",
    fit: "Regular fit. Mid-rise with a straight leg.",
    fabric: "80% polyester, 20% cotton twill.",
    care: "Machine wash at 30°C. Cool iron. Do not tumble dry.",
    sizes: ["11–12Y", "13–14Y", "15–16Y"],
  },
  {
    slug: "the-leather-loafer",
    name: "The Leather Loafer",
    category: "accessories",
    categoryLabel: "Accessories",
    stages: ["senior", "sixth"],
    price: 52,
    image: "/images/product-leather-loafer.jpg",
    imageAlt:
      "A pair of black leather penny loafers lit against a dark background.",
    imageWidth: 1600,
    imageHeight: 1600,
    imagePosition: "50% 68%",
    summary: "A black leather penny loafer with a low stacked heel.",
    description:
      "A classic penny loafer in black leather with a low stacked heel and a flexible sole. Smart enough for assembly and comfortable enough for the walk home. Sample product description.",
    fit: "Standard UK sizing. If between sizes, take the larger.",
    fabric: "Leather upper, leather lining, synthetic sole.",
    care:
      "Wipe with a soft damp cloth. Use a leather conditioner occasionally. Do not machine wash.",
    sizes: ["UK 3", "UK 4", "UK 5", "UK 6", "UK 7", "UK 8"],
  },
];

export const PRODUCT_BY_SLUG = new Map(
  PRODUCTS.map((product) => [product.slug, product]),
);

export function getProduct(slug: string | undefined): Product | undefined {
  return slug ? PRODUCT_BY_SLUG.get(slug) : undefined;
}

export function getStage(id: StageId): Stage {
  return STAGES.find((stage) => stage.id === id) ?? STAGES[0];
}

export function getStagesLabel(stages: StageId[]): string {
  return stages.map((id) => getStage(id).label).join(", ");
}

export function getCategoryCount(category: CategoryId): number {
  return PRODUCTS.filter((product) => product.category === category).length;
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(value);
}
