# Ecommerse-ui

## Deployment to GitHub Pages

1. Ensure all changes are committed and pushed to GitHub
2. Run the deployment script (this automatically builds the app first):
```bash
npm run deploy
```

This will:
- First build the production version (equivalent to `npm run build`)
- Deploy it to the `gh-pages` branch
- Make it available at `https://[your-github-username].github.io/Ecommerse-ui/`

Note: The base path in vite.config.js must match your repository name.
