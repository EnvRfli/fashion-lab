import { Link } from "react-router-dom";
import {
  formatPrice,
  getStagesLabel,
  type Product,
} from "../data/products";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  return (
    <article className="product-card">
      <Link to={`/shop/${product.slug}`} className="product-card-link">
        <div className="product-media">
          <img
            src={product.image}
            alt={product.imageAlt}
            width={product.imageWidth}
            height={product.imageHeight}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            style={{ objectPosition: product.imagePosition }}
          />
        </div>
        <div className="product-card-body">
          <p className="product-kicker">{product.categoryLabel}</p>
          <h3 className="product-title">{product.name}</h3>
          <p className="product-stages">{getStagesLabel(product.stages)}</p>
          <p className="product-price">
            {formatPrice(product.price)}
            <span>Sample price</span>
          </p>
        </div>
      </Link>
    </article>
  );
}
