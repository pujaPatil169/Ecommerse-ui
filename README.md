# Ecommerse-ui

## Deployment to GitHub Pages

1. Commit your changes to main branch:
```bash
git add .
git commit -m "Prepare for deployment"
git push origin main
```

2. Run the deployment script (this builds and creates gh-pages branch):
```bash
npm run deploy
```

3. For first deployment, force push gh-pages branch:
```bash
git push --set-upstream origin gh-pages --force
```

Note: Force push is only needed for the first deployment to establish the branch.
Subsequent deployments can use regular push.

This will:
- First build the production version (equivalent to `npm run build`)
- Deploy it to the `gh-pages` branch
- Make it available at `https://[your-github-username].github.io/Ecommerse-ui/`

Note: The base path in vite.config.js must match your repository name.
