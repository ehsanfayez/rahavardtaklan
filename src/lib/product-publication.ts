import type { Product } from "../types/product-detail";

/** SEO eligibility only. This does not grant access or approve product data. */
export function isProductIndexable(product: Pick<Product, "dataStatus" | "previewOnly">): boolean {
  return product.dataStatus === "approved" && product.previewOnly !== true;
}
