# RefMe\_ — Technical Documentation Hub

A modern, responsive technical reference platform designed for developers and engineers to quickly access cheatsheets, code snippets, and documentation across multiple programming languages and frameworks.

Built with ❤️ by **Yash Vardhan** ([Yash Pluto](https://github.com/yash-pluto))

---

## 🌟 Features

- **Dark & Light Theme Toggle** — Seamless theme switching with persistent storage
- **Multi-Language Support** — Comprehensive references for Python, JavaScript, TypeScript, Go, Rust, C++, React, Tailwind CSS, Docker, Kubernetes, Bash, and more
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Fast Navigation** — Client-side routing with smooth page transitions
- **Code Syntax Highlighting** — Beautiful syntax-highlighted code blocks with copy-to-clipboard functionality
- **Search & Filter** — Quick access to specific references and topics
- **Professional UI** — Polished, sleek interface built with modern design principles

---

## 🛠️ Tech Stack

- **Frontend Framework:** Next.js 16.2.4 with App Router
- **UI Library:** React 19.2.4
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Code Highlighting:** react-syntax-highlighter with Prism.js
- **Icons:** lucide-react
- **Language:** TypeScript

---

## 📁 Project Structure

```
refme/
├── frontend/                          # Next.js application
│   ├── app/
│   │   ├── layout.tsx                 # Root layout with theme provider
│   │   ├── page.tsx                   # Homepage with hero and grid
│   │   ├── [topic]/
│   │   │   └── page.tsx               # Dynamic topic detail pages
│   │   ├── components/
│   │   │   ├── Navbar.tsx             # Navigation bar
│   │   │   ├── Hero.tsx               # Hero section
│   │   │   ├── BentoGrid.tsx          # Reference grid display
│   │   │   └── Footer.tsx             # Footer component
│   │   └── globals.css                # Global styles
│   ├── src/
│   │   ├── context/
│   │   │   └── ThemeContext.tsx       # Global theme management
│   │   └── data/
│   │       ├── cheatsheets.ts         # Reference content data
│   │       └── references.json        # Reference metadata
│   ├── public/                         # Static assets
│   └── package.json                   # Dependencies
└── README.md                           # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.0 or higher
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yash-pluto/refme.git
   cd refme/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

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

## 🙏 Acknowledgments

Built with modern web technologies and a passion for clean code and excellent developer experience. RefMe\_ is designed to be your go-to technical reference platform.

---

**Last Updated:** May 2026 | **Version:** 1.0.0 | **Maintained by:** Yash Vardhan (Yash Pluto)
