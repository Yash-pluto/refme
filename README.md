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

## Adding New Content

Because the site runs on MDX, adding a new topic is incredibly simple:

1. Add a new `.mdx` file in the `frontend/content/` directory.
2. Ensure it has standard frontmatter (`title`, `description`).
3. Add the route to your `REFERENCE_DATA` structure in `app/page.tsx` so it shows up in the directory.

## License

MIT License - Do whatever you want with it. If you use the layout or code, a shoutout is appreciated!
