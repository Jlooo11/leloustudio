import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote: "Une expérience incroyable du début à la fin. Très professionnel et à l'écoute. Les photos sont magnifiques !",
    name: "Aïcha K.",
    category: "Mariage"
  },
  {
    id: 2,
    quote: "LelouStudio a su comprendre notre vision et la sublimer. Un travail créatif et de grande qualité.",
    name: "Mamadou D.",
    category: "Corporate"
  },
  {
    id: 3,
    quote: "Je recommande à 100% ! Les photos sont encore plus belles que ce que j'imaginais.",
    name: "Sabrina L.",
    category: "Shooting Beauté"
  }
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="avis" className="py-24 bg-white border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-black/20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">04</span>
            <span className="h-px w-8 bg-black/20"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wider mb-4">Avis Clients</h2>
        </div>

        <div className="relative w-full max-w-5xl mx-auto flex items-center justify-center">
          
          <button 
            onClick={prevTestimonial}
            className="absolute left-0 md:-left-12 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black text-black hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="overflow-hidden w-full px-12 md:px-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* On desktop, show 3. On mobile, show only current. */}
                {testimonials.map((t, i) => {
                  const isVisibleOnMobile = i === currentIndex;
                  return (
                    <div 
                      key={t.id} 
                      className={`bg-[#f8f9fa] p-8 rounded-2xl flex flex-col items-center text-center shadow-sm border border-black/5 ${
                        isVisibleOnMobile ? 'block' : 'hidden md:flex'
                      }`}
                    >
                      <div className="flex gap-1 mb-6 text-black">
                        {[...Array(5)].map((_, idx) => (
                          <Star key={idx} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-sm text-black/70 italic mb-8 flex-1">
                        "{t.quote}"
                      </p>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-black">{t.name}</h4>
                        <p className="text-[10px] uppercase tracking-widest text-black/40 mt-1">{t.category}</p>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextTestimonial}
            className="absolute right-0 md:-right-12 z-10 w-10 h-10 rounded-full bg-black/5 hover:bg-black text-black hover:text-white transition-colors flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-colors ${
                idx === currentIndex ? 'bg-black' : 'bg-black/20'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
