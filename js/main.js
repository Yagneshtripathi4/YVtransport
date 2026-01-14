// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* =========================
   Mobile nav toggle (polished)
   - No desktop changes
   - Better mobile UX: outside tap, ESC close, scroll lock
   ========================= */
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("siteNav");
const mobileMQ = window.matchMedia("(max-width: 720px)");

function setMobileMenu(open) {
  if (!navToggle || !nav) return;

  // Only manage open/close behavior on mobile
  if (!mobileMQ.matches) {
    nav.style.display = ""; // let CSS handle desktop
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open menu");
    document.body.style.overflow = ""; // ensure unlocked
    return;
  }

  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  nav.style.display = open ? "flex" : "none";

  // Premium feel: prevent background scroll when menu is open
  document.body.style.overflow = open ? "hidden" : "";
}

function isMenuOpen() {
  return navToggle?.getAttribute("aria-expanded") === "true";
}

if (navToggle && nav) {
  // Ensure correct initial state
  setMobileMenu(false);

  navToggle.addEventListener("click", () => {
    const open = !isMenuOpen();
    setMobileMenu(open);
  });

  // Close menu when clicking a link (mobile)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    if (mobileMQ.matches) setMobileMenu(false);
  });

  // Close when tapping outside (mobile)
  document.addEventListener("click", (e) => {
    if (!mobileMQ.matches) return;
    if (!isMenuOpen()) return;

    const clickedInsideNav = nav.contains(e.target);
    const clickedToggle = navToggle.contains(e.target);
    if (!clickedInsideNav && !clickedToggle) setMobileMenu(false);
  });

  // Close on Escape key (mobile)
  document.addEventListener("keydown", (e) => {
    if (!mobileMQ.matches) return;
    if (e.key === "Escape" && isMenuOpen()) setMobileMenu(false);
  });

  // Keep nav state correct on resize / orientation change
  window.addEventListener("resize", () => {
    // If switching to desktop, release inline styles & scroll lock
    if (!mobileMQ.matches) setMobileMenu(false);
    else setMobileMenu(false); // keep closed on mobile resize too (prevents weird stuck states)
  });

  // Also react immediately when media query changes
  if (typeof mobileMQ.addEventListener === "function") {
    mobileMQ.addEventListener("change", () => setMobileMenu(false));
  } else if (typeof mobileMQ.addListener === "function") {
    // older browsers fallback
    mobileMQ.addListener(() => setMobileMenu(false));
  }
}

/* =========================
   WhatsApp Quote Form Submit
   ========================= */
const YV_WHATSAPP_NUMBER = "917977541406"; // 7977541406 with India code (no +, no spaces)

function yvBuildQuoteTextFromForm(form) {
  const get = (fieldName) => (form.elements[fieldName]?.value || "").trim();

  const name = get("name");
  const phone = get("phone");
  const material = get("material");
  const pickup = get("pickup");
  const drop = get("drop");
  const load = get("load");
  const message = get("message");

  const lines = [
    "YV Transport - Quote Request",
    name ? `Name: ${name}` : null,
    phone ? `Phone: ${phone}` : null,
    material ? `Material Type: ${material}` : null,
    pickup ? `Pickup Location: ${pickup}` : null,
    drop ? `Drop Location: ${drop}` : null,
    load ? `Load Details: ${load}` : null,
    message ? `Message: ${message}` : null,
  ].filter(Boolean);

  return lines.join("\n");
}

window.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("quoteForm");
  if (!form) return;

  // avoid double-binding if script is loaded twice
  if (form.dataset.yvWhatsappBound === "true") return;
  form.dataset.yvWhatsappBound = "true";

  // Use CAPTURE + stopImmediatePropagation so the inline script in contact.html
  // doesn't prevent/reset before we grab values.
  form.addEventListener(
    "submit",
    (e) => {
      e.preventDefault();
      e.stopImmediatePropagation();

      const text = yvBuildQuoteTextFromForm(form);
      const url = `https://wa.me/${YV_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank");
    },
    true
  );
});
