import { BlogPost, BlogPostMeta } from './types';

// This is a mock database of blog posts
// In a real app, you'd fetch this data from an API or file system
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Getting Started with React and TypeScript',
    slug: 'getting-started-with-react-and-typescript',
    excerpt: 'Learn how to set up a new React project with TypeScript and understand the basics of TypeScript in React components.',
    date: 'May 15, 2023',
    content: `
# Getting Started with React and TypeScript

React and TypeScript make a powerful combination for building robust web applications. TypeScript adds static typing to JavaScript, which can help catch errors early and improve the developer experience with better tooling and autocompletion.

## Setting Up Your Project

You can create a new React project with TypeScript using Create React App:

\`\`\`bash
npx create-react-app my-app --template typescript
\`\`\`

This will set up a new React project with TypeScript configuration already in place.

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

## Type Safety Benefits

Using TypeScript with React provides several benefits:

1. **Prop Type Checking**: TypeScript will warn you if you try to pass props of the wrong type to a component.
2. **Autocompletion**: Your IDE can provide better suggestions based on the types you've defined.
3. **Refactoring Support**: TypeScript makes it easier to refactor your code with confidence.
4. **Documentation**: Types serve as a form of documentation that stays up-to-date with your code.

## Conclusion

React and TypeScript are a great combination for building maintainable web applications. The initial learning curve is worth the long-term benefits in code quality and developer productivity.
`,
    coverImage: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'TypeScript', 'Web Development']
  },
  {
    id: '2',
    title: 'Building Beautiful Animations with Framer Motion',
    slug: 'building-beautiful-animations-with-framer-motion',
    excerpt: 'Explore how to create smooth, performant animations in your React applications using the Framer Motion library.',
    date: 'June 3, 2023',
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
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'Animation', 'Framer Motion']
  },
  {
    id: '3',
    title: 'Creating a Markdown Blog with React',
    slug: 'creating-a-markdown-blog-with-react',
    excerpt: 'Learn how to build a blog that renders content from Markdown files using React and related libraries.',
    date: 'July 10, 2023',
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
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    tags: ['React', 'Markdown', 'Blog']
  }
];

// Get all blog posts (without full content for listing)
export const getBlogPosts = (): BlogPostMeta[] => {
  return blogPosts.map(({ id, title, slug, excerpt, date, coverImage, tags }) => ({
    id,
    title,
    slug,
    excerpt,
    date,
    coverImage,
    tags
  }));
};

// Get a specific blog post by ID
export const getBlogPostById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Get a specific blog post by slug
export const getBlogPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
}; 