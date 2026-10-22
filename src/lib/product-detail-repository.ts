import { products } from "../data/products";
import type { ProductDetail } from "../types/product-detail";
import type { ProductCardView, CatalogProduct, HomeProductView } from "../types/product-views";
import type { ContactProductOption } from "./contact-form";
import { productSearchText } from "./product-search";

/** Local provider boundary. No UI or browser script imports the storage module. */
export function listProductDetails(): ProductDetail[] { return [...products]; }

export function getProductDetailBySlug(slug: string): ProductDetail | undefined {
  return listProductDetails().find(product => product.slug === slug);
}

function cardView(product: ProductDetail): ProductCardView {
  return { id: product.id, slug: product.slug, name: product.name, sku: product.sku,
    skuKind: product.skuKind, dataStatus: product.dataStatus, previewOnly: product.previewOnly, displayNumber: product.displayNumber,
    image: product.images[0], searchText: productSearchText(product) };
}

export function listHomeProducts(): HomeProductView[] {
  return listProductDetails().slice(0, 8).map(product => ({ ...cardView(product), label: product.shortName ?? product.name }));
}

export function listCatalogProducts(): CatalogProduct[] {
  return listProductDetails().map(product => ({ ...cardView(product),
    // Demo reference numbers remain searchable without turning unverified fitments into filter facts.
    filters: product.dataStatus === "approved" ? {
      category: product.category.at(-1),
      compatibility: product.compatibleVehicles.map(vehicle => ({ brand: vehicle.make, model: vehicle.model })),
    } : undefined,
  }));
}

export function listContactProducts(): ContactProductOption[] {
  return listProductDetails().map(product => ({ slug: product.slug, name: product.name, sku: product.sku,
    skuKind: product.skuKind, image: product.images[0], dataStatus: product.dataStatus }));
}

export function getProductRecommendations(product: ProductDetail): { title: string; products: ProductDetail[] } {
  const candidates = listProductDetails().filter(item => item.id !== product.id && !item.previewOnly);
  const related = candidates.filter(item => product.relatedProductIds.includes(item.id)).slice(0, 3);
  return related.length ? { title: "محصولات مرتبط", products: related }
    : { title: "سایر محصولات", products: candidates.slice(0, 3) };
}
