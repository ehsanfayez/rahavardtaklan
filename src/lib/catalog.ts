import type { CatalogProduct } from "../types/product-views";
import { normalize } from "./product-search";
export type { CatalogProduct } from "../types/product-views";
export { normalize } from "./product-search";

export type CatalogSort = "title-asc" | "title-desc" | "sku";
export interface CatalogState {
  q: string;
  category: string;
  brand: string;
  model: string;
  sort: CatalogSort;
  page: number;
}
export const PAGE_SIZE = 9;
const collator = new Intl.Collator("fa", { numeric: true, sensitivity: "base" });

export function details(product: CatalogProduct) {
  return product.dataStatus === "approved" ? product.filters : undefined;
}

export function filterAndSort(records: CatalogProduct[], state: CatalogState): CatalogProduct[] {
  const query = normalize(state.q);
  return records.filter(product => {
    const data = details(product);
    const fitments = data?.compatibility ?? [];
    return normalize(product.searchText).includes(query)
      && (!state.category || data?.category === state.category)
      && ((!state.brand && !state.model) || fitments.some(item =>
        (!state.brand || item.brand === state.brand) && (!state.model || item.model === state.model)));
  }).sort((a, b) => {
    if (state.sort === "sku") {
      const first = a.sku;
      const second = b.sku;
      if (!first || !second) return first ? -1 : second ? 1 : collator.compare(a.name, b.name);
      return collator.compare(first, second) || collator.compare(a.slug, b.slug);
    }
    return (state.sort === "title-desc" ? -1 : 1) * collator.compare(a.name, b.name)
      || collator.compare(a.slug, b.slug);
  });
}

export function options(records: CatalogProduct[], brand = "") {
  const approved = records.flatMap(product => details(product) ?? []);
  const fitments = approved.flatMap(data => data.compatibility ?? []);
  const unique = (values: Array<string | undefined>) => [...new Set(values.filter((value): value is string => Boolean(value?.trim())))].sort(collator.compare);
  return {
    categories: unique(approved.map(data => data.category)),
    brands: unique(fitments.map(item => item.brand)),
    models: unique(fitments.filter(item => !brand || item.brand === brand).map(item => item.model)),
    hasSku: records.some(product => Boolean(product.sku?.trim())),
  };
}

export function readState(url: URL, records: CatalogProduct[], initialPage = 1): CatalogState {
  const params = url.searchParams;
  const available = options(records);
  const brand = available.brands.includes(params.get("brand") ?? "") ? params.get("brand")! : "";
  const models = options(records, brand).models;
  const sort = params.get("sort");
  const page = params.get("page");
  return {
    q: (params.get("q") ?? "").slice(0, 120),
    category: available.categories.includes(params.get("category") ?? "") ? params.get("category")! : "",
    brand,
    model: models.includes(params.get("model") ?? "") ? params.get("model")! : "",
    sort: sort === "title-desc" || (sort === "sku" && available.hasSku) ? sort : "title-asc",
    page: page && /^[1-9]\d*$/.test(page) ? Math.min(Number(page), Number.MAX_SAFE_INTEGER) : initialPage,
  };
}

export function catalogHref(state: CatalogState): string {
  const params = new URLSearchParams();
  for (const key of ["q", "category", "brand", "model"] as const) if (state[key]) params.set(key, state[key]);
  if (state.sort !== "title-asc") params.set("sort", state.sort);
  if (state.page > 1) params.set("page", String(state.page));
  return `/products/${params.size ? `?${params}` : ""}`;
}

export function staticPageHref(page: number): string {
  return page === 1 ? "/products/" : `/products/page/${page}/`;
}
