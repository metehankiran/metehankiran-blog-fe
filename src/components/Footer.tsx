import { Separator } from '@/components/ui/separator';
import { Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo ve Açıklama */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-bold">
              <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
                Blog
              </span>
            </h2>
            <p className="text-sm text-muted-foreground">
              Modern web teknolojileri, yazılım geliştirme ve yapay zeka hakkında güncel içerikler.
            </p>
          </div>

          {/* Hızlı Linkler */}
          <div className="space-y-4">
            <h3 className="font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-foreground transition">Ana Sayfa</a>
              </li>
              <li>
                <a href="/about" className="hover:text-foreground transition">Hakkımda</a>
              </li>
              <li>
                <a href="/posts" className="hover:text-foreground transition">Yazılar</a>
              </li>
              <li>
                <a href="/projects" className="hover:text-foreground transition">Projeler</a>
              </li>
              <li>
                <a href="/contact" className="hover:text-foreground transition">İletişim</a>
              </li>
            </ul>
          </div>

          {/* İletişim */}
          <div className="space-y-4">
            <h3 className="font-semibold">İletişim</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>iletisim@example.com</li>
              <li>+90 (555) 123 45 67</li>
              <li>İstanbul, Türkiye</li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Blog. Tüm hakları saklıdır.
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