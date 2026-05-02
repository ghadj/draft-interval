# draft-interval

A minimal, distraction-free gesture study tool for artists. Load local images, set configurable timers, and practice drawing with full-screen focus. Built with Vite, React, and Tailwind CSS.

## Features

- File System Access API for folder loading with recursive image discovery
- Anti-drift countdown timer with multiple practice modes
- Real-time CSS filters for image processing (grayscale, flip, blur, high contrast)
- Rule of Thirds overlay and Line of Action canvas tools
- Keyboard shortcuts for hands-free control during practice sessions
- Responsive dark-mode interface
- Session history tracking with local persistence

## Installation

```bash
npm install
npm run dev
```

Open http://localhost:5173/draft-interval/

## Usage

### Load Images

Click "Select Folder" to choose a directory with image files (.jpg, .png, .webp). The app recursively scans subdirectories and shuffles images automatically.

### Configure Timer

Choose from three practice modes:

- Fixed Interval: Single duration applied to all images
- Class Mode: Preset sequence (10x30s, 5x2m, 2x5m, 1x20m)
- Memory Flash: Image displays for 5 seconds, then you draw from memory

Adjust the slider to set custom durations (5-300 seconds).

### Practice Session

Click "Start Session" to enter full-screen practice view. The timer auto-advances to the next image when complete. Use keyboard shortcuts to control playback and adjust filters:

- Space: Play/Pause
- Left/Right Arrow: Previous/Next Image
- G: Grayscale toggle
- F: Horizontal Flip
- B: Blur toggle
- H: High Contrast toggle
- R: Rule of Thirds overlay
- L: Line of Action canvas

## Build

```bash
npm run build
```

Creates optimized production bundle in `dist/` folder.

## Deployment

Deploy to GitHub Pages with automated CI/CD using GitHub Actions.

### Quick Setup

```bash
npm run setup
```

This script initializes Git, commits files, and pushes to GitHub. Ensure you have created a repository and enabled GitHub Pages in your repository settings.

### Manual Deployment

```bash
git add .
git commit -m "Initial commit"
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

After pushing, enable GitHub Pages in repository settings: Settings > Pages > Source: "GitHub Actions"

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Tech Stack

- React 18 with Vite for development and production builds
- Tailwind CSS for responsive styling
- Zustand for state management
- Lucide React for icons
- Dexie.js for local persistence (ready for session history)

## Project Structure

```
src/
  components/
    Dashboard.jsx          # Image loading and timer configuration
    Viewport.jsx           # Full-screen image display
    Controls.jsx           # HUD with timer and controls
    overlays/
      RuleOfThirds.jsx     # SVG grid overlay
      LineOfAction.jsx     # Canvas for gesture marking
  hooks/
    useTimer.js            # Anti-drift countdown logic
  store/
    useSessionStore.js     # Zustand state management
  lib/
    fileLoader.js          # File System Access API
```

## Documentation

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [QUICKSTART_DEPLOYMENT.md](QUICKSTART_DEPLOYMENT.md) - Quick deployment reference
- [IMPLEMENTATION.md](IMPLEMENTATION.md) - Architecture and feature reference
- [DEPLOYMENT_FILES.md](DEPLOYMENT_FILES.md) - Summary of deployment configuration

## License

MIT