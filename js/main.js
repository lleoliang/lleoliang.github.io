/* project0/js/main.js
   Small, visible interactions:
   - Marks active nav link (aria-current)
   - Shows/hides "Back to top" button
   - Projects section/page: filter project cards by tag
   - Contact page: simple client-side validation + "message sent" demo (no backend)
   - Footer year auto-updates
   - Music prompt generator (if present)
*/

function $(sel, root = document) {
  return root.querySelector(sel);
}
function $all(sel, root = document) {
  return Array.from(root.querySelectorAll(sel));
}

/* Highlights the active nav link.
   Works for:
   - index.html with section hashes (index.html#about, index.html#projects, index.html#music)
   - contact.html (no hash needed)
*/
function setActiveNav() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  const hash = window.location.hash || "#about";

  const current = (file === "index.html") ? ("index.html" + hash) : file;

  $all(".nav a").forEach((a) => {
    const href = a.getAttribute("href");
    if (href === current) a.setAttribute("aria-current", "page");
    else a.removeAttribute("aria-current");
  });
}
window.addEventListener("hashchange", setActiveNav);

/* Shows a back-to-top button after scrolling down. */
function setupBackToTop() {
  const btn = $("#backToTop");
  if (!btn) return;

  function update() {
    if (window.scrollY > 500) btn.classList.add("show");
    else btn.classList.remove("show");
  }

  window.addEventListener("scroll", update, { passive: true });
  update();

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* Sets footer year (e.g., 2026) automatically. */
function setupFooterYear() {
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}


/* Contact form validation (front-end only).
   Expects:
   - #contactForm, #name, #email, #message, #formStatus
   - Each field is inside a <label> that contains a .field-error span
*/
function setupContactForm() {
  const form = $("#contactForm");
  if (!form) return;

  const status = $("#formStatus");
  const name = $("#name");
  const email = $("#email");
  const message = $("#message");

  function setError(input, msg) {
    const err = input.closest("label").querySelector(".field-error");
    if (err) err.textContent = msg || "";
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let ok = true;
    setError(name, "");
    setError(email, "");
    setError(message, "");

    if (!name.value.trim()) {
      setError(name, "Please enter your name.");
      ok = false;
    }
    if (!validEmail(email.value.trim())) {
      setError(email, "Enter a valid email address.");
      ok = false;
    }
    if (message.value.trim().length < 10) {
      setError(message, "Message should be at least 10 characters.");
      ok = false;
    }

    if (!ok) {
      if (status) status.textContent = "Fix the highlighted fields and try again.";
      return;
    }

    // Demo-only: show a confirmation; no backend.
    form.reset();
    if (status) status.textContent = "Message sent (demo). Thanks for reaching out.";
  });
}

function setupMottoTime() {
  const el = document.querySelector("#mottoTime");
  if (!el) return;

  function tick() {
    const now = new Date();

    const date = now.toLocaleDateString(undefined, {
      // weekday: "long",
      year: "numeric",
      month: "long",
      day: "2-digit"
    });

    const time = now.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false
    });

    el.textContent = `${date} ${time}`;
  }

  tick();
  setInterval(tick, 1000);
}

/* Run setup after the page loads */
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupBackToTop();
  setupFooterYear();
  setupContactForm();
  setupMottoTime();
});