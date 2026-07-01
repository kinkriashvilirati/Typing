# Codev-RK

A React and Tailwind CSS workspace for banner-development tools and creative experiments. The Playground currently includes Typeflow and the TimerBattle reaction game.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Structure

```text
src/
├── features/
│   ├── playground/       Creative experiments and the typing test
│   └── work-tools/       Banner-development utilities
├── pages/                Top-level landing page
├── shared/
│   ├── layout/           Navigation and page layout
│   ├── navigation/       Route definitions and hash navigation
│   └── ui/               Reusable UI components
├── App.jsx               Top-level page selection only
├── index.css             Tailwind import, theme tokens, and global styles
└── main.jsx              React entry point
```

Add new typing passages only in `src/features/playground/typing/data/typingTests.js`. Keep feature-specific code inside its feature and move code to `shared/` only when multiple features actually use it.
