# DESIOS — The Intelligent Desktop of the Future

> A fully interactive, futuristic desktop operating system concept built as a web application. DESIOS reimagines how we might interact with a computer a decade from now — AI-native, gesture-friendly, spatially aware, and visually stunning.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack%20Start-v1-FF4154)](https://tanstack.com/start)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-Framer-0055FF?logo=framer)](https://motion.dev/)

---

## ✨ What is DESIOS?

DESIOS is not a Windows clone. It is an **original next-generation operating system concept** designed to explore how desktop computing could evolve with AI at its core.

The experience features a cinematic boot sequence, a floating dock, draggable and resizable glassmorphic windows, an AI command center, a conversational assistant, live widgets, virtual workspaces, and a suite of themed apps — all running in the browser.

This project is a **design and engineering experiment** focused on:

- **Premium UI/UX** — glassmorphism, fluid motion, and spatial depth.
- **AI-native interactions** — a built-in assistant and command palette.
- **Desktop-like fidelity** — windows, workspaces, taskbar, and notifications.
- **Performance** — React 19, TanStack Start, and optimized animations.

---

## 🚀 Live Demo

> Add your deployed URL here once published.

```text
https://your-desios-demo-url.lovable.app
```

Or run it locally in under a minute:

```bash
bun install
bun dev
```

Then open [http://localhost:8080](http://localhost:8080).

---

## 🖼️ Preview

> Replace the screenshot below with an actual image of your build.

```markdown
![DESIOS Desktop Preview](./docs/preview.png)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [TanStack Start](https://tanstack.com/start) (React 19 full-stack framework) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Animations | [Motion](https://motion.dev/) (Framer Motion successor) |
| Icons | [Lucide React](https://lucide.dev/) |
| Components | [Radix UI](https://www.radix-ui.com/) primitives + shadcn/ui patterns |
| Build Tool | [Vite 8](https://vitejs.dev/) |
| Package Manager | [Bun](https://bun.sh/) |

---

## 🎮 Features

### Core Desktop Experience

- **Animated Boot Sequence** — cinematic startup with system initialization visuals.
- **Live Wallpaper** — immersive animated background that sets the futuristic tone.
- **Floating Dock** — macOS-inspired dock with spring physics, tooltips, and active-state indicators.
- **Draggable & Resizable Windows** — true desktop windowing with z-index management, minimize, maximize, and close.
- **Virtual Workspaces** — switch between Work, Gaming, Study, and Creative spaces from the top bar.
- **Top Status Bar** — shows active app, workspace switcher, system status, and live clock.

### AI-Native Interactions

- **DESI Assistant** — a floating AI orb and conversational assistant panel.
- **Command Center (⌘K / Ctrl+K)** — spotlight-style launcher to open apps, run commands, and search.
- **Notification Center** — slide-out hub for system and app notifications.
- **Draggable Widgets** — interactive widgets layered over the desktop.

### Built-in Apps

| App | Description |
|-----|-------------|
| **Home** | Dashboard and welcome hub |
| **Explorer** | Spatial file browsing concept |
| **Browser** | Minimal futuristic web browser |
| **Notes** | Rich note-taking app |
| **Terminal** | Styled system terminal |
| **Settings** | System preferences and theming |
| **Store** | App discovery and installation concept |
| **Media** | Music and media player |
| **Monitor** | System activity and resource monitor |

---

## 📁 Project Structure

```text
.
├── src/
│   ├── components/
│   │   └── desios/              # DESIOS OS components
│   │       ├── apps/            # Built-in app components
│   │       ├── Assistant.tsx    # DESI AI assistant
│   │       ├── Boot.tsx         # Boot sequence
│   │       ├── CommandCenter.tsx # ⌘K command palette
│   │       ├── Desios.tsx       # Main OS orchestrator
│   │       ├── NotificationCenter.tsx
│   │       ├── Taskbar.tsx      # Floating dock
│   │       ├── Wallpaper.tsx    # Animated background
│   │       ├── Widgets.tsx      # Desktop widgets
│   │       ├── Window.tsx       # Window chrome & behavior
│   │       └── types.ts         # Shared types
│   ├── routes/                  # TanStack Start file-based routes
│   │   ├── __root.tsx           # Root layout
│   │   └── index.tsx            # Home route
│   ├── router.tsx               # Router configuration
│   ├── start.ts                 # TanStack Start server entry
│   ├── styles.css               # Global styles & Tailwind theme
│   └── lib/                     # Utilities and helpers
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘ + K` / `Ctrl + K` | Open Command Center |
| `Esc` | Close Command Center |
| `Click Dock Icon` | Launch or focus app |
| `Drag Title Bar` | Move window |
| `Drag Bottom-Right Corner` | Resize window |
| `Double-Click Title Bar` | Maximize / restore window |

---

## 🚀 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 20+

### Install

```bash
bun install
```

### Run Development Server

```bash
bun dev
```

### Build for Production

```bash
bun run build
```

### Preview Production Build

```bash
bun run preview
```

### Lint & Format

```bash
bun run lint
bun run format
```

---

## 🎨 Theming & Customization

DESIOS uses CSS custom properties and Tailwind v4 theme variables for its futuristic aesthetic. Key design tokens are defined in `src/styles.css`:

- `--desios-cyan` — primary neon cyan accent
- `--desios-violet` — secondary violet accent
- `--desios-mint` — success / media accent
- Glassmorphism utilities — `.glass`, `.glass-strong`
- Gradient utilities — `.text-gradient-brand`

To customize the OS:

1. Edit color tokens in `src/styles.css`.
2. Add new apps to the `APPS` array in `src/components/desios/Desios.tsx`.
3. Implement the app view in `src/components/desios/apps/Apps.tsx`.
4. Add app-specific logic in a new file under `src/components/desios/apps/`.

---

## 🧠 Architecture Notes

- **File-based routing** via TanStack Start. Do not create `src/pages/`.
- **State is local** — window positions, open apps, and workspace state live in React state.
- **SSR-safe** — browser-only APIs (like `window` event listeners) are gated inside `useEffect`.
- **No external backend required** — DESIOS runs entirely in the browser.

---

## 📦 Deployment

This project is configured for deployment on Lovable. You can also self-host the static or full-stack build from any Vite-compatible platform.

```bash
bun run build
```

Deploy the contents of the `dist/` directory.

---

## 🤝 Contributing

DESIOS is a concept project. Contributions, ideas, and forks are welcome:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m 'Add amazing feature'`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

---

## 📄 License

This project is open source under the [MIT License](LICENSE).

---

## 🙌 Acknowledgments

- Built with [TanStack Start](https://tanstack.com/start), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).
- Animations powered by [Motion](https://motion.dev/).
- Icons by [Lucide](https://lucide.dev/).

---

> *DESIOS — The Intelligent Desktop of the Future.*
