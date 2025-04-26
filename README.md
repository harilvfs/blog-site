<img src="https://img.shields.io/badge/Made%20with%20❤️-React%20&%20TypeScript-ffd5ff?style=for-the-badge&color=ffd5ff&logoColor=61DAFB&labelColor=1c1c29&logo=react" alt="Badge" />

[![github actions build status][check]][link]

#### Hey! 👋 This is a chill little blog site made with React. Here’s how you can get it going.

## Quick Start

```bash
# Install everything you need
bun install

# Start the dev server
bun start

# Make a production build
bun run build
```

## Deploying to GitHub Pages

This site auto-deploys using GitHub Actions:

- Take a look at `.github/workflows/pages.yml`
- Go to your repo’s Settings > Pages
- Pick "GitHub Actions" as the source
- Push to the `main` branch and it’ll deploy on its own

Your blog will show up at: `https://yourusername.github.io/blog-site`

> [!NOTE]  
> Remember to change the home page URL in the `package.json` file to your username.  
> And important one — if you fork and change the repo name, make sure to change the `basename` in `App.tsx`:  
> ```typescript
> <Router basename="/your-repo-name">
> ```

## What’s Inside

- React + TypeScript
- Write posts using Markdown
- Looks good on phones and computers
- Super fast with Bun

## Making It Yours

Wanna change the posts?
Just edit the file: `src/utils/blogLoader.ts`

## License

MIT License — check out the [LICENSE](https://github.com/harilvfs/blog-site/blob/main/LICENSE) file if you’re curious.

[check]: https://github.com/harilvfs/blog-site/actions/workflows/pages.yml/badge.svg
[link]: https://github.com/harilvfs/blog-site/actions/workflows/pages.yml
