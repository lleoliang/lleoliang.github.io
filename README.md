# Leo Liang — Project 0 Website

A minimalist personal portfolio website built with HTML/CSS/JavaScript.

The homepage (`index.html`) is just an About section plus a "Learn more about me" branch diagram that links out to standalone pages for Projects, Teachings, and Music. LinkedIn, email, and GitHub icons sit at the right end of the header on every page.

## How to run
No server required.

1. Download / clone the project folder.
2. Open `index.html` in a web browser (double-click or drag into a browser tab).
3. Use the top navigation (or the branch diagram) to jump to each page.

## Structure
- `index.html`  
  Homepage: About section + "Learn more about me" branch diagram
- `projects.html`  
  Project Timeline (alternating cards); individual projects can link to their own detail page (in `projects/`)
- `teachings.html`  
  Landing page for the open-source teaching materials
- `teachings/`  
  A teaching-philosophy page, plus one page per collection (MATH 164 TA materials, Foundations of Higher Math, Algebra I supplements, Course design), plus `files/` with the PDFs, LaTeX sources, and Word documents they link to
- `music.html`  
  Music landing page linking to the two pages in `music/`: `performances.html` (videos) and `compositions.html` (scores)
- `projects/`  
  One detail page per project: `cvor.html` and `simulation-calibration.html` (AGV project: video + charts at the top, placeholder text). Paths inside use `../` because they sit one folder down.
- `css/styles.css`  
  Global minimalist styling + timeline layout + branch diagram + responsive rules
- `css/project.css`  
  Shared "detail sub-page" styling used by `projects.html`, `teachings.html`, `music.html`, and the pages in `projects/` and `teachings/`
- `js/main.js`  
  Small interactive behaviors (nav highlighting, back-to-top button, footer year, email link, live date/time)
- `images/`  
  Media grouped by use: `icons/` (header social icons), `profile/` (portrait), and one folder per project (`agv/`, `cvor/`)

## Features
### Layout / UI
- Minimalist monochrome theme (white background, black/gray text, subtle borders).
- Sticky header navigation that stays visible while scrolling.
- "Learn more about me" section with an inline-SVG downward branch diagram linking to Projects/Teachings/Music.
- Project Timeline section (on `projects.html`) styled as a vertical timeline with alternating cards.

### JavaScript behaviors (js/main.js)
- Active nav highlighting: adds `aria-current="page"` to the current nav item.
- Back-to-top button: appears after scrolling and scrolls smoothly back to the top.
- Footer year: automatically updates the copyright year.
- Email icon: builds the `mailto:` link at runtime so the address isn't in the page source; the icon stays hidden without JavaScript.
- Live date + 24-hour time display in the About section (updates every second).


