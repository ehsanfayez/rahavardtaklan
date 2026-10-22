export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
export interface ProductSpecification {
  key: string;
  label: string;
  value: string;
  unit?: string;
  displayOrder?: number;
}
export interface CompatibleVehicle {
  make: string;
  model: string;
  yearFrom?: number;
  yearTo?: number;
  trims?: string[];
  engine?: string;
  notes?: string;
}
/** Canonical product contract. Internal identity is independent of the public slug. */
export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string[];
  sku?: string;
  skuKind?: "internal" | "reference-derived-display";
  referenceNumbers: Array<{ kind: "part-reference" | "manufacturer" | "oem"; value: string }>;
  manufacturer?: string;
  vehicleBrand?: string;
  images: ProductImage[];
  description: string;
  specifications: ProductSpecification[];
  compatibleVehicles: CompatibleVehicle[];
  relatedProductIds: string[];
  dataStatus: "ui-demo" | "unverified" | "approved";
  dataNotice?: string;
  imageNotice?: string;
  previewOnly?: boolean;
  displayNumber: string;
  featured?: boolean;
  shortName?: string;
  searchAliases?: string[];
}

// Retained for existing detail components; this is the same contract, not a second model.
export type ProductDetail = Product;
