/* project0/js/main.js
   Small, visible interactions:
   - Marks active nav link (aria-current)
   - Shows/hides "Back to top" button
   - Projects section/page: filter project cards by tag
   - Email icon: builds the mailto link at runtime
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
   - index.html with the #about hash
   - all other pages, matched by bare filename (projects.html, teachings.html, music.html, ...)
*/
function setActiveNav() {
  const file = window.location.pathname.split("/").pop() || "index.html";
  const hash = window.location.hash || "#about";

  const current = (file === "index.html") ? ("index.html" + hash) : file;

  $all(".nav-main a").forEach((a) => {
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
      hour12: false
    });

    el.textContent = `${date} ${time}`;
  }

  tick();
  setInterval(tick, 1000);
}

// Assemble the address at runtime so it isn't in the page source. The
// .email-link icons start hidden and only appear once this has run.
function setupEmail() {
  const mailto = `mailto:${["leoliang.co", "gmail.com"].join("@")}`;

  $all(".email-link").forEach((a) => {
    a.href = mailto;
    a.hidden = false;
  });
}

// Downloads (PDF/DOCX scores and teaching materials) and links to other
// domains (GitHub, LinkedIn, the CC license, etc.) open in a new tab, so
// visitors don't lose their place on the page. Plain on-site navigation
// (nav links, "Read more", "← Back") is untouched and stays in this tab.
function setupNewTabLinks() {
  $all("a[href]").forEach((a) => {
    const href = a.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) return;

    const isDownload = /\.(pdf|docx)$/i.test(href);
    const isExternal = /^https?:\/\//i.test(href) && !href.startsWith(location.origin + "/");

    if (isDownload || isExternal) {
      a.target = "_blank";
      if (!(a.rel || "").includes("noopener")) a.rel = (a.rel ? a.rel + " " : "") + "noopener";
    }
  });
}

/* Run setup after the page loads */
document.addEventListener("DOMContentLoaded", () => {
  setActiveNav();
  setupBackToTop();
  setupFooterYear();
  setupMottoTime();
  setupEmail();
  setupNewTabLinks();
});