## Rustam Timilsina — Full‑Stack Portfolio

Modern, responsive portfolio website showcasing experience, skills, and projects. Built with plain HTML, CSS, and a few lines of vanilla JavaScript. No build tools or frameworks required.

### Features
- **Responsive layout**: Scales from mobile to desktop with a clean grid system.
- **Sticky navigation**: Accessible keyboard focus, command palette (⌘K / Ctrl+K), and smooth section navigation.
- **Hero with CTAs**: Direct contact options, resume download, and quick project exploration.
- **Selected Engineering Projects**: Interactive architecture modal blueprints, live links, and category filters.
- **Milestones, Tech Matrix & Contact**: Structured timeline, categorized skills, and one-click email copying.
- **Engineering Blog**: Dedicated multi-post blog section (`blog.html`) sharing technical reflections and project deep dives.
- **Accessible defaults**: Focus outlines, high-contrast typography, and semantic HTML5.

### Tech Stack
- **HTML5** for semantic markup
- **CSS3** with custom properties (CSS variables) for modern dark theming and fluid layouts
- **Three.js** (zero-build CDN) for interactive 3D background effects
- **Vanilla JavaScript** for high-performance UI interactions (command palette, modal architecture blueprints, project filtering)

### Project Structure
```
.
├─ assets/               # Project screenshots, blog media, and CV PDF
├─ index.html            # Main portfolio markup, command palette, architecture modals
├─ blog.html             # Engineering blog index
├─ post1.html, post2...  # Individual blog articles
├─ styles.css            # Global styling, layout, themes, responsive rules
└─ README.md             # Project documentation
```

### Getting Started
- **Option 1: Open directly**
  - Double‑click `index.html` to open in your browser.

- **Option 2: Run a simple local server (recommended)**
  - Python 3:
    ```bash
    python -m http.server 5500
    ```
    Visit `http://localhost:5500/`.
  - Node (if installed):
    ```bash
    npx serve -l 5500
    ```
    Visit `http://localhost:5500/`.

### Deployment
- **Vercel (Production)**
  - Connected directly to GitHub repository with automatic redeployment on push.
  - Live at `https://www.rustamtimalsina.com.np/`.

### Credits
- Design and code: Rustam Timilsina
