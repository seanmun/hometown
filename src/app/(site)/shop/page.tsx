/* ============================================================
   Shop — brand merch. Products live in src/data/products.ts;
   page copy in src/data/pages.ts. Each Buy button links to an
   external checkout, so there's no payment code to maintain.
   ============================================================ */

import type { Metadata } from "next";
import { getProducts } from "@/lib/content";
import { shop } from "@/data/pages";
import ProductCard from "@/components/ProductCard";
import NewsletterBar from "@/components/NewsletterBar";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: shop.title,
  description: shop.description,
};

export const revalidate = 60;

export default async function ShopPage() {
  const products = await getProducts();
  return (
    <>
      <section className="px-4 py-16 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-display-lg">{shop.heading}</h1>
            <p className="mx-auto mt-4 max-w-xl text-body-lg text-ink-soft">
              {shop.sub}
            </p>
          </div>

          {products.length > 0 ? (
            <Reveal>
              <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>
              {shop.note && (
                <p className="mx-auto mt-8 max-w-xl text-center text-xs text-ink-soft italic">
                  {shop.note}
                </p>
              )}
            </Reveal>
          ) : (
            <p className="mx-auto mt-14 max-w-md text-center text-body-lg text-ink-soft">
              {shop.empty}
            </p>
          )}
        </div>
      </section>

      <NewsletterBar />
    </>
  );
}
