# RefMe_

Quick-reference hub for full-stack syntax.

## Why

I got tired of opening a dozen browser tabs or re-prompting AI for the same boilerplate every time I needed a quick syntax lookup. RefMe is a single, fast page for the snippets and commands I reach for most.

## Tech stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS v4, monochrome/zinc palette
- **Content:** MDX via `next-mdx-remote` — markdown cheatsheets with embedded interactive React components (e.g. copy-paste code blocks)
- **Layout:** Split-pane — fixed sidebar, scrolling content area
- **Icons & Typography:** Lucide React, paired with JetBrains Mono and Outfit
- **Deployment:** Vercel

## Features

- **Theme system** — dark/light mode with localStorage persistence and system preference detection.
- **Dynamic routing** — topic pages generated via Next.js App Router (`/javascript`, `/python`, `/react`, etc.).
- **Code highlighting** — adapts to theme: `vscDarkPlus` in dark mode, `oneLight` in light mode.
- **Responsive** — mobile (`<768px`) single-column, tablet (`768–1024px`) adjusted grid, desktop (`1024px+`) full three-column layout.

## Project structure

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

## Usage

- Browse topics from the homepage grid.
- Search to filter topics by name.
- Toggle dark/light mode via the moon/sun icon.
- Click a card to open the full cheatsheet.
- Hover a code block to copy it.

## Adding a new topic

1. Add a `.mdx` file to `frontend/content/` with `title` and `description` frontmatter.
2. Add its route to `REFERENCE_DATA` in `app/page.tsx`.

## Local development

```bash
git clone https://github.com/yash-pluto/refme.git
cd refme/frontend
npm install
npm run dev
```

Then open `http://localhost:3000`.

**Production build:**

```bash
npm run build
npm start
```

**Deploy:**

```bash
npm run build
vercel deploy
```


## License

MIT — do whatever you want with it. A shoutout is appreciated if you use the layout or code.


<div align="center">

**Yash Vardhan**
[Portfolio](https://yash-pluto.vercel.app) · [GitHub](https://github.com/yash-pluto) · [LinkedIn](https://linkedin.com/in/vardhan-yash3105)

</div>
