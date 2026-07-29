import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, ChevronRight, Menu, X, Instagram, Facebook } from 'lucide-react';

const navLinks = [
  { name: 'Accueil', href: '#accueil' },
  { name: 'Services', href: '#services' },
  { name: 'Galerie', href: '#galerie' },
  { name: 'Mon histoire', href: '#histoire' },
  { name: 'Avis clients', href: '#avis' },
  { name: 'Tarifs', href: '#tarifs' },
  { name: 'Contact', href: '#contact' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-studio-light/90 backdrop-blur-md py-4 shadow-sm border-b border-studio-dark/10' : 'bg-transparent py-8 border-b border-studio-dark/10'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <a href="#" className="flex flex-col group">
            <span className="text-2xl font-bold tracking-tighter uppercase text-studio-dark group-hover:opacity-70 transition-opacity">Lelou Studio</span>
            <span className="text-[10px] uppercase tracking-[0.3em] opacity-60 text-studio-dark -mt-1">Production Visuelle</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-10 text-[11px] font-semibold uppercase tracking-widest text-studio-dark">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:opacity-50 transition-opacity duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-studio-dark hover:opacity-50 transition-opacity"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed inset-0 z-50 bg-studio-dark flex flex-col"
          >
            <div className="p-6 flex justify-end">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-studio-light hover:opacity-50 p-2"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-studio-light hover:opacity-50 transition-opacity"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">{children}</main>

      <footer className="px-6 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12 bg-white text-black border-t border-black/10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <Camera className="w-5 h-5" />
            <span className="font-serif text-lg tracking-wide uppercase">LelouStudio</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-40">© 2026 LelouStudio — Tous droits réservés.</p>
        </div>
        
        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-widest font-bold opacity-40 mb-2">Navigation</p>
          <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-widest font-semibold opacity-80">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:opacity-50 transition-opacity">
                {link.name}
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[9px] uppercase tracking-widest font-bold opacity-40 mb-2">Réseaux sociaux</p>
          <div className="flex gap-4 text-[10px] uppercase tracking-widest font-semibold opacity-80">
            <a href="https://www.instagram.com/lelou__studio___" target="_blank" rel="noopener noreferrer" className="hover:opacity-50 transition-opacity">Instagram</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Facebook</a>
            <a href="#" className="hover:opacity-50 transition-opacity">Behance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
