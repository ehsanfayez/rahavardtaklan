import type { CatalogProduct } from "../types/product-views";
import { PAGE_SIZE, catalogHref, filterAndSort, options, readState, staticPageHref, type CatalogSort } from "../lib/catalog";

const root = document.querySelector<HTMLElement>("[data-catalog-page]");
if (root) {
  const products: CatalogProduct[] = JSON.parse(root.dataset.catalogProducts ?? "[]");
  const form = document.querySelector<HTMLFormElement>("#catalog-filters")!;
  const search = form.querySelector<HTMLInputElement>("[name=q]")!;
  const category = form.querySelector<HTMLSelectElement>("[name=category]")!;
  const brand = form.querySelector<HTMLSelectElement>("[name=brand]")!;
  const model = form.querySelector<HTMLSelectElement>("[name=model]")!;
  const sort = document.querySelector<HTMLSelectElement>("#catalog-sort")!;
  const headerSearch = document.querySelector<HTMLInputElement>("#featured-product-search");
  const grid = document.querySelector<HTMLElement>("#catalog-grid")!;
  const pagination = document.querySelector<HTMLElement>("#catalog-pagination")!;
  const count = document.querySelector<HTMLElement>("#catalog-count")!;
  const empty = document.querySelector<HTMLElement>("#catalog-empty")!;
  const cards = new Map([...grid.querySelectorAll<HTMLElement>("[data-catalog-card]")].map(card => [card.dataset.catalogCard!, card]));
  const number = new Intl.NumberFormat("fa-IR");
  const initialPage = Number(root.dataset.catalogPage) || 1;
  let state = readState(new URL(location.href), products, initialPage);

  function syncControls() {
    search.value = state.q;
    if (headerSearch) headerSearch.value = state.q;
    category.value = state.category;
    brand.value = state.brand;
    const models = options(products, state.brand).models;
    model.replaceChildren(new Option(models.length ? "همه مدل‌ها" : "داده تأییدشده موجود نیست", ""), ...models.map(value => new Option(value, value)));
    model.disabled = !models.length;
    model.value = state.model;
    sort.value = state.sort;
  }

  function render(write: "push" | "replace" | false = false) {
    const results = filterAndSort(products, state);
    const pages = Math.max(1, Math.ceil(results.length / PAGE_SIZE));
    state.page = Math.max(1, Math.min(state.page, pages));
    const visible = new Set(results.slice((state.page - 1) * PAGE_SIZE, state.page * PAGE_SIZE).map(product => product.slug));
    for (const card of cards.values()) card.hidden = !visible.has(card.dataset.catalogCard!);
    for (const product of results) grid.append(cards.get(product.slug)!);
    count.textContent = `نمایش ${number.format(visible.size)} محصول از ${number.format(results.length)} محصول`;
    empty.hidden = results.length !== 0;
    pagination.hidden = results.length === 0;
    const filtered = state.q || state.category || state.brand || state.model || state.sort !== "title-asc";
    const nodes: HTMLAnchorElement[] = [];
    function pageLink(page: number, label: string, text: string, disabled = false) {
      const link = document.createElement("a");
      link.className = "catalog-page-link";
      link.textContent = text;
      link.setAttribute("aria-label", label);
      if (disabled) link.setAttribute("aria-disabled", "true");
      else {
        link.href = filtered ? catalogHref({ ...state, page }) : staticPageHref(page);
        link.dataset.catalogTargetPage = String(page);
      }
      return link;
    }
    nodes.push(pageLink(state.page - 1, "صفحه قبلی", "→", state.page === 1));
    for (let page = 1; page <= pages; page++) {
      const link = pageLink(page, `صفحه ${number.format(page)}`, number.format(page));
      if (page === state.page) link.setAttribute("aria-current", "page");
      nodes.push(link);
    }
    nodes.push(pageLink(state.page + 1, "صفحه بعدی", "←", state.page === pages));
    pagination.replaceChildren(...nodes);
    syncControls();
    if (write) {
      const url = catalogHref(state);
      if (url !== location.pathname + location.search) history[write === "push" ? "pushState" : "replaceState"]({}, "", url);
    }
  }

  form.addEventListener("submit", event => {
    event.preventDefault();
    state = { q: search.value.slice(0, 120), category: category.value, brand: brand.value, model: model.value, sort: sort.value as CatalogSort, page: 1 };
    render("push");
  });
  brand.addEventListener("change", () => {
    const models = options(products, brand.value).models;
    model.replaceChildren(new Option(models.length ? "همه مدل‌ها" : "داده تأییدشده موجود نیست", ""), ...models.map(value => new Option(value, value)));
    model.disabled = !models.length;
  });
  sort.addEventListener("change", () => { state.sort = sort.value as CatalogSort; state.page = 1; render("push"); });
  headerSearch?.closest("form")?.addEventListener("submit", event => {
    event.preventDefault(); state.q = headerSearch.value.slice(0, 120); state.page = 1; render("push");
  });
  root.querySelectorAll<HTMLAnchorElement>("[data-catalog-reset]").forEach(link => link.addEventListener("click", event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    state = { q: "", category: "", brand: "", model: "", sort: "title-asc", page: 1 };
    render("push");
  }));
  pagination.addEventListener("click", event => {
    if (!(event instanceof MouseEvent) || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[data-catalog-target-page]");
    if (!link) return;
    event.preventDefault();
    state.page = Number(link.dataset.catalogTargetPage);
    render("push");
    count.scrollIntoView({ block: "start", behavior: "instant" });
    // Keep keyboard focus on the corresponding replacement pagination control.
    pagination.querySelector<HTMLAnchorElement>(`[aria-current="page"]`)?.focus({ preventScroll: true });
  });
  window.addEventListener("popstate", () => {
    const pathPage = location.pathname.match(/^\/products\/page\/(\d+)\/?$/);
    state = readState(new URL(location.href), products, pathPage ? Number(pathPage[1]) : 1);
    render();
  });

  const filters = root.querySelector<HTMLDetailsElement>(".catalog-filters")!;
  const desktop = matchMedia("(min-width: 1024px)");
  function setFilterMode() {
    if (!desktop.matches && filters.contains(document.activeElement)) return;
    filters.open = desktop.matches;
    filters.querySelector("summary")?.setAttribute("tabindex", desktop.matches ? "-1" : "0");
  }
  desktop.addEventListener("change", setFilterMode);
  setFilterMode();
  render("replace");
}
