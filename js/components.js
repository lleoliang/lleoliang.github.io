/* js/components.js
   Single source of truth for the markup that repeats, byte-for-byte,
   on every page: the <head> boilerplate, the site header/nav, the
   back-to-top button, and the footer. A page includes a piece by
   dropping a plain (non-deferred) <script> tag exactly where that
   piece should appear:

     <script src="js/components.js" data-component="head"></script>
     <script src="js/components.js" data-component="header"></script>
     <script src="js/components.js" data-component="backtotop"></script>
     <script src="js/components.js" data-component="footer"></script>

   (use "../js/components.js" from projects/, teachings/, music/ — see
   PAGE PREFIX below). Because these scripts are neither deferred nor
   async, each one runs the instant the parser reaches it, so the
   markup it writes lands in exactly that spot with no flash of
   missing content and no build step.

   To add/remove/reorder a project, teaching collection, or music
   page, edit the PROJECTS / TEACHINGS / MUSIC arrays below — every
   page's nav dropdown picks it up automatically. A project with
   `hidden: true` is skipped entirely (no markup emitted), which is
   how "coming soon" placeholders stay off the nav without a
   commented-out block to keep in sync.
*/

(function () {
  "use strict";

  var PROJECTS = [
    { href: "projects/cvor.html", title: "Cross-View Object Registration (CVOR)", date: "January 2026 – Present" },
    { href: "projects/claude-secretary.html", title: "Claude Secretary", date: "July 2026", hidden: true },
    { href: "projects/dynamic-memory-for-claude.html", title: "Dynamic Memory for Claude", date: "May 2026 – Present" },
    { href: "projects/price-matching.html", title: "Store Price-Matching Algorithm", date: "December 2025" },
    { href: "projects/meme-stock-dl.html", title: "Meme Stock Surge Prediction", date: "October – December 2025" },
    { href: "projects/simulation-calibration.html", title: "Simulation Calibration for Autonomous Vehicles", date: "June 2025 – August 2025" }
  ];

  var TEACHINGS = [
    { href: "teachings/philosophy.html", title: "Teaching Philosophy" },
    { href: "teachings/math-164-ta.html", title: "MATH 164 TA Materials" },
    { href: "teachings/foundations-higher-math.html", title: "Foundations of Higher Math" },
    { href: "teachings/algebra-i-aops.html", title: "Algebra I Supplements" },
    { href: "teachings/course-design.html", title: "Course Design" }
  ];

  var MUSIC = [
    { href: "music/performances.html", title: "Performances" },
    { href: "music/compositions.html", title: "Compositions" }
  ];

  function escapeHtml(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function navItemsHtml(base, items) {
    return items
      .filter(function (item) { return !item.hidden; })
      .map(function (item) {
        var span = item.date ? "<span>" + escapeHtml(item.date) + "</span>" : "";
        return '<li><a href="' + base + item.href + '">' + escapeHtml(item.title) + span + "</a></li>";
      })
      .join("\n              ");
  }

  function socialIconsHtml(base) {
    return (
      '<a href="https://www.linkedin.com/in/ileoliang" aria-label="LinkedIn"><img src="' + base + 'images/icons/linkedinicon.png" alt="" class="nav-icon"></a>\n' +
      '      <a class="email-link" href="#" hidden aria-label="Email"><img src="' + base + 'images/icons/emailicon.png" alt="" class="nav-icon"></a>\n' +
      '      <a href="https://github.com/lleoliang" aria-label="GitHub"><img src="' + base + 'images/icons/githubicon.png" alt="" class="nav-icon"></a>'
    );
  }

  var TEMPLATES = {
    // The <link>/<meta> tags are inserted as markup; js/main.js is
    // created as a real <script> element instead (see below), since a
    // <script> written via insertAdjacentHTML never executes.
    head: function (base) {
      var projectCss = this.hasAttribute("data-project-css")
        ? '\n  <link rel="stylesheet" href="' + base + 'css/project.css">'
        : "";
      return (
        '<link rel="icon" type="image/png" href="' + base + 'favicon.png">\n' +
        '  <link rel="stylesheet" href="' + base + 'css/styles.css">' + projectCss
      );
    },

    header: function (base) {
      var aboutHref = base + "index.html#about";
      return (
        '<header class="site-header">\n' +
        '    <div class="wrapper header-inner">\n' +
        '      <a class="brand" href="' + aboutHref + '">\n' +
        "        <h1>Leo Liang</h1>\n" +
        "      </a>\n" +
        '      <nav class="nav" aria-label="Primary">\n' +
        '        <div class="nav-main">\n' +
        '          <a href="' + aboutHref + '">About</a>\n' +
        '          <div class="nav-item">\n' +
        '            <a href="' + base + 'projects.html">Projects</a>\n' +
        '            <ul class="nav-menu">\n' +
        "              " + navItemsHtml(base, PROJECTS) + "\n" +
        "            </ul>\n" +
        "          </div>\n" +
        '          <div class="nav-item">\n' +
        '            <a href="' + base + 'teachings.html">Teachings</a>\n' +
        '            <ul class="nav-menu">\n' +
        "              " + navItemsHtml(base, TEACHINGS) + "\n" +
        "            </ul>\n" +
        "          </div>\n" +
        '          <div class="nav-item">\n' +
        '            <a href="' + base + 'music.html">Music</a>\n' +
        '            <ul class="nav-menu">\n' +
        "              " + navItemsHtml(base, MUSIC) + "\n" +
        "            </ul>\n" +
        "          </div>\n" +
        "        </div>\n" +
        '        <div class="nav-social" aria-label="Social links">\n' +
        "          " + socialIconsHtml(base) + "\n" +
        "        </div>\n" +
        "      </nav>\n" +
        "    </div>\n" +
        "  </header>"
      );
    },

    backtotop: function () {
      var label = this.getAttribute("data-label") || "Top";
      return '<button id="backToTop" class="button back-to-top small" type="button" aria-label="Back to top">' + label + "</button>";
    },

    footer: function (base) {
      return (
        '<footer class="site-footer">\n' +
        '    <div class="footer-social" aria-label="Social links">\n' +
        "      " + socialIconsHtml(base) + "\n" +
        "    </div>\n" +
        '    <div class="wrapper footer-row">\n' +
        "      <div>© <span id=\"year\"></span> Leo Liang</div>\n" +
        '      <div><a href="' + base + 'index.html">leo-liang</a></div>\n' +
        "    </div>\n" +
        "  </footer>"
      );
    }
  };

  var script = document.currentScript;
  if (!script) return; // defensive: should always be set for a synchronous <script src>

  var type = script.getAttribute("data-component");
  var template = TEMPLATES[type];
  if (!template) return;

  // PAGE PREFIX: root pages (index.html, projects.html, teachings.html,
  // music.html) need no prefix; pages one level down (projects/,
  // teachings/, music/) need "../". Rather than a prefix hand-written
  // per page (one more thing to get wrong), it's read off this very
  // script tag's own src — whatever path reached this file is the
  // right prefix for everything the template links to.
  var src = script.getAttribute("src") || "";
  var base = src.replace(/(^|\/)js\/components\.js(\?.*)?$/, "$1");

  var html = template.call(script, base);
  if (html) script.insertAdjacentHTML("beforebegin", html);

  if (type === "head") {
    var mainJs = document.createElement("script");
    mainJs.src = base + "js/main.js";
    mainJs.defer = true;
    script.parentNode.insertBefore(mainJs, script);
  }

  script.remove();
})();
