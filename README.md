## Rustam Timilsina — Full‑Stack Portfolio

Modern, responsive portfolio website showcasing experience, skills, and projects. Built with plain HTML, CSS, and a few lines of vanilla JavaScript. No build tools or frameworks required.

### Features
- **Responsive layout**: Scales from mobile to desktop with a clean grid system.
- **Sticky navigation + mobile drawer**: Accessible keyboard focus and a toggleable drawer on small screens.
- **Hero with CTAs**: Quick links to experience and skills.
- **About, Skills, Projects, Experience, Contact** sections with clear structure.
- **Projects grid**: Image with graceful fallback, tags, and repo link buttons.
- **Contact form (mailto)**: Opens the user’s email client with prefilled subject/body; no backend needed.
- **Accessible defaults**: Focus outlines, sensible color contrast, semantic HTML.

### Tech Stack
- **HTML5** for structure
- **CSS3** with custom properties (CSS variables) for theming and responsive layouts
- **Vanilla JavaScript** for small UI interactions (mobile menu, contact mailto)

### Project Structure
```
.
├─ assets/
│  └─ image.png          # Placeholder/screenshot used in projects section
├─ index.html            # Main page markup and inline JS (drawer + mailto)
└─ styles.css            # Global styles, layout, components, responsive rules
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

### Customization
- **Name and title**: Update the title and brand text in `index.html` header and `<title>`.
- **Meta description**: Edit the `<meta name="description" ...>` for SEO.
- **Skills**: Modify the items inside the `#skills` grid.
- **Projects**:
  - Duplicate an existing `article.project-card` in `#projects` and update:
    - Image path in `assets/`
    - Project title and description
    - Tags
    - Repository/demo links
  - The image has an `onerror` handler that removes the `<img>` and applies a fallback style if the file is missing.
- **Experience**: Edit timeline items under `#experience`.
- **Contact email (important)**:
  - In `index.html`, set `mailtoAddress` to the email that should receive messages:
    - Find: `const mailtoAddress = '';
`
    - Replace with your email, for example:
      ```js
      const mailtoAddress = 'your.email@example.com';
      ```
  - The form will then open the user’s email client with prefilled subject and body.

### Deployment
- **GitHub Pages**
  - Push this repository to GitHub.
  - In repo Settings → Pages, choose the `main` branch and root (`/`) folder.
  - Your site will be available at the provided Pages URL.

- **Netlify**
  - Drag‑and‑drop the project folder to the Netlify dashboard, or connect the repo.
  - Build settings: none required (static site). Publish directory: root.

- **Vercel**
  - Import the repository in Vercel. Framework preset: “Other”.
  - Output directory: root. No build step needed.

### Accessibility & Performance Notes
- Uses semantic headings and labels; keyboard focus is visible via `:focus-visible`.
- Color palette targets sufficient contrast in most contexts; verify any new color choices.
- Minimal JavaScript, font preconnect, and no large dependencies for fast loads.

### Credits
- Typeface: Inter (via Google Fonts)
- Design and code: Rustam Timilsina

### License
This project is provided as‑is for portfolio purposes. If you plan to reuse or distribute it, add a LICENSE of your choice (e.g., MIT) to the repository.


