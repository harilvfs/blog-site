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

> [!IMPORTANT]  
> Since I'm deploying the site with Cloudflare, I had to either change or remove the `basename` so everything works properly there.  
> So I’ve removed the router `basename`, updated the image paths, and also removed the `homepage` field in `package.json`.  
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
> You can remove or leave the `baseUrl` field.
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
> After making these changes, the site should deploy and work fine on **GitHub Pages**.  
> But just a heads-up — it probably won’t work perfectly with **Cloudflare** in that case.  
>  
> So yeah, the current setup in the repo is configured to work with **Cloudflare**, but it might break on GitHub Pages.  
>  
> **Choose whichever setup works best for you. 🙌**


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
