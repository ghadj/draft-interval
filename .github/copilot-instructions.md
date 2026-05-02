## Code Assistance Guidelines for draft-interval

This is a Vite + React gesture study tool. Follow these patterns when assisting with code changes.

### Technology & Build
- **Framework**: React 18 + Vite 5 dev server on port 5173
- **Styling**: Tailwind CSS (dark mode enabled)
- **State**: Zustand store at `src/store/useSessionStore.js` (single source of truth)
- **Build**: `npm run build` creates `dist/` for GitHub Pages deployment

### Key Architectural Rules

1. **All global state goes through Zustand**. Don't use local state for images, timer, filters, or overlays.
2. **Timer logic uses anti-drift pattern**: Compare `Date.now()` against target `endTime`, not elapsed time. Check every 100ms.
3. **Keyboard handlers live in `App.jsx`**, not individual components. Use `window.addEventListener('keydown')`.
4. **File loading uses File System API with fallback**. Always provide `<input type="file">` as backup.
5. **No CSS-in-JS**. Use Tailwind classes exclusively. Import icons from lucide-react.

### Component Locations
- Setup screen: `src/components/Dashboard.jsx`
- Image display: `src/components/Viewport.jsx`
- Controls HUD: `src/components/Controls.jsx`
- Overlays: `src/components/overlays/RuleOfThirds.jsx`, `LineOfAction.jsx`
- Custom logic: `src/hooks/useTimer.js`, `src/lib/fileLoader.js`

### Before Writing Code
1. Check if state already exists in `useSessionStore.js`
2. Verify keyboard shortcut not already assigned in `App.jsx`
3. Ensure filter/overlay pattern matches existing toggles
4. Test timer changes thoroughly (modes: fixed, class, memory)

### Common Patterns

**Adding a filter**:
```javascript
// In store: add to filters object
// In Viewport: apply via getFilterStyle()
// In Controls: add button with toggleFilter()
// In App: add keyboard case
```

**Creating custom hook**:
- Use pattern from `useTimer.js` (ref/state + useEffect + cleanup)
- Subscribe to Zustand store via `useSessionStore()`
- Return computed values and control functions

**Styling**:
- Use Tailwind classes (no inline styles unless unavoidable)
- Dark mode via `dark:` prefix (default is dark theme)
- Icons via Lucide: `import { IconName } from 'lucide-react'`

### Deployment
- GitHub Pages auto-deploys via `.github/workflows/deploy.yml`
- Base URL: `/draft-interval/` in vite.config.js (update if repo name changes)
- Push to `main` branch triggers build and deploy

### Documentation to Reference
- Architecture details: [IMPLEMENTATION.md](IMPLEMENTATION.md)
- Deployment: [DEPLOYMENT.md](DEPLOYMENT.md)
- Full agent guidelines: [AGENTS.md](AGENTS.md)
