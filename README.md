# Luther Prayer Guide

A simple web application that guides users through Martin Luther's prayer method using the seven petitions of the Lord's Prayer, the Ten Commandments, and the Apostle's Creed.

## Overview

This project implements Luther's "A Simple Way to Pray" (1535) as an interactive, user-paced prayer guide. The application presents static content with two methods:

- **Lord's Prayer (7 petitions)**: Each short petition is expanded into a fuller prayer meditation
- **Ten Commandments**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)
- **Apostle's Creed**: Uses the four-stranded garland method (instruction, thanksgiving, confession, prayer)

## Features

- **P1 (MVP)**: Seven petitions of the Lord's Prayer with Luther's meditations
- **P2**: Ten Commandments with four-stranded garland reflections
- **P3**: Apostle's Creed with four-stranded garland reflections
- User-paced navigation (no time limits)
- Session state persistence (localStorage)
- Distraction-free, contemplative design
- Works offline after initial load
- Keyboard navigation support

## Technology Stack

- HTML5, CSS3, JavaScript (ES6+)
- No frameworks or build tools
- Vanilla JavaScript with ES6 modules
- Hosted on GitHub Pages

## Quick Start

### Local Development

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd pray-v2
   ```

2. Start a local web server:
   ```bash
   cd docs
   python3 -m http.server 8000
   ```

3. Open `http://localhost:8000` in your browser

### Deployment

This project is configured for GitHub Pages deployment:

1. Enable GitHub Pages in repository settings
2. Set source to `/docs` folder on your branch
3. Push changes to deploy automatically

## Project Structure

```
docs/                    # GitHub Pages root
├── index.html          # Main entry point
├── styles.css          # All styling
├── app.js              # Navigation and state management
└── content/
    ├── petitions.js    # Seven petitions content
    ├── commandments.js # Ten Commandments content
    └── creed.js        # Apostle's Creed content
```

## Documentation

For detailed development instructions, see the [Quickstart Guide](specs/001-luther-prayer-guide/quickstart.md).

Additional documentation:
- [Feature Specification](specs/001-luther-prayer-guide/spec.md)
- [Implementation Plan](specs/001-luther-prayer-guide/plan.md)
- [Data Model](specs/001-luther-prayer-guide/data-model.md)
- [Research & Decisions](specs/001-luther-prayer-guide/research.md)

## Testing

Manual testing is used for this low-risk static content feature:

- Navigate through all petitions/commandments/creed articles
- Verify content displays correctly
- Test keyboard navigation
- Test on multiple browsers and devices
- Verify localStorage persistence

## License

Content based on Martin Luther's "A Simple Way to Pray" (1535), public domain.

## Support

For issues or questions, please open a GitHub issue.
