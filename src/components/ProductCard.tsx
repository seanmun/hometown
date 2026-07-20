/* ============================================================
   ProductCard — one shop product. Photo, name, price, blurb,
   and a Buy button that links to the external checkout
   (Stripe Payment Link, Printful, Etsy…). Products without a
   buyUrl show "Coming Soon"; soldOut shows "Sold Out".
   ============================================================ */

import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import type { Product } from "@/data/products";
import { shop } from "@/data/pages";
import Card from "./Card";

export default function ProductCard({ product }: { product: Product }) {
  const buyable = product.buyUrl !== "" && !product.soldOut;

  return (
    <Card hover className="flex h-full flex-col overflow-hidden">
      <div className="relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {product.soldOut && (
          <span className="absolute top-3 left-3 rounded-full bg-forest-dark/90 px-3 py-1 text-xs font-semibold text-cream">
            {shop.soldOutLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">{product.name}</h3>
          <p className="shrink-0 text-sm font-semibold text-primary">
            {product.price}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>

        <div className="mt-auto pt-4">
          {buyable ? (
            <a
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-button bg-primary px-5 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-primary-hover"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {shop.buyLabel}
            </a>
          ) : (
            <span className="inline-flex cursor-default items-center gap-2 rounded-button border border-sand px-5 py-2.5 text-sm font-semibold text-ink-soft">
              {product.soldOut ? shop.soldOutLabel : shop.comingSoonLabel}
            </span>
          )}
        </div>
      </div>
    </Card>
  );
}
