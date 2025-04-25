import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { motion, LazyMotion, domAnimation } from 'framer-motion';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import AboutPage from './pages/AboutPage';
import { ThemeProvider } from './utils/ThemeContext';
import './styles/global.css';

// Wrapper component for page transitions
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <LazyMotion features={domAnimation}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HomePage />
          </motion.div>
        } />
        <Route path="/blog" element={
          <motion.div
            key="blog-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlogListPage />
          </motion.div>
        } />
        <Route path="/blog/:id" element={
          <motion.div
            key="blog-post"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <BlogPostPage />
          </motion.div>
        } />
        <Route path="/about" element={
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <AboutPage />
          </motion.div>
        } />
        {/* Catch all route - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </LazyMotion>
  );
};

// Layout component that wraps the main content
const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="main-content">
        <AnimatedRoutes />
      </main>
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Router>
        <Layout />
      </Router>
    </ThemeProvider>
  );
};

export default App; 