---
description: draft-interval is a minimal gesture study tool for artists built with Vite, React, and Zustand. Customize guidelines for AI agents working on this codebase.
---

# Agent Guidelines for draft-interval

This is a Vite + React SPA for gesture practice. The codebase is minimal, well-organized, and follows consistent patterns.

## Quick Commands

```bash
npm run dev              # Vite dev server → http://localhost:5173/draft-interval/
npm run build            # Production build → dist/
npm run preview          # Preview production build
npm run setup            # One-time: Initialize Git and push to GitHub
npm run deploy:build     # Build with confirmation message
```

Deployment uses GitHub Actions (`.github/workflows/deploy.yml`). See [DEPLOYMENT.md](DEPLOYMENT.md) for setup.

## Architecture Overview

**Tech Stack**: React 18 + Vite 5 + Tailwind + Zustand + Lucide React

**State Management**: Single Zustand store (`src/store/useSessionStore.js`)
- Image queue with navigation (next, previous, shuffle)
- Timer state (mode, duration, endTime, timeLeft)
- Filter toggles (grayscale, flip, blur, highContrast)
- Overlay flags (Rule of Thirds, Line of Action)
- Session history array (persistence-ready via Dexie)

**Key Components**:
- `Dashboard.jsx` → Setup screen (image loading, timer config)
- `Viewport.jsx` → Full-screen image display with CSS filters
- `Controls.jsx` → Floating HUD with timer and playback buttons
- `overlays/` → SVG grid (Rule of Thirds) and canvas (Line of Action)

**Custom Hooks**:
- `useTimer.js` → Anti-drift countdown (100ms poll, Date.now() comparison)

**Utilities**:
- `fileLoader.js` → File System Access API with file input fallback, recursive folder scanning, shuffle

## Development Conventions

### Component Pattern
- Functional components with hooks
- Props passed from Zustand store via `const { ... } = useSessionStore()`
- No prop drilling; all state goes through Zustand
- Event handlers use store setter functions directly

### Styling
- Tailwind CSS only (no CSS-in-JS)
- Dark mode enabled by default (`dark:` prefix ready)
- Lucide icons for UI elements

### Timer Logic
- **Never** use simple `setInterval` for critical timing
- Always compare against target `endTime` (not elapsed time)
- Use 100ms polling interval for smoothness without over-polling
- Modes: 'fixed' (repeats), 'class' (cycles preset sequence), 'memory' (5s visible)

### Keyboard Shortcuts
Handled centrally in `App.jsx` with `window.addEventListener('keydown')`. All handler logic delegates to store setters:
- `Space` → Play/Pause
- `← / →` → Previous/Next image
- `G/F/B/H` → Toggle filters
- `R/L` → Toggle overlays

Do NOT add keyboard handlers in individual components.

### Image Loading
- File System Access API preferred (HTTPS/localhost only)
- Fallback to standard `<input type="file" multiple>` for restricted environments
- Always shuffle array after loading
- Use `URL.createObjectURL()` for blob URLs (no server upload)
- Consider memory leaks with large image sets; cleanup pattern exists in `fileLoader.js`

## File Organization

```
src/
  App.jsx                      # Main app, keyboard routing, state sync
  main.jsx                     # React entry point
  index.css                    # Tailwind @import
  store/useSessionStore.js     # Zustand store (images, timer, filters, history)
  hooks/useTimer.js            # Timer logic with anti-drift
  lib/fileLoader.js            # File System API + fallback, shuffle, cleanup
  components/
    Dashboard.jsx              # Setup view
    Viewport.jsx               # Practice view
    Controls.jsx               # HUD
    overlays/
      RuleOfThirds.jsx         # SVG grid
      LineOfAction.jsx         # Canvas gesture overlay
```

No nested component directories; keep flat unless the app grows significantly.

## Common Tasks

### Add a New Filter
1. Add boolean to `filters` object in `useSessionStore.js`
2. Add `toggleFilter()` call in `Controls.jsx` button
3. Apply filter in `Viewport.jsx` via `getFilterStyle()` function
4. Add keyboard shortcut in `App.jsx`

### Change Timer Interval
Modify `timerMode` setter or `classSequence` array in `useSessionStore.js`. Timer logic in `useTimer.js` automatically picks up changes.

### Add Keyboard Shortcut
Add case to switch statement in `App.jsx`'s `handleKeyDown` function. Always use `e.preventDefault()` for shortcuts that override browser defaults (e.g., Space for play).

### Adjust Dashboard Layout
Edit `Dashboard.jsx`. Use Tailwind classes for responsive behavior. Test on mobile via `npm run dev` then browser dev tools.

## Known Limitations & Gotchas

1. **Base Path**: Vite configured with `base: '/draft-interval/'` for GitHub Pages. Change if repo name differs.
2. **File System API**: Browser-restricted. Always provide fallback file input.
3. **Timer Precision**: 100ms polling means timers are accurate to ~100ms. Don't expect sub-100ms precision.
4. **Image Cleanup**: `URL.revokeObjectURL()` exists in `fileLoader.js` but never called. If adding batch image operations, implement cleanup on session reset.
5. **Persistence**: Dexie.js installed but not integrated. Session history array is in-memory only (clears on page refresh).
6. **Dark Mode**: Tailwind dark mode enabled. Only test light mode manually via browser dev tools or `.light` class override.

## Documentation Links

- [README.md](README.md) → Project overview and features
- [IMPLEMENTATION.md](IMPLEMENTATION.md) → Detailed architecture, features checklist, keyboard reference
- [DEPLOYMENT.md](DEPLOYMENT.md) → GitHub Pages setup with GitHub Actions
- [QUICKSTART_DEPLOYMENT.md](QUICKSTART_DEPLOYMENT.md) → Quick deployment checklist
- [DEPLOYMENT_FILES.md](DEPLOYMENT_FILES.md) → CI/CD configuration details

## When Modifying Code

1. **State Changes**: Always go through Zustand store in `useSessionStore.js`. Don't use local state for global concerns.
2. **Timing Changes**: Understand anti-drift logic in `useTimer.js` before modifying timer behavior.
3. **New Components**: Keep them functional, extract state to Zustand, use Tailwind for styling.
4. **Performance**: Avoid re-rendering on every timer tick. Timer updates only affect `timeLeft` (displayed in Controls). Image changes trigger full viewport re-render.
5. **Testing**: Use `npm run dev` to test locally. No automated test suite; manual QA recommended for timer and filter combinations.

## Next Phase Suggestions

- [ ] Integrate Dexie for session history persistence
- [ ] Add PWA manifest for installable app
- [ ] Implement session export (JSON/CSV)
- [ ] Add sound effects (Web Audio API) for timer completion
- [ ] Create settings panel for customizable keyboard shortcuts
- [ ] Add drag-and-drop zone for image loading on Dashboard

---

**Last Updated**: May 2, 2026  
**Maintainers**: Open for contributions
