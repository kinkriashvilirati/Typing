# Typeflow

A React and Tailwind CSS typing test for practicing speed and accuracy. Player names and the ten most recent results are stored locally in the browser.

## Commands

```bash
npm run dev
npm run lint
npm run build
```

## Structure

```text
src/
├── components/   Reusable UI grouped by feature
├── constants/    App-wide configuration
├── data/         Typing test content
├── hooks/        Typing and player state logic
├── utils/        Pure calculations, formatting, and storage
├── App.jsx       Feature composition only
├── index.css     Tailwind import, theme tokens, and global styles
└── main.jsx      React entry point
```

Add new typing passages only in `src/data/typingTests.js`. Shared behavior belongs in hooks or utilities rather than inside page components.
