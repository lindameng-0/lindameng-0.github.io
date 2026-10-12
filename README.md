# Linda Meng — portfolio

A fast, static portfolio with a scroll-snap homepage and separate Projects, Experience, Research, and About pages. No framework or dependency installation is required.

## Open locally

Run `npm run dev` in this folder and open http://127.0.0.1:3000. Keep the terminal running while you use the site.

## Edit and rebuild

- `scripts/build-pages.mjs` contains shared navigation, page content, internship entries, and links. Run `npm run build` after editing it.
- `dist/styles.css` contains the design, scroll-snap behavior, responsive layouts, print styles, and reduced-motion support.
- `dist/app.js` handles mobile navigation, section indicators, entrance reveals, and email copying.
- `dist/assets/portrait.webp` is the supplied headshot, encoded for the web without retouching.
- `dist/assets/readerfold.webp` is a real screenshot of the live Readerfold homepage.
- `dist/assets/Linda_Meng_Resume.pdf` is the original supplied resume.

The homepage prioritizes the Shenyang agentic AI and medical AI internships, laboratory robotics work, Readerfold, and published research. Path.best is retained only in the closed earlier-work section on the Projects page. Anderson and Dear Dream are secondary details.

The visual direction references ftc359.org's large typography, layered imagery, and restrained motion, with neutral charcoal and off-white surfaces, muted lavender accents, and a different composition. Desktop homepage panels use CSS scroll snap; phones and reduced-motion settings use gentler proximity snapping. Detail pages scroll normally for reading.

All text pages are pre-rendered HTML. Fonts and images are hosted locally; there are no third-party runtime requests, analytics, artificial loading screens, or animation libraries. GitWrite's public site was unavailable during screenshot capture, so its description and link are retained without a fabricated screenshot.

## GitHub Pages

The GitHub Actions workflow in `.github/workflows/pages.yml` builds the five static pages and deploys only `dist/`. Enable GitHub Pages with GitHub Actions as the publishing source. Future pushes to `main` rebuild and publish the site automatically.

The account-level free domain uses a repository named `lindameng-0.github.io`, with the site served at https://lindameng-0.github.io/. Local preview logs, screenshots, and unrelated Sites configuration are excluded from the repository.
