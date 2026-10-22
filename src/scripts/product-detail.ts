document.querySelectorAll<HTMLElement>("[data-product-gallery]").forEach(gallery => {
  const image = gallery.querySelector<HTMLImageElement>("[data-gallery-main]");
  const buttons = [...gallery.querySelectorAll<HTMLButtonElement>("[data-gallery-thumb]")];
  if (!image || buttons.length < 2) return;
  const status = gallery.querySelector<HTMLElement>("[data-gallery-status]");
  let current = 0;
  const number = new Intl.NumberFormat("fa-IR");
  function select(index: number) {
    current = (index + buttons.length) % buttons.length;
    const button = buttons[current];
    image!.src = button.dataset.src!;
    image!.alt = button.dataset.alt!;
    buttons.forEach((item, position) => {
      if (position === current) item.setAttribute("aria-current", "true");
      else item.removeAttribute("aria-current");
    });
    if (status) status.textContent = `تصویر ${number.format(current + 1)} از ${number.format(buttons.length)}`;
  }
  gallery.querySelectorAll<HTMLElement>("[data-gallery-controls],[data-gallery-thumbnails]").forEach(element => element.hidden = false);
  buttons.forEach((button, index) => button.addEventListener("click", () => select(index)));
  gallery.querySelector("[data-gallery-next]")?.addEventListener("click", () => select(current + 1));
  gallery.querySelector("[data-gallery-previous]")?.addEventListener("click", () => select(current - 1));
  gallery.addEventListener("keydown", event => {
    const targets: Record<string, number> = { ArrowLeft: current + 1, ArrowRight: current - 1, Home: 0, End: buttons.length - 1 };
    if (!(event.key in targets)) return;
    event.preventDefault();
    select(targets[event.key]);
    if ((event.target as HTMLElement).matches("[data-gallery-thumb]")) buttons[current].focus();
  });
});

