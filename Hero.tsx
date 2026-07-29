import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface CollageSlide {
  id: number;
  title: string;
  subtitle: string;
  images: [string, string, string, string]; // 4 photos per collage
}

const collageSlides: CollageSlide[] = [
  {
    id: 1,
    title: "Beauté & Émotion",
    subtitle: "Découvrez notre art du portrait et de la célébration nuptiale",
    images: [
      "/mariage/_DSC1347_Original.jpeg",
      "/beaute/LEL02823.jpg",
      "/beaute/LEL02806.jpg",
      "/beaute/LEL09351.jpg"
    ]
  },
  {
    id: 2,
    title: "Culture & Traditions",
    subtitle: "Sublimer vos cérémonies de dote avec élégance et authenticité",
    images: [
      "/dote/LEL04762.jpg",
      "/dote/LEL04852.jpg",
      "/dote/LEL05061.jpg",
      "/dote/LEL04913.jpg"
    ]
  },
  {
    id: 3,
    title: "Studio & Lumière",
    subtitle: "Une maîtrise technique au service de vos créations de mode",
    images: [
      "/studio/LEL02615.jpg",
      "/studio/LEL02751.jpg",
      "/studio/LEL02755.jpg",
      "/studio/LEL03005.jpg"
    ]
  },
  {
    id: 4,
    title: "Famille & Maternité",
    subtitle: "Immortaliser les moments précieux et la complicité des vos proches",
    images: [
      "/grossesse/LEL08567.jpg",
      "/famille/DSC03674.jpeg",
      "/anniversaire/LEL09480.jpg",
      "/grossesse/LEL08608.jpg"
    ]
  },
  {
    id: 5,
    title: "Corporate & Image de Marque",
    subtitle: "Des visuels d'impact pour vos produits et votre communication",
    images: [
      "/corporate/LEL02135.jpeg",
      "/produit cosmetique/DSC09d902_(2)_Original.jpeg",
      "/vetement/DSC00033.jpeg",
      "/corporate/DSC02233.jpg"
    ]
  }
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % collageSlides.length);
    }, 7000); // Change slide every 7 seconds
    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % collageSlides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? collageSlides.length - 1 : prev - 1));
  };

  const activeCollage = collageSlides[currentSlide];

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
      
      {/* Background Collage Grid with Motion Animation */}
      <div className="absolute inset-0 z-0 opacity-80">
        <AnimatePresence mode="popLayout">
          <motion.div 
            key={activeCollage.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full grid grid-cols-2 md:grid-cols-4 gap-1 p-1"
          >
            {/* Photo 1: Large Main Image (Spans 2 rows on desktop) */}
            <div className="relative col-span-2 row-span-2 md:col-span-2 md:row-span-2 overflow-hidden bg-neutral-900 group">
              <motion.img 
                src={activeCollage.images[0]} 
                alt="Collage 1"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Photo 2 */}
            <div className="relative col-span-1 row-span-1 overflow-hidden bg-neutral-900 group">
              <motion.img 
                src={activeCollage.images[1]} 
                alt="Collage 2"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/25"></div>
            </div>

            {/* Photo 3 */}
            <div className="relative col-span-1 row-span-1 overflow-hidden bg-neutral-900 group">
              <motion.img 
                src={activeCollage.images[2]} 
                alt="Collage 3"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/25"></div>
            </div>

            {/* Photo 4 (Full width bottom on mobile / grid on desktop) */}
            <div className="relative col-span-2 md:col-span-2 row-span-1 overflow-hidden bg-neutral-900 group">
              <motion.img 
                src={activeCollage.images[3]} 
                alt="Collage 4"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 7, ease: "linear" }}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-black/30"></div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Gradient Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/60 z-10 pointer-events-none"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 container mx-auto px-6 flex flex-col items-center text-center mt-16 md:mt-20">
        
        {/* Category Pill Tag */}
        <motion.div
          key={`tag-${activeCollage.id}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
        >
          <Sparkles className="w-3 h-3 text-white/80" />
          <span>{activeCollage.title}</span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-wider uppercase mb-4 text-white drop-shadow-md"
        >
          LELOUSTUDIO
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          key={`sub-${activeCollage.id}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-base md:text-xl lg:text-2xl font-light mb-10 text-white/90 max-w-2xl leading-relaxed"
        >
          {activeCollage.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto"
        >
          <a 
            href="#galerie" 
            className="px-8 py-4 border border-white/60 hover:bg-white hover:text-black transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] w-full sm:w-auto rounded-full backdrop-blur-sm"
          >
            Découvrir le portfolio ({collageSlides.length * 4}+ photos)
          </a>
          <a 
            href="#contact" 
            className="px-8 py-4 bg-white text-black hover:bg-white/90 transition-all duration-300 text-xs font-bold uppercase tracking-[0.2em] w-full sm:w-auto rounded-full shadow-lg"
          >
            Réserver une séance
          </a>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110"
        aria-label="Collage précédent"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/40 hover:bg-white hover:text-black text-white border border-white/20 backdrop-blur-md transition-all hover:scale-110"
        aria-label="Collage suivant"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-30 bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
        {collageSlides.map((slide, i) => (
          <button
            key={slide.id}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all duration-300 ${
              i === currentSlide 
                ? 'w-8 h-2 bg-white rounded-full' 
                : 'w-2 h-2 bg-white/40 hover:bg-white/70 rounded-full'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
