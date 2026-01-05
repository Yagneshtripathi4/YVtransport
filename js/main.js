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
