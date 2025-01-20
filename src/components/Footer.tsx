import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSettings } from '@/hooks/useSettings';

export default function Footer() {
  const { data: settings } = useSettings();

  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                {settings?.site_name || 'Blog'}
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              {settings?.site_description || 'Modern web teknolojileri, yazılım geliştirme ve yapay zeka hakkında güncel içerikler.'}
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-foreground transition">Ana Sayfa</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-foreground transition">Hakkımda</Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-foreground transition">Kategoriler</Link>
              </li>
              <li>
                <Link to="/posts" className="hover:text-foreground transition">Yazılar</Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-foreground transition">Projeler</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-foreground transition">İletişim</Link>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-semibold">İletişim</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>{settings?.contact_email || 'iletisim@example.com'}</li>
              <li>{settings?.site_author || 'Blog Yazarı'}</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 {settings?.site_name || 'Blog'}. Tüm hakları saklıdır.
          </p>
          
          <div className="flex space-x-4">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}