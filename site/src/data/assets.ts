export interface DemoAsset {
  key: string;
  path: string;
  title: string;
  alt: string;
  category: string;
  creator: string;
  sourceUrl: string;
  license: string;
  licenseUrl: string;
}

const PEXELS_LICENSE = "Pexels License";
const PEXELS_LICENSE_URL = "https://www.pexels.com/license/";

/**
 * Only the eight photographs recorded in docs/03-asset-manifest.md are allowed
 * here. They are stock demonstration imagery, not official school uniforms.
 */
export const DEMO_ASSETS: Record<string, DemoAsset> = {
  "poplin-shirt": {
    key: "poplin-shirt",
    path: "/images/product-poplin-shirt.jpg",
    title: "Kemeja putih",
    alt: "Kemeja putih berbahan katun di gantungan kayu, dipegang pada bagian kerah.",
    category: "Atasan",
    creator: "Jonathan Borba",
    sourceUrl: "https://www.pexels.com/photo/28576622/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "wool-blazer": {
    key: "wool-blazer",
    path: "/images/product-wool-blazer.jpg",
    title: "Blazer navy",
    alt: "Blazer navy satu baris kancing pada manekin, dipadukan dengan atasan rajut.",
    category: "Atasan",
    creator: "Zayona Fashion",
    sourceUrl: "https://www.pexels.com/photo/19109151/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "cotton-skirt": {
    key: "cotton-skirt",
    path: "/images/product-cotton-skirt.jpg",
    title: "Rok lipit",
    alt: "Rok lurus berwarna krem dengan garis pinstripe halus, diletakkan di atas kain linen putih.",
    category: "Bawahan",
    creator: "Eugenia Remark",
    sourceUrl: "https://www.pexels.com/photo/38266547/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "twill-trouser": {
    key: "twill-trouser",
    path: "/images/product-twill-trouser.jpg",
    title: "Celana kain",
    alt: "Celana kain terlipat berwarna cokelat muda di samping rajutan abu-abu, sabuk kulit, dan sepatu bot hitam.",
    category: "Bawahan",
    creator: "Rafael Oliveira",
    sourceUrl: "https://www.pexels.com/photo/33633245/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "striped-knit": {
    key: "striped-knit",
    path: "/images/product-striped-knit.jpg",
    title: "Sweater rajut",
    alt: "Sweater rajut bergaris navy dan abu-abu yang terlipat di atas latar terang.",
    category: "Atasan",
    creator: "Dom J",
    sourceUrl: "https://www.pexels.com/photo/45982/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "leather-loafer": {
    key: "leather-loafer",
    path: "/images/product-leather-loafer.jpg",
    title: "Sepatu kulit",
    alt: "Sepasang sepatu loafer kulit hitam dengan pencahayaan dramatis di latar gelap.",
    category: "Pelengkap",
    creator: "Rujwal Pradhan",
    sourceUrl: "https://www.pexels.com/photo/10259873/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "uniform-flatlay": {
    key: "uniform-flatlay",
    path: "/images/hero-uniform-flatlay.jpg",
    title: "Setelan seragam",
    alt: "Blazer motif kotak-kotak, dasi bergaris, kemeja biru, celana, dan sepatu loafer ditata di atas permukaan bergaris.",
    category: "Setelan",
    creator: "Luk Sauvage",
    sourceUrl: "https://www.pexels.com/photo/36910113/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
  "atelier-rail": {
    key: "atelier-rail",
    path: "/images/editorial-atelier-rail.jpg",
    title: "Rel seragam",
    alt: "Sebuah atasan tipis berwarna terang menggantung sendirian di rel hitam dengan gantungan kosong di sampingnya.",
    category: "Referensi",
    creator: "Ivan S",
    sourceUrl: "https://www.pexels.com/photo/7671167/",
    license: PEXELS_LICENSE,
    licenseUrl: PEXELS_LICENSE_URL,
  },
};

export const DEMO_ASSET_LIST = Object.values(DEMO_ASSETS);
