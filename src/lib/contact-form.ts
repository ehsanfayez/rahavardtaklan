import type { Product, ProductImage } from "../types/product-detail";

// Frontend draft contract. A future endpoint must independently validate and store it.
export const requestTypes = [
  { value: "product-information", label: "دریافت اطلاعات محصول" },
  { value: "availability-cooperation", label: "استعلام موجودی و شرایط همکاری" },
  { value: "technical-consultation", label: "مشاوره فنی" },
  { value: "other", label: "سایر درخواست‌ها" },
] as const;
export type ContactRequestType = typeof requestTypes[number]["value"];
export interface ContactProductOption extends Pick<Product, "slug" | "name" | "sku" | "skuKind" | "dataStatus"> {
  image?: ProductImage;
}
export interface ContactDraft {
  companyName: string;
  phone: string;
  productSlug: string;
  requestType: string;
  message: string;
}
export type ContactErrors = Partial<Record<keyof ContactDraft, string>>;

export function normalizePhone(value: string): string {
  let phone = value.replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)))
    .replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit)))
    .replace(/[\s()\-–—]/g, "");
  if (phone.startsWith("+98")) phone = "0" + phone.slice(3);
  else if (phone.startsWith("0098")) phone = "0" + phone.slice(4);
  else if (phone.startsWith("98") && phone.length === 12) phone = "0" + phone.slice(2);
  return phone;
}

export function validateContactDraft(draft: ContactDraft, allowedSlugs: readonly string[]) {
  const normalized = { ...draft, companyName: draft.companyName.replace(/\s+/g, " ").trim(), phone: normalizePhone(draft.phone), message: draft.message.trim() };
  const errors: ContactErrors = {};
  const length = Array.from(normalized.companyName).length;
  if (length < 2 || length > 120) errors.companyName = "نام شرکت یا فروشگاه باید بین ۲ تا ۱۲۰ کاراکتر باشد.";
  if (!/^09\d{9}$/.test(normalized.phone)) errors.phone = "شماره موبایل معتبر وارد کنید؛ ۱۱ رقم با شروع ۰۹ یا معادل آن با ‎+۹۸.";
  if (normalized.productSlug && !allowedSlugs.includes(normalized.productSlug)) errors.productSlug = "محصول معتبر انتخاب کنید یا درخواست عمومی را انتخاب کنید.";
  if (!requestTypes.some(type => type.value === normalized.requestType)) errors.requestType = "نوع درخواست را از گزینه‌های موجود انتخاب کنید.";
  if (Array.from(draft.message).length > 1000) errors.message = "توضیحات نباید بیشتر از ۱۰۰۰ کاراکتر باشد.";
  return { normalized, errors };
}

export function productFromQuery(params: URLSearchParams, options: readonly ContactProductOption[]): ContactProductOption | undefined {
  const values = params.getAll("product");
  return values.length === 1 ? options.find(product => product.slug === values[0]) : undefined;
}
