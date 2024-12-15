import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Moon, Sun, Mail, MonitorDot, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
            
            <Link to="/posts">
              <Button variant="ghost" className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Yazılar</span>
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {theme === 'dark' ? (
                    <Moon className="h-5 w-5" />
                  ) : theme === 'light' ? (
                    <Sun className="h-5 w-5" />
                  ) : (
                    <MonitorDot className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="mr-2 h-4 w-4" />
                  <span>Açık</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="mr-2 h-4 w-4" />
                  <span>Koyu</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  <MonitorDot className="mr-2 h-4 w-4" />
                  <span>Sistem</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}