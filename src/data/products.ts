import type { Product } from "../types/product-detail";
import { productDetailDemo } from "./product-detail-demo";

// Explicit identities and URLs survive insertion, deletion and reordering of this array.
// This helper supplies only the existing empty/demo defaults, never technical claims.
function demoProduct(record: { id: string; slug: string; name: string; displayNumber: string; image: string; featured?: boolean }): Product {
  return {
    id: record.id, slug: record.slug, name: record.name, displayNumber: record.displayNumber,
    featured: record.featured,
    category: [], referenceNumbers: [],
    images: [{ src: record.image, alt: `تصویر نمایشی ${record.name}؛ تأییدنشده برای انتشار`, width: 1254, height: 1254 }],
    description: "برای دریافت کد فنی، مشخصات، خودروهای سازگار و اطلاعات موجودی این محصول، با واحد فروش تماس بگیرید.",
    specifications: [], compatibleVehicles: [], relatedProductIds: [], dataStatus: "ui-demo",
    dataNotice: "این محصول و تصویر آن نمایشی و تأییدنشده برای انتشار هستند.",
    imageNotice: "تصاویر آزمایشی برای بررسی رابط کاربری",
  };
}

export const products: Product[] = [
  productDetailDemo,
  demoProduct({ id: "product-2", slug: "product-2", name: "محصول شماره ۲", displayNumber: "02", image: "/images/products/fuel-pump-2.jpg", featured: true }),
  demoProduct({ id: "product-3", slug: "product-3", name: "محصول شماره ۳", displayNumber: "03", image: "/images/products/fuel-pump-3.jpg", featured: true }),
  demoProduct({ id: "product-4", slug: "product-4", name: "محصول شماره ۴", displayNumber: "04", image: "/images/products/fuel-pump-4.jpg" }),
  demoProduct({ id: "product-5", slug: "product-5", name: "محصول شماره ۵", displayNumber: "05", image: "/images/products/fuel-pump-5.jpg" }),
  demoProduct({ id: "product-6", slug: "product-6", name: "محصول شماره ۶", displayNumber: "06", image: "/images/products/fuel-pump-6.jpg" }),
  demoProduct({ id: "product-7", slug: "product-7", name: "محصول شماره ۷", displayNumber: "07", image: "/images/products/fuel-pump-7.jpg" }),
  demoProduct({ id: "product-8", slug: "product-8", name: "محصول شماره ۸", displayNumber: "08", image: "/images/products/fuel-pump-8.jpg" }),
  demoProduct({ id: "product-9", slug: "product-9", name: "محصول شماره ۹", displayNumber: "09", image: "/images/products/fuel-pump-9.jpg" }),
  demoProduct({ id: "product-10", slug: "product-10", name: "محصول شماره ۱۰", displayNumber: "10", image: "/images/products/fuel-pump-10.jpg" }),
  demoProduct({ id: "product-11", slug: "product-11", name: "محصول شماره ۱۱", displayNumber: "11", image: "/images/products/fuel-pump-11.jpg" }),
];
