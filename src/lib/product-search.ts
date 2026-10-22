import type { Product } from "../types/product-detail";

export function normalize(value: string): string {
  return value.toLocaleLowerCase("fa-IR").replace(/[يى]/g, "ی").replace(/ك/g, "ک")
    .replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[\s\u200c]+/g, " ").trim();
}

export function productSearchText(product: Product): string {
  return [product.name, product.shortName, ...(product.searchAliases ?? []), product.displayNumber, product.sku,
    ...product.referenceNumbers.map(reference => reference.value),
    product.manufacturer, product.vehicleBrand,
    ...product.compatibleVehicles.flatMap(vehicle => [vehicle.make, vehicle.model])]
    .filter(Boolean).join(" ");
}
