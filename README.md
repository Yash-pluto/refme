# RefMe\_

A curated, zero-latency reference hub for modern full-stack workflows. No fluff, no endless scrolling—just the raw syntax you need to build.

Built as a side project by [Yash Vardhan](https://www.linkedin.com/in/vardhan-yash3105/) ([@Yash-pluto](https://github.com/Yash-pluto)).

## The "Why"

As developers, we constantly switch contexts between writing code, running CLI commands, managing infrastructure, and configuring tools. I got tired of opening dozens of browser tabs or repeatedly prompting AI for the same boilerplate snippets.

I built RefMe to act as a secondary brain—a highly opinionated, lightning-fast, and distraction-free environment curated specifically for quick lookups.

## Under the Hood

This isn't a standard template. It's custom-built for speed and clarity:

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4 with a strict monochrome/zinc palette.
- **Content:** MDX (`next-mdx-remote`) allows writing standard markdown cheatsheets while injecting custom interactive React components (like the copy-paste code blocks).
- **Layout:** Custom split-pane design with a fixed left-hand command center and a scrolling right-hand content area.
- **Icons & Typography:** Lucide React, paired with JetBrains Mono and Outfit.

## Project Structure

```text
refme/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx         # Global layout & font configuration
│   │   ├── page.tsx           # Split-pane homepage & directory search
│   │   ├── docs/              # Architecture & vision page
│   │   ├── [topic]/           # Dynamic MDX renderer for each cheatsheet
│   │   └── components/        # Interactive bits (ClientCodeBlock, DirectoryList)
│   ├── content/               # Where the actual .mdx cheatsheets live
│   ├── src/
│   │   ├── context/           # Custom ThemeContext (Dark/Light mode)
│   │   ├── data/              # Directory structure definitions
│   │   └── lib/               # MDX parsing logic
│   └── tailwind.config.ts
```

## Running Locally

1. **Clone the repository**

   ```bash
   git clone [https://github.com/yash-pluto/refme.git](https://github.com/yash-pluto/refme.git)
   cd refme/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Boot it up**
   ```bash
   npm run dev
   ```
   The app will be running at `http://localhost:3000`.

   The app will be available at `http://localhost:3000`

4. **Build for production**

   ```bash
   npm run build
   npm start
   ```

---

## 📖 Usage

- **Browse Topics:** Navigate through the grid on the homepage to explore different programming languages and frameworks
- **Search References:** Use the search bar to filter topics by name
- **Toggle Theme:** Click the moon/sun icon to switch between dark and light modes
- **View Details:** Click on any reference card to access detailed cheatsheets and code snippets
- **Copy Code:** Hover over code blocks and use the copy button to add snippets to your clipboard

---

## ✨ Key Components

### Theme System

Global theme context (`ThemeContext.tsx`) manages dark/light mode state with localStorage persistence and system preference detection.

### Dynamic Routing

Topic pages are dynamically generated from data using Next.js App Router, supporting routes like `/javascript`, `/python`, `/react`, etc.

### Responsive Layout

Mobile-first design with Tailwind CSS breakpoints ensures excellent UX across all devices.

### Code Highlighting

Syntax highlighting adapts to the selected theme:

- **Dark Mode:** vscDarkPlus theme
- **Light Mode:** oneLight theme

---

## 📱 Responsive Breakpoints

- **Mobile:** < 768px — Full-width layout with collapsible sidebar
- **Tablet:** 768px - 1024px — Optimized spacing and grid adjustments
- **Desktop:** 1024px+ — Full three-column layout with sidebars

---

## 🎨 Design Philosophy

RefMe\_ prioritizes:

- **Clarity:** Clean typography and spacing for easy reading
- **Performance:** Optimized assets and efficient client-side rendering
- **Accessibility:** Semantic HTML and keyboard navigation support
- **Consistency:** Unified color scheme and component design

---

## 🔒 Security Considerations

- All content is static or user-generated through the UI
- No backend database credentials exposed
- Environment variables properly managed
- Dependencies regularly updated

---

## 🚢 Deployment

Optimized for deployment on **Vercel**:

```bash
npm run build
vercel deploy
```

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

- Report bugs or issues
- Suggest new features
- Submit pull requests
- Improve documentation

---

## 📄 License

This project is created by **Yash Vardhan** and is available under the MIT License.

---

## 👤 Author

**Yash Vardhan** — Known as **Yash Pluto**

- GitHub: [@yash-pluto](https://github.com/yash-pluto)
- Portfolio: [yash-pluto.vercel.app](https://yash-pluto.vercel.app)

---

Because the site runs on MDX, adding a new topic is incredibly simple:

1. Add a new `.mdx` file in the `frontend/content/` directory.
2. Ensure it has standard frontmatter (`title`, `description`).
3. Add the route to your `REFERENCE_DATA` structure in `app/page.tsx` so it shows up in the directory.

## License

MIT License - Do whatever you want with it. If you use the layout or code, a shoutout is appreciated!
