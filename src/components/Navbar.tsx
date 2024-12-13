import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Moon, Sun, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Blog
            </span>
          </Link>
          
          <div className="flex items-center space-x-1">
            <Link to="/">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="ghost" className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>About</span>
              </Button>
            </Link>
            
            <Link to="/projects">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Briefcase className="h-5 w-5" />
                <span>Projects</span>
              </Button>
            </Link>

            <Link to="/contact">
              <Button variant="ghost" className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>İletişim</span>
              </Button>
            </Link>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}