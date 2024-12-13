import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Burada form gönderme işlemi simüle ediliyor
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success('Mesajınız başarıyla gönderildi!');
    setIsSubmitting(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <>
      <Helmet>
        <title>İletişim | Blog</title>
      </Helmet>

      <div className="max-w-5xl mx-auto space-y-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            İletişime Geçin
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sorularınız, önerileriniz veya iş birliği teklifleriniz için benimle iletişime geçebilirsiniz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* İletişim Formu */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    İsim
                  </label>
                  <Input
                    id="name"
                    placeholder="Adınız Soyadınız"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    E-posta
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ornek@email.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Konu
                  </label>
                  <Input
                    id="subject"
                    placeholder="Mesajınızın konusu"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Mesaj
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Mesajınızı buraya yazın..."
                    rows={6}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center"
                    >
                      Gönderiliyor...
                    </motion.div>
                  ) : (
                    <span className="flex items-center">
                      Gönder
                      <Send className="ml-2 h-4 w-4" />
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>

          {/* İletişim Bilgileri */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* İletişim Kartları */}
            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">E-posta</h3>
                <p className="text-sm text-muted-foreground">
                  iletisim@example.com
                </p>
              </div>
            </Card>

            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Telefon</h3>
                <p className="text-sm text-muted-foreground">
                  +90 (555) 123 45 67
                </p>
              </div>
            </Card>

            <Card className="p-4 flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Konum</h3>
                <p className="text-sm text-muted-foreground">
                  İstanbul, Türkiye
                </p>
              </div>
            </Card>

            {/* Sosyal Medya Linkleri */}
            <Card className="p-6">
              <h3 className="font-medium mb-4">Sosyal Medya</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-4 w-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    <Twitter className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </>
  );
} 