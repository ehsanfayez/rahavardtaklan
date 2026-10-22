import { productFromQuery, validateContactDraft, type ContactDraft, type ContactProductOption } from "../lib/contact-form";

const root = document.querySelector<HTMLElement>("[data-contact-form-root]");
if (root) {
  const products: ContactProductOption[] = JSON.parse(root.dataset.products ?? "[]");
  const form = root.querySelector<HTMLFormElement>("#contact-request-form")!;
  const fields = form.querySelector<HTMLFieldSetElement>("[data-contact-fields]")!;
  const controls = {
    companyName: form.querySelector<HTMLInputElement>("[name=companyName]")!,
    phone: form.querySelector<HTMLInputElement>("[name=phone]")!,
    productSlug: form.querySelector<HTMLSelectElement>("[name=productSlug]")!,
    requestType: form.querySelector<HTMLSelectElement>("[name=requestType]")!,
    message: form.querySelector<HTMLTextAreaElement>("[name=message]")!,
  };
  const selected = root.querySelector<HTMLElement>("[data-contact-selected]")!;
  const picker = root.querySelector<HTMLElement>("[data-contact-product-picker]")!;
  const image = root.querySelector<HTMLImageElement>("[data-contact-selected-image]")!;
  const touched = new Set<keyof ContactDraft>();
  const slugs = products.map(product => product.slug);
  const draft = (): ContactDraft => ({ companyName: controls.companyName.value, phone: controls.phone.value, productSlug: controls.productSlug.value, requestType: controls.requestType.value, message: controls.message.value });

  function showError(key: keyof ContactDraft) {
    const error = validateContactDraft(draft(), slugs).errors[key];
    const message = root!.querySelector<HTMLElement>(`[data-contact-error="${key}"]`)!;
    message.textContent = error ?? "";
    message.hidden = !error;
    controls[key].setAttribute("aria-invalid", error ? "true" : "false");
  }

  function selectProduct(product: ContactProductOption | undefined, updateUrl = true) {
    controls.productSlug.value = product?.slug ?? "";
    selected.hidden = !product;
    picker.hidden = Boolean(product);
    if (product) {
      root!.querySelector<HTMLElement>("[data-contact-selected-name]")!.textContent = product.name;
      root!.querySelector<HTMLElement>("[data-contact-selected-code-row]")!.hidden = !product.sku;
      root!.querySelector<HTMLElement>("[data-contact-selected-code-label]")!.textContent = product.skuKind === "reference-derived-display" ? "کد نمایشی:" : "کد محصول:";
      root!.querySelector<HTMLElement>("[data-contact-selected-code]")!.textContent = product.sku ?? "";
      root!.querySelector<HTMLElement>("[data-contact-selected-status]")!.hidden = product.dataStatus === "approved";
      image.hidden = !product.image;
      if (product.image) { image.src = product.image.src; image.alt = product.image.alt; image.width = product.image.width; image.height = product.image.height; }
    } else { image.removeAttribute("src"); image.alt = ""; }
    if (updateUrl) {
      const url = new URL(location.href);
      url.searchParams.delete("product");
      if (product) url.searchParams.set("product", product.slug);
      if (url.href !== location.href) history.replaceState({}, "", url.pathname + url.search + url.hash);
    }
  }

  // Never submit a native request, even when Enter is used. No storage or API call.
  form.addEventListener("submit", event => {
    event.preventDefault();
    for (const key of Object.keys(controls) as Array<keyof ContactDraft>) { touched.add(key); showError(key); }
  });
  for (const key of Object.keys(controls) as Array<keyof ContactDraft>) {
    controls[key].addEventListener("blur", () => { touched.add(key); showError(key); });
    controls[key].addEventListener("input", () => { if (touched.has(key)) showError(key); });
  }
  controls.productSlug.addEventListener("change", () => {
    const product = products.find(product => product.slug === controls.productSlug.value);
    selectProduct(product);
    if (product) root.querySelector<HTMLButtonElement>("[data-contact-clear-product]")!.focus();
  });
  root.querySelector<HTMLButtonElement>("[data-contact-clear-product]")!.addEventListener("click", () => {
    selectProduct(undefined);
    showError("productSlug");
    controls.productSlug.focus();
  });
  const selectFromUrl = () => selectProduct(productFromQuery(new URL(location.href).searchParams, products));
  window.addEventListener("popstate", selectFromUrl);
  selectFromUrl();
  // Enable only local editing; the submit button remains permanently disabled in this phase.
  fields.disabled = false;
}
