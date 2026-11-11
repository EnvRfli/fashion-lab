import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";
import { QuantityStepper } from "../components/QuantityStepper";
import { formatPrice, getProduct } from "../data/products";
import { usePageTitle } from "../lib/use-page-title";

export function CartPage() {
  usePageTitle("Your bag");
  const { lines, count, subtotal, updateQuantity, removeItem } = useCart();
  const [status, setStatus] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  const handleRemove = (slug: string, size: string, name: string) => {
    removeItem(slug, size);
    setStatus(`Removed ${name}, size ${size}, from your bag.`);
  };

  return (
    <div className="section">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="heading-1">Your bag</h1>
            <p className="mt-2 text-[var(--color-text-secondary)]">
              {count === 0
                ? "Nothing in the bag yet."
                : `${count} ${count === 1 ? "piece" : "pieces"}, sample prices`}
            </p>
          </div>
          <Link className="text-link" to="/shop">
            Continue shopping
          </Link>
        </div>

        <p className="mt-4 max-w-[62ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
          This is a local demonstration bag. No payment is taken and no order is
          placed.
        </p>

        {lines.length === 0 ? (
          <div className="empty-state mt-10">
            <h2 className="font-display text-2xl text-ink">
              Your bag is empty.
            </h2>
            <p className="mt-3 max-w-[42ch] text-sm leading-relaxed text-[var(--color-text-secondary)]">
              Add a piece from the collection and it will appear here.
            </p>
            <Link className="btn btn-primary mt-6" to="/shop">
              Browse the collection
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_22rem] lg:items-start">
            <div>
              <ul className="border-t border-line">
                {lines.map((line) => {
                  const product = getProduct(line.slug);
                  if (!product) return null;
                  return (
                    <li
                      key={`${line.slug}-${line.size}`}
                      className="cart-line grid grid-cols-[5rem_1fr] gap-4 border-b border-line py-5 sm:grid-cols-[6rem_1fr_auto]"
                    >
                      <Link
                        to={`/shop/${product.slug}`}
                        className="cart-thumb"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <img
                          src={product.image}
                          alt=""
                          width={product.imageWidth}
                          height={product.imageHeight}
                          loading="lazy"
                          style={{ objectPosition: product.imagePosition }}
                        />
                      </Link>

                      <div>
                        <p className="text-xs font-medium text-[var(--color-text-secondary)]">
                          {product.categoryLabel}
                        </p>
                        <h2 className="mt-1 font-display text-xl text-ink">
                          <Link
                            className="hover:text-[var(--color-text-accent)]"
                            to={`/shop/${product.slug}`}
                          >
                            {product.name}
                          </Link>
                        </h2>
                        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
                          Size {line.size}, {formatPrice(product.price)} each,
                          sample price
                        </p>
                        <div className="mt-3 flex flex-wrap items-center gap-4">
                          <QuantityStepper
                            value={line.quantity}
                            min={1}
                            max={10}
                            onChange={(next) =>
                              updateQuantity(line.slug, line.size, next)
                            }
                            label={`${product.name}, size ${line.size}`}
                          />
                          <button
                            type="button"
                            className="text-button text-[var(--color-text-error)]"
                            onClick={() =>
                              handleRemove(line.slug, line.size, product.name)
                            }
                            aria-label={`Remove ${product.name}, size ${line.size}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      <p className="col-start-2 mt-2 font-medium text-ink sm:col-start-3 sm:mt-1 sm:text-right">
                        {formatPrice(product.price * line.quantity)}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <p
                className="mt-4 min-h-5 text-sm text-[var(--color-text-success)]"
                role="status"
                aria-live="polite"
              >
                {status}
              </p>
            </div>

            <aside
              className="bag-summary"
              aria-labelledby="bag-summary-heading"
            >
              <h2
                id="bag-summary-heading"
                className="font-display text-2xl text-ink"
              >
                Summary
              </h2>
              <div className="mt-5 flex items-baseline justify-between border-y border-line py-4">
                <span className="text-sm font-medium text-ink">Subtotal</span>
                <span
                  className="font-display text-2xl text-ink"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {formatPrice(subtotal)}
                </span>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-[var(--color-text-secondary)]">
                Sample prices. Delivery, taxes, and payment are not calculated
                in this demonstration.
              </p>
              <button
                type="button"
                className="btn btn-primary mt-5 w-full"
                onClick={openDialog}
              >
                Review demo checkout
              </button>
              <Link
                className="btn btn-secondary mt-3 w-full"
                to="/shop"
              >
                Continue shopping
              </Link>
            </aside>
          </div>
        )}

        <dialog
          ref={dialogRef}
          className="demo-dialog"
          aria-labelledby="demo-checkout-title"
          onClick={(event) => {
            if (event.target === dialogRef.current) closeDialog();
          }}
        >
          <div className="p-6 sm:p-8">
            <p className="text-sm font-medium text-[var(--color-semantic-warning)]">
              Demonstration
            </p>
            <h2
              id="demo-checkout-title"
              className="mt-2 font-display text-2xl text-ink"
            >
              This is where a real checkout would begin.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-secondary)]">
              This demonstration does not take payment, collect an address, or
              place an order. The bag stays on this device.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={closeDialog}
              >
                Back to bag
              </button>
              <Link className="btn btn-secondary" to="/shop">
                Keep browsing
              </Link>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
}
