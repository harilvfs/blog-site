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

If you want to deploy the site, you can use my workflow:

- Take a look at `.github/workflows/pages.yml`
- Go to your repo’s Settings > Pages
- Pick "GitHub Actions" as the source
- Push to the `main` branch and it’ll deploy on its own

Your blog will show up at: `https://yourusername.github.io/blog-site`

> [!IMPORTANT]
>
> ## Update
> 
> As this site is for my personal use, and I obviously prefer Cloudflare for deployment:
> 
> If you want to deploy it using **GitHub Pages**, you’ll need to make a few changes:  
>  
> **In `src/App.tsx`:**
> ```tsx
> <Router basename="/your-repo-name">
> ```
>  
> **In `package.json`:**  
> Add the `homepage` field with your GitHub Pages deploy URL:
> ```json
> "homepage": "https://your-username.github.io/your-repo-name"
> ```
>
> Also, change the `baseUrl` to your repo name:
> ```json
> "baseUrl": "your-repo-name/",
> ```
>
> Update the image paths in the following files:
>  
> **In `src/components/Footer.tsx`:**
> ```tsx
> src="/images/aayush.png" → src="/your-repo-name/images/your-image.png"
> ```
>  
> **In `src/components/Navbar.tsx`:**
> ```tsx
> src="/images/aayush.png" → src="/your-repo-name/images/your-image.png"
> ```
>  
> **In `src/pages/HomePage.tsx`:**
> ```tsx
> src="/images/aayush.png" → src="/your-repo-name/images/your-image.png"
> ```
>  
> Also, if you're using GitHub Pages, change `HashRouter` to `BrowserRouter` in `src/App.tsx`:
> ```typescript
> import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
> ```

## Blog Posts

Wanna change the posts?
Just edit the file: `src/utils/blogLoader.ts`

## License

MIT License — check out the [LICENSE](https://github.com/harilvfs/blog-site/blob/main/LICENSE) file if you’re curious.

[check]: https://github.com/harilvfs/blog-site/actions/workflows/pages.yml/badge.svg
[link]: https://github.com/harilvfs/blog-site/actions/workflows/pages.yml
