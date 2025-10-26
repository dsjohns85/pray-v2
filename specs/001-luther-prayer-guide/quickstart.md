# Quickstart: Luther Prayer Guide

**Date**: 2025-10-26
**Feature**: Luther Prayer Guide (001)
**Branch**: `001-luther-prayer-guide`

## Overview

This guide provides setup, development, and deployment instructions for the Luther Prayer Guide static web application.

## Prerequisites

- Git
- A text editor (VS Code, Sublime, etc.)
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- GitHub account (for deployment to GitHub Pages)

**No build tools, frameworks, or package managers required!**

---

## Project Setup

### 1. Clone and Navigate

```bash
git clone <repository-url>
cd pray-v2
git checkout 001-luther-prayer-guide
```

### 2. Verify Structure

The project uses a simple structure served directly by GitHub Pages:

```
docs/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── app.js              # Navigation and state logic
└── content/
    ├── petitions.js    # Lord's Prayer content
    ├── commandments.js # Ten Commandments content
    └── creed.js        # Apostle's Creed content
```

---

## Local Development

### Running Locally

Since this is a static site with ES6 modules, you need a local web server (browsers block ES6 module imports from `file://` URLs).

**Option 1: Python (built-in on macOS/Linux)**
```bash
cd docs
python3 -m http.server 8000
```
Open `http://localhost:8000` in your browser.

**Option 2: Node.js http-server** (if you have Node installed)
```bash
npx http-server docs -p 8000
```
Open `http://localhost:8000` in your browser.

**Option 3: VS Code Live Server Extension**
- Install "Live Server" extension in VS Code
- Right-click on `docs/index.html`
- Select "Open with Live Server"

### Making Changes

1. Edit files in `docs/` directory
2. Save changes
3. Refresh browser to see updates (no build step!)

---

## Content Editing

### Adding/Editing Petition Content

Edit `docs/content/petitions.js`:

```javascript
export const petitions = [
  {
    id: 1,
    type: 'petition',
    title: 'The First Petition',
    petitionText: 'Hallowed be your name',
    meditation: 'Your expanded meditation text here...'
  },
  // ... more petitions
];
```

### Adding/Editing Commandment Content

Edit `docs/content/commandments.js`:

```javascript
export const commandments = [
  {
    id: 1,
    type: 'commandment',
    title: 'The First Commandment',
    commandmentText: 'You shall have no other gods before me',
    garland: {
      instruction: '...',
      thanksgiving: '...',
      confession: '...',
      prayer: '...'
    }
  },
  // ... more commandments
];
```

### Adding/Editing Creed Content

Edit `docs/content/creed.js`:

```javascript
export const creed = [
  {
    id: 1,
    type: 'creed',
    title: 'The First Article: Creation',
    creedText: 'I believe in God, the Father Almighty...',
    garland: {
      instruction: '...',
      thanksgiving: '...',
      confession: '...',
      prayer: '...'
    }
  },
  // ... more articles
];
```

**Important**: After editing content:
1. Validate JavaScript syntax (check browser console for errors)
2. Test navigation through all items
3. Verify text displays correctly (no escaping issues)

---

## Deployment to GitHub Pages

### One-Time Setup

1. **Enable GitHub Pages in Repository Settings**:
   - Go to repository on GitHub
   - Click "Settings" > "Pages"
   - Under "Source", select:
     - Branch: `001-luther-prayer-guide` (or `main` after merging)
     - Folder: `/docs`
   - Click "Save"

2. **Wait for Deployment** (2-3 minutes):
   - GitHub will show the URL: `https://<username>.github.io/<repo-name>/`
   - A green checkmark indicates successful deployment

### Publishing Updates

Every time you push to the selected branch, GitHub Pages automatically redeploys:

```bash
# Make your changes to files in docs/
git add docs/
git commit -m "Update petition content"
git push origin 001-luther-prayer-guide
```

Wait 1-2 minutes, then refresh your GitHub Pages URL to see changes.

**No build process needed!** Files are served exactly as-is.

---

## Testing

### Manual Testing Checklist

Since this is low-risk static content (per Constitution), manual testing is sufficient:

**P1 (MVP) - Lord's Prayer**:
- [ ] Navigate through all 7 petitions
- [ ] Each petition shows: petition text, then meditation
- [ ] "Next" button advances correctly
- [ ] Amen screen displays after 7th petition
- [ ] Can close/end prayer session

**P2 - Ten Commandments**:
- [ ] Option to continue from Amen appears
- [ ] Navigate through all 10 commandments
- [ ] Each commandment shows: text, instruction, thanksgiving, confession, prayer (5 screens)
- [ ] "Next" button advances correctly through all strands
- [ ] Can end session after commandments

**P3 - Apostle's Creed**:
- [ ] Option to continue from Commandments appears
- [ ] Navigate through all 3 creed articles
- [ ] Each article shows: text, instruction, thanksgiving, confession, prayer (5 screens)
- [ ] "Next" button advances correctly
- [ ] Session ends gracefully

**Cross-Browser Testing**:
- [ ] Test in Chrome
- [ ] Test in Firefox
- [ ] Test in Safari
- [ ] Test in Edge

**Responsive Testing**:
- [ ] Test on desktop (1920×1080)
- [ ] Test on tablet (768×1024)
- [ ] Test on mobile (375×667)

**State Persistence (if implemented)**:
- [ ] Close mid-session, reopen → resumes at correct position
- [ ] Clear localStorage → starts from beginning

---

## Troubleshooting

### Problem: "CORS error" when loading modules locally

**Solution**: Use a local web server (see "Running Locally" section above). Browsers block ES6 module imports from `file://` URLs for security reasons.

### Problem: Content not displaying

**Checklist**:
1. Check browser console for JavaScript errors
2. Verify all content files have valid JavaScript syntax
3. Ensure all strings with quotes/apostrophes are properly escaped
4. Verify `export` statements in content files

### Problem: GitHub Pages shows 404

**Checklist**:
1. Verify `/docs` folder exists in repository
2. Check GitHub Pages settings: Source should be `/docs` folder on correct branch
3. Wait 2-3 minutes after enabling GitHub Pages for first deployment
4. Ensure `index.html` exists at `docs/index.html` (not `docs/src/index.html`)

### Problem: Changes not appearing on GitHub Pages

**Checklist**:
1. Verify changes were committed and pushed: `git log`
2. Check GitHub Actions tab for deployment status
3. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
4. Clear browser cache if hard refresh doesn't work

### Problem: localStorage not saving state

**Checklist**:
1. Check browser privacy settings (some browsers block localStorage in private/incognito mode)
2. Verify no JavaScript errors in console
3. Check `app.js` for correct localStorage key names
4. Test in different browser to rule out browser-specific issue

---

## File Structure Reference

```
pray-v2/
├── docs/                       # GitHub Pages root (served at https://user.github.io/repo/)
│   ├── index.html              # Entry point
│   ├── styles.css              # All styling
│   ├── app.js                  # App logic (imports content modules)
│   ├── content/
│   │   ├── petitions.js        # 7 petitions with text + meditation
│   │   ├── commandments.js     # 10 commandments with text + garland
│   │   └── creed.js            # 3 creed articles with text + garland
│   └── assets/
│       └── favicon.ico         # (optional)
├── specs/                      # Feature documentation (not deployed)
│   └── 001-luther-prayer-guide/
│       ├── spec.md
│       ├── plan.md
│       ├── data-model.md
│       ├── research.md
│       └── quickstart.md       # This file
└── README.md                   # Project documentation
```

---

## Development Workflow

### Adding a New Feature

1. Create feature branch: `git checkout -b 002-new-feature`
2. Make changes in `docs/` directory
3. Test locally with web server
4. Commit and push
5. Create pull request
6. After merge, GitHub Pages auto-deploys from main branch

### Content Updates Only

1. Edit content files in `docs/content/`
2. Test locally
3. Commit directly to main branch (or feature branch if significant changes)
4. Push → auto-deploys

### Fixing Bugs

1. Create branch: `git checkout -b fix-navigation-bug`
2. Fix bug in `docs/` files
3. Test manually (see checklist above)
4. Commit, push, create PR
5. Merge → auto-deploys

---

## Performance Notes

- **Total file size target**: <500KB (currently ~50KB with content)
- **Page load target**: <100ms (static HTML, no external requests)
- **Navigation speed**: Instant (DOM show/hide, no page reloads)

### Optimizations Already In Place

- Zero dependencies (no framework overhead)
- No build process (no bundler overhead)
- Static content (no API latency)
- localStorage caching (resume sessions)
- Single CSS file (one HTTP request)

### Future Optimizations (if needed)

- Add `meta` tags for caching headers
- Minify CSS/JS before deployment (optional)
- Add service worker for offline support (PWA)
- Lazy-load commandments/creed content (only if size becomes issue)

---

## Accessibility Notes

**Current Support**:
- Semantic HTML structure
- Keyboard navigation (Tab, Enter)
- High contrast text

**Future Enhancements** (out of scope for MVP):
- ARIA labels for screen readers
- Focus indicators
- Skip navigation links
- Font size controls

---

## References

- **Luther's source text**: "A Simple Way to Pray" (1535)
- **Data model**: See `specs/001-luther-prayer-guide/data-model.md`
- **Feature spec**: See `specs/001-luther-prayer-guide/spec.md`
- **Research decisions**: See `specs/001-luther-prayer-guide/research.md`

---

## Support

For issues or questions:
1. Check this quickstart guide
2. Review troubleshooting section
3. Check browser console for errors
4. Open GitHub issue with details

---

## Quick Commands Reference

```bash
# Local development
cd docs && python3 -m http.server 8000

# Commit changes
git add docs/
git commit -m "Description of changes"
git push origin 001-luther-prayer-guide

# Check deployment status
# Visit: https://github.com/<user>/<repo>/actions
```

That's it! No build tools, no dependencies, no complexity. Just edit, commit, push, and it's live.
