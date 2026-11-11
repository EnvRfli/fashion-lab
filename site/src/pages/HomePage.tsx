import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { StageRail } from "../components/StageRail";
import {
  CATEGORIES,
  PRODUCTS,
  formatPrice,
  getCategoryCount,
} from "../data/products";
import { usePageTitle } from "../lib/use-page-title";

const CATEGORY_IMAGES: Record<string, { src: string; alt: string; position: string }> = {
  blazers: {
    src: "/images/product-wool-blazer.jpg",
    alt: "A navy single-breasted blazer on a tailor's mannequin over a stone knit top.",
    position: "50% 34%",
  },
  shirts: {
    src: "/images/product-poplin-shirt.jpg",
    alt: "A white cotton poplin shirt on wooden hangers, held at the collar by a hand.",
    position: "50% 62%",
  },
  knitwear: {
    src: "/images/product-striped-knit.jpg",
    alt: "A folded navy and grey striped knitted crewneck on a pale background.",
    position: "50% 50%",
  },
  "skirts-trousers": {
    src: "/images/product-cotton-skirt.jpg",
    alt: "A cream straight-cut skirt with fine pinstripes, laid flat on white linen.",
    position: "50% 55%",
  },
  accessories: {
    src: "/images/product-leather-loafer.jpg",
    alt: "A pair of black leather penny loafers lit against a dark background.",
    position: "50% 68%",
  },
};

export function HomePage() {
  usePageTitle();
  const essentials = PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="bg-blush">
        <div className="shell grid gap-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-14 lg:py-16">
          <div className="max-w-[36rem]">
            <h1 className="display text-ink">A uniform, considered.</h1>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-[var(--color-text-primary)]">
              Schoolwear essentials laid out plainly: six sample pieces, real
              photographs, and a cart you can try.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link className="btn btn-primary" to="/shop">
                Shop the collection
              </Link>
              <a className="btn btn-secondary" href="#fit-and-care">
                Fit and care
              </a>
            </div>
            <p className="mt-5 text-xs text-[var(--color-text-secondary)]">
              Sample products and prices. No payment is taken.
            </p>
          </div>

          <figure className="hero-figure">
            <img
              src="/images/hero-uniform-flatlay.jpg"
              alt="Flat lay of a checked blazer, striped tie, blue shirt, rust trousers, and brown loafers arranged on a striped cotton surface."
              width={1600}
              height={2133}
              fetchPriority="high"
              loading="eager"
            />
          </figure>
        </div>
      </section>

      <div className="shell">
        <StageRail />
      </div>

      <section className="section">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2 className="heading-2">Shop by layer</h2>
              <p className="section-intro">
                Start with the piece you need, then build the rest of the week
                around it.
              </p>
            </div>
            <Link className="text-link" to="/shop">
              All pieces
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-6 lg:grid-cols-5">
            {CATEGORIES.map((category) => {
              const image = CATEGORY_IMAGES[category.id];
              const count = getCategoryCount(category.id);
              return (
                <li key={category.id}>
                  <Link
                    to={`/shop?category=${category.id}`}
                    className="category-tile group"
                  >
                    <div className="category-media">
                      <img
                        src={image.src}
                        alt={image.alt}
                        width={1600}
                        height={2133}
                        loading="lazy"
                        style={{ objectPosition: image.position }}
                      />
                    </div>
                    <div className="mt-3 flex items-baseline justify-between gap-2 border-b border-line pb-2">
                      <span className="text-sm font-medium text-ink group-hover:text-[var(--color-text-accent)]">
                        {category.shortLabel}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {count} {count === 1 ? "piece" : "pieces"}
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section border-t border-line">
        <div className="shell">
          <div className="section-heading">
            <div>
              <h2 className="heading-2">Term essentials</h2>
              <p className="section-intro">
                Four pieces that cover most of the school week. The full
                collection is six.
              </p>
            </div>
            <Link className="text-link" to="/shop">
              See all six
            </Link>
          </div>

          <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {essentials.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          <p className="mt-8 text-xs text-[var(--color-text-secondary)]">
            Sample prices from{" "}
            {formatPrice(Math.min(...PRODUCTS.map((product) => product.price)))}.
            Product names and descriptions are illustrative.
          </p>
        </div>
      </section>

      <section id="fit-and-care" className="section border-t border-line">
        <div className="shell grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <figure className="overflow-hidden rounded-[var(--radius-lg)]">
            <img
              src="/images/editorial-atelier-rail.jpg"
              alt="A pale stone overshirt hanging alone on a black rail against a plaster wall, with empty hangers beside it."
              width={1600}
              height={1067}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </figure>

          <div>
            <h2 className="heading-2">Fit, care, and the school gate</h2>
            <p className="mt-4 max-w-[52ch] text-[var(--color-text-secondary)]">
              A uniform has to survive a full term, not a single photograph.
              These are practical starting points, not school rules.
            </p>

            <div className="mt-8 space-y-6">
              <div className="border-t border-line pt-5">
                <h3 className="font-display text-xl text-ink">
                  Start with the list
                </h3>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Every school publishes its own requirements. Use this shop as a
                  sample catalogue, not as a uniform policy.
                </p>
              </div>
              <div className="border-t border-line pt-5">
                <h3 className="font-display text-xl text-ink">
                  Measure before you buy
                </h3>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Take measurements at the start of term and leave a little room
                  to grow. The size labels here are illustrative.
                </p>
              </div>
              <div className="border-t border-line pt-5">
                <h3 className="font-display text-xl text-ink">
                  Care for the everyday
                </h3>
                <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  Follow the care label, wash dark colours together, and keep a
                  spare shirt for the days that need one.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
