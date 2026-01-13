// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.getElementById("siteNav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));

    // Show/hide nav (CSS mobile uses display:none)
    nav.style.display = isOpen ? "none" : "flex";
  });

  // Optional: close menu when clicking a link (mobile)
  nav.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;

    // If nav is currently open and screen is mobile-ish, close it
    if (window.matchMedia("(max-width: 720px)").matches) {
      navToggle.setAttribute("aria-expanded", "false");
      nav.style.display = "none";
    }
  });

  // Optional: reset nav display when resizing (prevents stuck menu)
  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 721px)").matches) {
      nav.style.display = "flex";
      navToggle.setAttribute("aria-expanded", "false");
    } else {
      nav.style.display = "none";
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
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
