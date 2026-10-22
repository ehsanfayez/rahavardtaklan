import type { ProductDetail } from "../types/product-detail";

// Owner-provided Task 05-R1 fixture for product-1 only, not manufacturer-verified.
export const productDetailDemo: ProductDetail = {
  id: "product-1",
  slug: "product-1",
  displayNumber: "01",
  featured: true,
  shortName: "محصول شماره ۱",
  name: "مجموعه کامل پمپ بنزین برقی داخل باک با شناور و سنسور سطح سوخت",
  category: ["قطعات خودرو", "سیستم سوخت‌رسانی", "پمپ بنزین برقی", "مجموعه پمپ بنزین با درجه باک"],
  sku: "1HM919051M",
  skuKind: "reference-derived-display",
  referenceNumbers: [{ kind: "part-reference", value: "1HM919051M" }],
  manufacturer: "AAZ Preferred Plus",
  vehicleBrand: "Volkswagen",
  images: [1, 2, 3, 4].map(number => ({
    src: `/images/products/fuel-pump-${number}.jpg`,
    alt: `تصویر آزمایشی ${number} برای بررسی گالری؛ تصویر تأییدشده این قطعه نیست`,
    width: 1254,
    height: 1254,
  })),
  description: "مجموعه پمپ بنزین برقی داخل باک AAZ Preferred Plus با شماره فنی 1HM919051M، وظیفه انتقال سوخت از باک به موتور و اندازه‌گیری سطح بنزین را بر عهده دارد. این مجموعه شامل پمپ سوخت و واحد ارسال‌کننده سطح سوخت (شناور و سنسور درجه باک) است و برای برخی خودروهای فولکس‌واگن طراحی شده است. این قطعه برای جایگزینی مجموعه معیوب پمپ بنزین یا سنسور سطح سوخت کاربرد دارد. تطبیق شماره فنی، نوع موتور و مشخصات خودرو پیش از خرید ضروری است.",
  specifications: [
    { key: "part-name", label: "نام قطعه", value: "مجموعه کامل پمپ بنزین برقی داخل باک با شناور و سنسور سطح سوخت", displayOrder: 1 },
    { key: "part-type", label: "نوع قطعه", value: "مجموعه پمپ بنزین برقی داخل باک", displayOrder: 2 },
    { key: "part-reference", label: "شماره مرجع قطعه", value: "1HM919051M", displayOrder: 3 },
    { key: "supplier-brand", label: "برند عرضه‌کننده", value: "AAZ Preferred Plus", displayOrder: 4 },
    { key: "vehicle-brand", label: "برند خودرو", value: "Volkswagen", displayOrder: 5 },
    { key: "assembly-components", label: "اجزای مجموعه", value: "پمپ سوخت، شناور و سنسور سطح سوخت", displayOrder: 6 },
    { key: "installation-location", label: "محل نصب", value: "داخل باک خودرو", displayOrder: 7 },
  ],
  compatibleVehicles: [{ make: "Volkswagen", model: "Golf Mk3", yearFrom: 1995, yearTo: 1999, trims: ["Base", "GL", "GTI", "VR6"], notes: "برخی مدل‌ها" }],
  relatedProductIds: [],
  dataStatus: "ui-demo",
  dataNotice: "این رکورد صرفاً برای تست رابط کاربری است. اطلاعات از کارفرما دریافت شده‌اند و تأیید رسمی سازنده محسوب نمی‌شوند.",
  imageNotice: "تصاویر آزمایشی برای بررسی رابط کاربری؛ ممکن است متعلق به محصولات متفاوت باشند و زوایای همین قطعه نیستند.",
  previewOnly: true,
};
