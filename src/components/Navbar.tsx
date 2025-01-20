import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, User, Briefcase, Moon, Sun, Mail, MonitorDot, FileText, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/theme-provider';
import { useSettings } from '@/hooks/useSettings';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { data: settings } = useSettings();
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
              {settings?.site_name}
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
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

            <Link to="/categories">
              <Button variant="ghost" className="flex items-center space-x-2">
                <FolderOpen className="h-5 w-5" />
                <span>Kategoriler</span>
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

          {/* Mobile Menu */}
          <div className="flex md:hidden items-center space-x-2">
            <Link to="/contact">
              <Button variant="ghost" size="icon">
                <Mail className="h-5 w-5" />
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

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col space-y-4 mt-4">
                  <Link to="/" className="flex items-center space-x-2">
                    <Home className="h-5 w-5" />
                    <span>Ana Sayfa</span>
                  </Link>
                  <Link to="/about" className="flex items-center space-x-2">
                    <User className="h-5 w-5" />
                    <span>Hakkımda</span>
                  </Link>
                  <Link to="/posts" className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Yazılar</span>
                  </Link>
                  <Link to="/projects" className="flex items-center space-x-2">
                    <Briefcase className="h-5 w-5" />
                    <span>Projeler</span>
                  </Link>
                  <Link to="/categories" className="flex items-center space-x-2">
                    <FolderOpen className="h-5 w-5" />
                    <span>Kategoriler</span>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}