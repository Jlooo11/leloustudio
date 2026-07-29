import React from 'react';
import { motion } from 'motion/react';

export function About() {
  return (
    <section id="histoire" className="py-24 bg-[#f8f9fa] relative border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24 items-center max-w-6xl mx-auto">
          
          {/* Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/3] md:aspect-square lg:aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="/studio/LEL08106.jpg" 
                alt="Portrait du Photographe" 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
            
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-black/5 rounded-full blur-3xl -z-10"></div>
          </motion.div>

          {/* Text */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-8 bg-black/20"></span>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">03</span>
            </div>
            
            <h2 className="font-serif text-4xl lg:text-5xl uppercase tracking-wider text-black">
              MON HISTOIRE
            </h2>
            
            <div className="space-y-6 text-sm text-black/70 leading-relaxed font-light">
              <p>
                Derrière chaque image se cache une histoire.
              </p>
              <p>
                Je ne cherche pas simplement à prendre des photos. Mon objectif est de créer des images qui traversent le temps, capturent les émotions et mettent en valeur chaque personne, chaque marque et chaque projet.
              </p>
              <p>
                Bienvenue dans l'univers de <span className="font-semibold text-black">LelouStudio</span>.
              </p>
            </div>
            
            <div className="pt-8 border-t border-black/10">
              {/* Fake signature placeholder */}
              <p className="font-serif text-3xl italic text-black/80">Lelou Ryan</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
