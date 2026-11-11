import { useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { ProductCard } from "../components/ProductCard";
import { QuantityStepper } from "../components/QuantityStepper";
import { PRODUCTS, formatPrice, getProduct, getStagesLabel } from "../data/products";
import { usePageTitle } from "../lib/use-page-title";
import { NotFoundPage } from "./NotFoundPage";

export function ProductPage() {
  const { slug } = useParams();
  const product = getProduct(slug);
  usePageTitle(product ? product.name : "Page not found");
  const { addItem } = useCart();
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const sizeFieldsetRef = useRef<HTMLFieldSetElement>(null);

  if (!product) {
    return <NotFoundPage />;
  }

  const related = PRODUCTS.filter((item) => item.slug !== product.slug).slice(
    0,
    3,
  );

  const handleAdd = () => {
    if (!size) {
      setError("Choose a size before adding to the bag.");
      setStatus("");
      const firstSize =
        sizeFieldsetRef.current?.querySelector<HTMLInputElement>(
          'input[type="radio"]',
        );
      firstSize?.focus();
      return;
    }
    setError("");
    addItem(product.slug, size, quantity);
    setStatus(
      `Added ${product.name}, size ${size}, to your bag. Quantity ${quantity}.`,
    );
  };

  return (
    <div className="section">
      <div className="shell">
        <nav aria-label="Breadcrumb" className="mb-7">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--color-text-secondary)]">
            <li>
              <Link className="text-link" to="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="text-link" to="/shop">
                Shop
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                className="text-link"
                to={`/shop?category=${product.category}`}
              >
                {product.categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-ink">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
          <figure className="product-detail-media">
            <img
              src={product.image}
              alt={product.imageAlt}
              width={product.imageWidth}
              height={product.imageHeight}
              fetchPriority="high"
              style={{ objectPosition: product.imagePosition }}
            />
          </figure>

          <div className="max-w-[34rem] lg:pt-4">
            <p className="text-sm font-medium text-[var(--color-text-accent)]">
              {product.categoryLabel}
            </p>
            <h1 className="heading-1 mt-2">{product.name}</h1>
            <p className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="text-xs font-medium text-[var(--color-semantic-warning)]">
                Sample price
              </span>
            </p>
            <p className="mt-5 max-w-[54ch] leading-relaxed text-[var(--color-text-secondary)]">
              {product.description}
            </p>

            <fieldset
              ref={sizeFieldsetRef}
              className="mt-8"
              aria-describedby={error ? "size-error" : undefined}
            >
              <legend className="text-sm font-medium text-ink">
                Size
                <span className="ml-2 font-normal text-[var(--color-text-secondary)]">
                  Sample size range
                </span>
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {product.sizes.map((option, index) => (
                  <label key={option} className="size-option">
                    <input
                      type="radio"
                      name={`size-${product.slug}`}
                      value={option}
                      checked={size === option}
                      onChange={() => {
                        setSize(option);
                        setError("");
                      }}
                      className="sr-only"
                      id={`size-${product.slug}-${index}`}
                    />
                    {option}
                  </label>
                ))}
              </div>
              {error && (
                <p id="size-error" role="alert" className="form-error mt-3">
                  {error}
                </p>
              )}
            </fieldset>

            <div className="mt-7 flex flex-wrap items-end gap-3">
              <div>
                <p className="mb-2 text-sm font-medium text-ink">Quantity</p>
                <QuantityStepper
                  value={quantity}
                  min={1}
                  max={10}
                  onChange={setQuantity}
                  label={product.name}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary min-w-[12rem] flex-1 sm:flex-none"
                onClick={handleAdd}
              >
                Add to bag
              </button>
            </div>

            <p
              className="mt-4 text-sm text-[var(--color-text-success)]"
              role="status"
              aria-live="polite"
            >
              {status}
            </p>
            <p className="mt-2 text-xs leading-relaxed text-[var(--color-text-secondary)]">
              Demonstration only — no payment is taken and no order is placed.
            </p>

            <div className="mt-8 border-t border-line">
              <details className="disclosure">
                <summary>Details and care</summary>
                <dl className="space-y-3 pb-5 text-sm">
                  <div>
                    <dt className="font-medium text-ink">Fit</dt>
                    <dd className="text-[var(--color-text-secondary)]">
                      {product.fit}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">Fabric</dt>
                    <dd className="text-[var(--color-text-secondary)]">
                      {product.fabric}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-ink">Care</dt>
                    <dd className="text-[var(--color-text-secondary)]">
                      {product.care}
                    </dd>
                  </div>
                </dl>
              </details>

              <details className="disclosure border-t border-line">
                <summary>Size guide (sample)</summary>
                <div className="pb-5 text-sm leading-relaxed text-[var(--color-text-secondary)]">
                  <p>
                    This is a demonstration size range, not a school uniform
                    policy. Sizes are shown by age or UK shoe size and are
                    illustrative.
                  </p>
                  <p className="mt-3">
                    Before ordering from a real outfitter, measure the wearer
                    and check the school&rsquo;s own supplier guidance. If a
                    measurement falls between two sizes, choose the larger one
                    for room to grow.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>

        <section className="mt-16 border-t border-line pt-10 lg:mt-24">
          <div className="section-heading">
            <h2 className="heading-2">Goes with</h2>
            <Link className="text-link" to="/shop">
              All pieces
            </Link>
          </div>
          <div className="mt-7 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>

        <p className="mt-10 text-xs text-[var(--color-text-secondary)]">
          Stages: {getStagesLabel(product.stages)}. Product copy, sizes, and
          prices are sample content.
        </p>
      </div>
    </div>
  );
}
