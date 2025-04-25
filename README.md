# Markdown Blog

A minimal and beautiful blog built with React, TypeScript, and Framer Motion. This blog renders content from Markdown and features subtle animations to enhance the user experience.

## Features

- **Responsive Design**: Works on all devices from mobile to desktop
- **Markdown Support**: Write blog posts in Markdown format
- **Beautiful Animations**: Subtle animations using Framer Motion
- **TypeScript**: Full type safety throughout the application
- **Search Functionality**: Filter blog posts by title, excerpt, or tags
- **Clean UI**: Minimal design focused on content

## Tech Stack

- React
- TypeScript
- React Router
- Framer Motion
- React Markdown

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/markdown-blog.git
cd markdown-blog
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
/src
  /components       # Reusable UI components
  /pages            # Page components
  /styles           # CSS files
  /utils            # Utility functions and types
  /content          # Markdown content
  /assets           # Static assets like images
  App.tsx           # Main App component
  index.tsx         # Entry point
```

## Adding Blog Posts

Blog posts are currently loaded from a mock database in `src/utils/blogLoader.ts`. In a real-world application, you would typically:

1. Store Markdown files in the `/content` directory
2. Parse frontmatter using a library like `gray-matter`
3. Load content dynamically based on routes

## Customization

- **Colors**: Update the color variables in `src/styles/global.css`
- **Animations**: Modify animation parameters in `src/utils/animations.ts`
- **Typography**: Change font styles in the CSS files

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 