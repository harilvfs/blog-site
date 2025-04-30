import { BlogPost, BlogPostMeta } from './types';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Installing Python and Setting Up a Virtual Environment',
    slug: 'installing-python-and-setting-up-a-virtual-environment',
    excerpt: 'A comprehensive guide on installing Python and setting up a virtual environment without using pip.',
    date: 'February 20, 2025',
    author: 'Hari Chalise',
    content: `
# Installing Python and Setting Up a Virtual Environment

## Introduction
Python is a powerful programming language widely used for development, scripting, and automation. This guide will walk you through installing Python on Arch Linux or any Arch-based distribution and setting up a virtual environment without relying on \`pip\`. If you encounter \`pip\` errors, we will also explain the reasons and solutions.

## Installing Python

> [!NOTE]
> Python comes preinstalled on **all** major Linux distributions, as many core components and tools depend on it. However, if it's missing or you need to upgrade or reinstall it, follow the instructions below.

### Arch Linux
You can install Python easily using the package manager:

\`\`\`bash
sudo pacman -S python
\`\`\`

This will install the latest version of Python available in the official Arch repositories.

### Debian / Ubuntu
Use \`apt\` to install Python:

\`\`\`bash
sudo apt update
sudo apt install python3
\`\`\`

### Fedora
Use \`dnf\` to install Python:

\`\`\`bash
sudo dnf install python3
\`\`\`

**Fedora comes with Python 3 pre-installed, but this command ensures it's available and up-to-date.**


## Why Avoid \`pip\` for Installing Python Packages?
Many users rely on \`pip\` for installing Python packages, but using \`pip\` system-wide can lead to conflicts with system packages managed by \`pacman\`. This can cause issues when upgrading your system or installing software that depends on specific Python versions.

> [!IMPORTANT]
> Never use \`sudo pip install\` for installing packages system-wide on Arch Linux. This can break system packages and cause dependency conflicts.

## Setting Up a Virtual Environment
A virtual environment allows you to create an isolated Python environment, preventing conflicts with system packages. To set up a virtual environment:

1. Navigate to your project directory:
   \`\`\`bash
   mkdir my_project && cd my_project
   \`\`\`

2. Create a virtual environment using \`venv\`:
   \`\`\`bash
   python -m venv venv
   \`\`\`

3. Activate the virtual environment:
   - For Bash/Zsh:
     \`\`\`bash
     source venv/bin/activate
     \`\`\`
   - For Fish shell:
     \`\`\`bash
     source venv/bin/activate.fish
     \`\`\`

4. Your terminal prompt should now indicate that you are inside a virtual environment.

> [!TIP]
> You can add an alias to your shell configuration file to quickly activate your virtual environments. For example: \`alias venv='source venv/bin/activate'\`

## Handling \`pip\` Errors
If you encounter errors when using \`pip\`, it may be due to missing dependencies or conflicts with system packages. Some common errors include:

- **Command Not Found**: Ensure \`python-ensurepip\` is installed:
  \`\`\`bash
  sudo pacman -S python-ensurepip
  \`\`\`

- **SSL Errors**: Some systems may require certificates to be installed:
  \`\`\`bash
  sudo pacman -S ca-certificates-mozilla
  \`\`\`

- **Permission Errors**: Avoid using \`pip\` with \`sudo\`. Instead, always install packages inside a virtual environment.
  \`\`\`bash
  pip install package_name
  \`\`\`

> [!CAUTION]
> When installing Python packages that require compilation, make sure you have the base-devel package group installed: \`sudo pacman -S base-devel\`

## Conclusion
Using a virtual environment is the best practice for Python development, as it isolates project dependencies and prevents system conflicts. By following this guide, you now have a clean and efficient Python setup that avoids modifying system-wide packages.
`,
    coverImage: '/images/post/python.jpg',
    tags: ['Python', 'Virtual Environment', 'Arch Linux']
  },
  {
    id: '2',
    title: 'Comprehensive Guide to Creating and Uploading an AUR Package',
    slug: 'comprehensive-guide-to-creating-and-uploading-an-aur-package',
    excerpt: 'Step-by-step guide to creating, building, and submitting a package to the Arch User Repository (AUR).',
    date: 'February 19, 2025',
    author: 'Hari Chalise',
    content: `
# Comprehensive Guide to Creating and Uploading an AUR Package

This guide provides a step-by-step tutorial on how to create, build, and upload a package to the Arch User Repository (AUR). Follow along to learn the entire process from setting up SSH keys to publishing your package.

> [!NOTE]
> This guide assumes you already have an Arch User Repository account. If you don't, visit https://aur.archlinux.org and create one first.

## Step 1: Set Up SSH Keys for AUR Access

Before you can push to the AUR, you need to set up SSH authentication.

\`\`\`sh
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa.pub
\`\`\`

Copy the output and add it to your [AUR account](https://aur.archlinux.org/account/) under the SSH key section.

> [!IMPORTANT]
> Never share your private SSH key. Only copy the contents of your public key (id_rsa.pub) to the AUR website.

To verify SSH connectivity:

\`\`\`sh
ssh aur@aur.archlinux.org
\`\`\`

If successful, you should see a welcome message.

## Step 2: Create and Structure Your AUR Package

Now, create a directory for your package:

\`\`\`sh
mkdir carch
cd carch
\`\`\`

Create the \`PKGBUILD\` file:

\`\`\`sh
touch PKGBUILD
\`\`\`

Edit \`PKGBUILD\` with the following template:

\`\`\`sh
# Maintainer: Your Name <your.email@example.com>
pkgname="carch"
pkgver="1.0.0"
pkgrel=1
pkgdesc="A script to automate Arch Linux setup"
arch=('x86_64')
url="https://harilvfs.github.io/carch/"
license=('MIT')
depends=('bash' 'libnewt')
source=("https://github.com/yourusername/carch/releases/download/v$pkgver/carch"
        "https://raw.githubusercontent.com/yourusername/carch/main/carch.desktop")
sha256sums=('SKIP' 'SKIP')

package() {
    install -Dm755 "$srcdir/carch" "$pkgdir/usr/bin/carch"
    install -Dm644 "$srcdir/carch.desktop" "$pkgdir/usr/share/applications/carch.desktop"
}
\`\`\`

> [!WARNING]
> Using 'SKIP' for sha256sums is only recommended for testing. For production packages, always provide actual checksums to ensure integrity.

## Step 3: Generate \`.SRCINFO\`

Generate the \`.SRCINFO\` file:

\`\`\`sh
makepkg --printsrcinfo > .SRCINFO
\`\`\`

> [!TIP]
> If you modify your PKGBUILD, always regenerate the .SRCINFO file. AUR uses this file to display package information on the website.

## Step 4: Initialize Git and Push to AUR

Now, initialize the Git repository and push the package to AUR.

\`\`\`sh
git init
git add .
git commit -m "Initial release of Carch"
git remote add aur ssh://aur@aur.archlinux.org/carch.git
git push aur master
\`\`\`

> [!CAUTION]
> Ensure your package name is unique and doesn't conflict with existing AUR or official repository packages. Check the AUR website before pushing.

## Step 5: Install and Test the AUR Package

Once your package is uploaded, install it using an AUR helper like \`yay\` or \`paru\`:

\`\`\`sh
yay -S carch
\`\`\`

Or manually clone and build:

\`\`\`sh
git clone https://aur.archlinux.org/carch.git
cd carch
makepkg -si
\`\`\`

## Additional Notes

- If you update your package, bump the \`pkgver\`, regenerate \`.SRCINFO\`, commit, and push the changes.
- Use \`makepkg -cf\` to test builds before uploading.
- Ensure all dependencies are correctly listed.
`,
    coverImage: '/images/post/archlinuxb.png',
    tags: ['PKGBUILD', 'AUR', 'Arch Linux']
  },
  {
    id: '3',
    title: 'Install Chaotic AUR on Arch Linux',
    slug: 'install-chaotic-aur-on-arch-linux',
    excerpt: 'A clean and enhanced guide to installing Chaotic AUR on Arch Linux and its derivatives.',
    date: 'February 18, 2025',
    author: 'Hari Chalise',
    content: `
# Install Chaotic AUR on Arch Linux

Chaotic AUR is an unofficial repository that provides pre-built binaries of popular AUR packages, reducing the need to compile them manually. This guide will walk you through setting it up on Arch Linux or any Arch-based distribution.

> [!NOTE]
> Chaotic AUR is not officially supported by Arch Linux. Use it at your own risk and be aware that it may affect system stability.

## Adding Chaotic AUR Repository

To enable Chaotic AUR, follow these steps:

### 1. Enable \`multilib\` Repository (if not already enabled)
Ensure that the \`multilib\` repository is enabled in your \`/etc/pacman.conf\` file:

\`\`\`bash
[multilib]
Include = /etc/pacman.d/mirrorlist
\`\`\`

After enabling, update the package database:

\`\`\`bash
sudo pacman -Sy
\`\`\`

> [!WARNING]
> Running \`pacman -Sy\` without a full upgrade (\`pacman -Syu\`) can lead to partial upgrades which may break packages. It's generally safer to always run a full system upgrade.

### 2. Import the Chaotic AUR Key
Before adding the repository, import the signing key:

\`\`\`bash
sudo pacman-key --init
sudo pacman-key --recv-key 3056513887B78AEB --keyserver keyserver.ubuntu.com
sudo pacman-key --lsign-key 3056513887B78AEB
\`\`\`

> [!IMPORTANT]
> Always verify GPG keys from a trusted source before importing them. The key shown here may change in the future.

### 3. Add the Chaotic AUR Repository
Append the following lines to your \`/etc/pacman.conf\` file:

\`\`\`bash
[chaotic-aur]
Include = /etc/pacman.d/chaotic-mirrorlist
\`\`\`

Next, add the Chaotic mirrorlist:

\`\`\`bash
sudo pacman -U --noconfirm 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-keyring.pkg.tar.zst'
sudo pacman -U --noconfirm 'https://cdn-mirror.chaotic.cx/chaotic-aur/chaotic-mirrorlist.pkg.tar.zst'
\`\`\`

### 4. Update Package Database
Now, refresh the package database to include Chaotic AUR:

\`\`\`bash
sudo pacman -Sy
\`\`\`

## Installing Packages from Chaotic AUR
You can now install pre-built AUR packages using Pacman. For example:

\`\`\`bash
sudo pacman -Syu package_name
\`\`\`

Replace \`package_name\` with the actual package you want to install.

### Example: Installing \`paru\` (AUR Helper)

\`\`\`bash
sudo pacman -S paru
\`\`\`

## Verifying Installation
To confirm that Chaotic AUR is set up correctly, list available packages:

\`\`\`bash
sudo pacman -Sl chaotic-aur | less
\`\`\`

## Removing Chaotic AUR (Optional)
If you wish to remove Chaotic AUR, follow these steps:

1. Remove Chaotic AUR entries from \`/etc/pacman.conf\`.
2. Delete the mirrorlist:

\`\`\`bash
sudo rm -f /etc/pacman.d/chaotic-mirrorlist
\`\`\`

3. Refresh the package database:

\`\`\`bash
sudo pacman -Sy
\`\`\`

> [!CAUTION]
> If you have installed packages from Chaotic AUR, removing the repository may affect future updates for those packages. Consider reinstalling them from the official repositories or AUR.

## Conclusion
Chaotic AUR is a great way to install AUR packages without compiling them manually. By following this guide, you can easily set up and use Chaotic AUR on your Arch-based system.
`,
    coverImage: '/images/post/arch.jpg',
    tags: ['arch linux', 'chaotic aur', 'aur', 'linux']
  },
  {
    id: '4',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    excerpt: 'Learn how to set up a new React project with TypeScript and understand the basics of TypeScript in React components.',
    date: 'Jan 23, 2025',
    author: 'Hari Chalise',
    content: `
# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. TypeScript adds static typing to JavaScript, which can help catch errors early and improve the developer experience with better tooling and autocompletion.

> [!NOTE]
> This guide assumes you have Node.js and npm already installed on your system. If not, install them before proceeding.

## Setting Up Your Project

You can create a new React project with TypeScript using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This will set up a new React project with TypeScript configuration already in place.

> [!TIP]
> You can also use Vite for a faster development experience: \`npm create vite@latest my-app -- --template react-ts\`

## Writing Your First Component

Here's a simple React component written in TypeScript:

\`\`\`tsx
import React, { useState } from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        backgroundColor: isHovered ? '#0056b3' : '#007bff',
        color: 'white',
        padding: '10px 15px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s'
      }}
    >
      {text}
    </button>
  );
};

export default Button;
\`\`\`

In this example, we define an interface \`ButtonProps\` that specifies the props our component can accept. The \`React.FC<ButtonProps>\` syntax tells TypeScript that this is a functional component that accepts props of type \`ButtonProps\`.

> [!IMPORTANT]
> Recent React documentation recommends not using \`React.FC\` and instead using plain function declarations with explicit return types when needed. Consider using: \`function Button({ text, onClick }: ButtonProps): JSX.Element\`

## Type Safety Benefits

Using TypeScript with React provides several benefits:

1. **Prop Type Checking**: TypeScript will warn you if you try to pass props of the wrong type to a component.
2. **Autocompletion**: Your IDE can provide better suggestions based on the types you've defined.
3. **Refactoring Support**: TypeScript makes it easier to refactor your code with confidence.
4. **Documentation**: Types serve as a form of documentation that stays up-to-date with your code.

> [!CAUTION]
> TypeScript's type checking only happens at compile time. It won't catch runtime errors such as API responses with unexpected formats, so always add proper error handling.

## Conclusion

React and TypeScript are a great combination for building maintainable web applications. The initial learning curve is worth the long-term benefits in code quality and developer productivity.

> [!WARNING]
> Don't overuse TypeScript features like \`any\` or type assertions (\`as\`), as they bypass TypeScript's type checking and reduce the benefits of using TypeScript in the first place.
`,
    coverImage: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  {
    id: '5',
    title: 'Building Beautiful Animations with Framer Motion',
    slug: 'building-beautiful-animations-with-framer-motion',
    excerpt: 'Explore how to create smooth, performant animations in your React applications using the Framer Motion library.',
    date: 'Jan 24, 2025',
    author: 'Hari Chalise',
    content: `
# Building Beautiful Animations with Framer Motion

Framer Motion is a powerful animation library for React that makes it easy to create smooth, interactive animations. It provides a simple API while still allowing for complex animation sequences.

## Getting Started

First, install Framer Motion in your React project:

\`\`\`bash
npm install framer-motion
\`\`\`

## Basic Animation

Here's a simple example of animating a div:

\`\`\`tsx
import { motion } from 'framer-motion';

const AnimatedBox = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      style={{
        width: 100,
        height: 100,
        backgroundColor: '#3a86ff',
        borderRadius: 10
      }}
    />
  );
};
\`\`\`

This creates a blue box that fades in and scales up when it mounts.

## Animation Variants

Variants allow you to define animation states that can be reused:

\`\`\`tsx
import { motion } from 'framer-motion';

const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 }
};

const AnimatedList = () => {
  return (
    <motion.ul
      variants={variants}
      initial="hidden"
      animate="visible"
      style={{ listStyle: 'none', padding: 0 }}
    >
      {[1, 2, 3, 4, 5].map(item => (
        <motion.li
          key={item}
          variants={itemVariants}
          style={{
            padding: '10px 20px',
            marginBottom: 10,
            backgroundColor: '#f1f1f1',
            borderRadius: 5
          }}
        >
          Item {item}
        </motion.li>
      ))}
    </motion.ul>
  );
};
\`\`\`

This creates a list where items animate in one after another.

## Gesture Animations

Framer Motion supports animated responses to user gestures:

\`\`\`tsx
import { motion } from 'framer-motion';

const InteractiveCard = () => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{
        width: 200,
        height: 120,
        backgroundColor: '#8338ec',
        borderRadius: 10,
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      Hover or tap me!
    </motion.div>
  );
};
\`\`\`

## Page Transitions

You can create smooth transitions between pages using Framer Motion's AnimatePresence:

\`\`\`tsx
import { AnimatePresence, motion } from 'framer-motion';
import { Switch, Route, useLocation } from 'react-router-dom';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

const App = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Switch location={location} key={location.pathname}>
        <Route path="/about">
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1>About Page</h1>
          </motion.div>
        </Route>
        <Route path="/">
          <motion.div
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            <h1>Home Page</h1>
          </motion.div>
        </Route>
      </Switch>
    </AnimatePresence>
  );
};
\`\`\`

## Conclusion

Framer Motion offers a delightful way to add animations to your React applications. The examples above just scratch the surface - the library provides many more capabilities like drag gestures, scroll animations, and layout animations.

By adding thoughtful animations to your UI, you can significantly improve the user experience and make your applications feel more polished and professional.
`,
    coverImage: 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'Animation', 'Framer Motion']
  },
  {
    id: '6',
    title: 'Creating a Markdown Blog with React',
    slug: 'creating-a-markdown-blog-with-react',
    excerpt: 'Learn how to build a blog that renders content from Markdown files using React and related libraries.',
    date: 'Jan 25, 2025',
    author: 'Hari Chalise',
    content: `
# Creating a Markdown Blog with React

Markdown is a lightweight markup language that's perfect for writing blog content. When combined with React, you can create a powerful and flexible blogging platform. In this post, we'll explore how to build a Markdown-powered blog using React.

## Why Markdown?

Markdown offers several advantages for a blog:

1. **Simplicity**: It's easy to learn and write
2. **Portability**: Markdown files can be used anywhere
3. **Version Control**: Works well with systems like Git
4. **Focus on Content**: Less distraction from formatting

## Setting Up the Project

First, create a new React project and install the necessary packages:

\`\`\`bash
npx create-react-app markdown-blog
cd markdown-blog
npm install react-markdown react-router-dom
\`\`\`

## Parsing Markdown

The react-markdown package makes it easy to render Markdown in your React components:

\`\`\`tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
\`\`\`

## Styling Markdown Content

To make your Markdown content look good, you'll need some CSS:

\`\`\`css
.markdown-content h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.markdown-content h2 {
  font-size: 2rem;
  margin: 2rem 0 1rem;
}

.markdown-content h3 {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.75rem;
}

.markdown-content p {
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  line-height: 1.7;
}

.markdown-content ul, 
.markdown-content ol {
  margin-bottom: 1.5rem;
  padding-left: 2rem;
}

.markdown-content blockquote {
  border-left: 4px solid #3a86ff;
  padding-left: 1rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: #555;
}

.markdown-content pre {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.markdown-content code {
  font-family: monospace;
  background-color: #f4f4f4;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9rem;
}
\`\`\`

## Loading Blog Posts

In a real-world scenario, you might load your Markdown content from an API or directly from files. For this example, we'll use a simple array of blog post objects:

\`\`\`tsx
interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  content: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with Markdown',
    slug: 'getting-started-with-markdown',
    excerpt: 'Learn the basics of Markdown syntax.',
    date: 'June 1, 2023',
    content: '# Getting Started with Markdown\\n\\nMarkdown is a lightweight...'
  },
  // More blog posts...
];

export const getBlogPosts = (): BlogPost[] => {
  return blogPosts;
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
\`\`\`

## Creating the Blog Post Page

Now we can create a page component to display a blog post:

\`\`\`tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { getBlogPostBySlug } from '../utils/blogLoader';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return <div>Post not found</div>;
  }
  
  return (
    <article className="blog-post">
      <header>
        <h1>{post.title}</h1>
        <time>{post.date}</time>
      </header>
      <MarkdownRenderer content={post.content} />
    </article>
  );
};

export default BlogPostPage;
\`\`\`

## Setting Up Routing

Finally, set up routing to navigate between the blog list and individual posts:

\`\`\`tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog" element={<BlogListPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
};

export default App;
\`\`\`

## Conclusion

Building a Markdown blog with React gives you a flexible and powerful platform for your content. You can extend this basic setup in many ways:

- Add code syntax highlighting with libraries like \`prism-react-renderer\`
- Support for frontmatter in your Markdown files with \`gray-matter\`
- Add image optimization
- Implement a CMS or connect to a headless CMS
- Add comments, likes, and sharing functionality

With this foundation, you're well on your way to creating a beautiful and functional Markdown-powered blog!
`,
    coverImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    tags: ['React', 'Markdown', 'Blog']
  }
];

export const getBlogPosts = (): BlogPostMeta[] => {
  const postsWithParsedDates = blogPosts.map(post => {
    const { id, title, slug, excerpt, date, coverImage, tags, author } = post;
    return {
      id,
      title,
      slug,
      excerpt,
      date,
      coverImage,
      tags,
      author,
      dateObj: new Date(date)
    };
  });
  
  const sortedPosts = postsWithParsedDates.sort((a, b) => b.dateObj.getTime() - a.dateObj.getTime());
  
  return sortedPosts.map(({ dateObj, ...post }) => post);
};

export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};
