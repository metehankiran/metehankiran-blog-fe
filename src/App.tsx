import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Projects from '@/pages/Projects';
import ProjectDetail from '@/pages/ProjectDetail';
import BlogPost from '@/pages/BlogPost';
import Contact from '@/pages/Contact';
import { HelmetProvider } from 'react-helmet-async';
import ScrollToTop from '@/components/ScrollToTop';
import Posts from '@/pages/Posts';
import Categories from '@/pages/Categories';
import CategoryDetail from '@/pages/CategoryDetail';
import { Providers } from './providers/Providers';

function App() {
  return (
    <Providers>
      <HelmetProvider>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Router>
            <ScrollToTop />
            <div className="min-h-screen flex flex-col animated-gradient">
              <Navbar />
              <main className="flex-1 container mx-auto px-4 py-8">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/project/:slug" element={<ProjectDetail />} />
                  <Route path="/posts" element={<Posts />} />
                  <Route path="/post/:slug" element={<BlogPost />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/category/:slug" element={<CategoryDetail />} />
                </Routes>
              </main>
              <Footer />
            </div>
            <Toaster />
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </Providers>
  );
}

export default App;