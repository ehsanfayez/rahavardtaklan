import type { Product, ProductImage } from "./product-detail";

/** Minimal read models; all values are projected from the canonical Product record. */
export interface ProductCardView extends Pick<Product, "id" | "slug" | "name" | "sku" | "skuKind" | "dataStatus" | "displayNumber" | "previewOnly"> {
  image?: ProductImage;
  searchText: string;
}
export interface CatalogProduct extends ProductCardView {
  filters?: {
    category?: string;
    compatibility: Array<{ brand: string; model: string }>;
    compatibilitySummary?: string;
  };
}
export interface HomeProductView extends ProductCardView {
  /** Compact existing homepage label; canonical name remains available for links/search. */
  label: string;
}
