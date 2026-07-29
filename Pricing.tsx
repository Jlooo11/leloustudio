import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const pricingCategories = [
  {
    title: "Shooting Classique",
    items: [
      { name: "Studio (1 tenue) - 3 photos", price: "35.000 FCFA" },
      { name: "Studio (2 tenues) - 6 photos", price: "60.000 FCFA" },
      { name: "Rue - 3 photos", price: "40.000 FCFA" },
      { name: "Rue - 6 photos", price: "70.000 FCFA" },
      { name: "Grossesse - 3 photos", price: "40.000 FCFA" },
      { name: "Grossesse - 6 photos", price: "70.000 FCFA" },
      { name: "Couple - 3 photos", price: "45.000 FCFA" },
      { name: "Couple - 6 photos", price: "80.000 FCFA" },
      { name: "Grossesse Couple - 3 photos", price: "50.000 FCFA" },
      { name: "Grossesse Couple - 6 photos", price: "90.000 FCFA" },
      { name: "Eau - 3 photos", price: "50.000 FCFA" }
    ]
  },
  {
    title: "Commercial",
    items: [
      { name: "5 Tenues, 5 photos", price: "35.000 FCFA" },
      { name: "5 Tenues, 10 photos", price: "55.000 FCFA" },
      { name: "10 Tenues, 10 photos", price: "65.000 FCFA" },
      { name: "10 Tenues, 20 photos", price: "95.000 FCFA" },
      { name: "20 Tenues, 40 photos", price: "185.000 FCFA" },
      { name: "30 Tenues, 60 photos", price: "285.000 FCFA" },
      { name: "40 Tenues, 80 photos", price: "380.000 FCFA" }
    ]
  },
  {
    title: "Produits",
    items: [
      { name: "5 produits, 5 photos", price: "30.000 FCFA" },
      { name: "5 produits, 10 photos", price: "50.000 FCFA" },
      { name: "10 produits, 10 photos", price: "55.000 FCFA" },
      { name: "10 produits, 20 photos", price: "100.000 FCFA" },
      { name: "15 produits, 15 photos", price: "110.000 FCFA" },
      { name: "15 produits, 30 photos", price: "150.000 FCFA" },
      { name: "20 produits, 20 photos", price: "155.000 FCFA" },
      { name: "20 produits, 40 photos", price: "200.000 FCFA" }
    ]
  },
  {
    title: "Wedding - Couple (Studio)",
    items: [
      { name: "Pack Essentiel (4 photos, 2 tenues)", price: "85.000 FCFA" },
      { name: "Pack Intermédiaire (8 photos, 4 tenues)", price: "150.000 FCFA" },
      { name: "Pack Premium (12 photos, 6 tenues)", price: "185.000 FCFA" }
    ]
  },
  {
    title: "Wedding - Couple (Plein Air)",
    items: [
      { name: "Pack Découverte (4 photos, 2 tenues)", price: "120.000 FCFA" },
      { name: "Pack Aventure (8 photos, 4 tenues)", price: "180.000 FCFA" },
      { name: "Pack Prestige (12 photos, 6 tenues)", price: "220.000 FCFA" }
    ]
  },
  {
    title: "Privatisation & Location Studio",
    items: [
      { name: "Location Studio - Demi-journée (4h)", price: "Sur Devis" },
      { name: "Location Studio - Journée complète (8h)", price: "Sur Devis" },
      { name: "Privatisation Shoot Photo / Tournage Vidéo", price: "Sur Devis" }
    ]
  }
];

interface PricingProps {
  onSelectPlan?: (category: string, pack: string) => void;
}

export function Pricing({ onSelectPlan }: PricingProps) {
  const [openCategory, setOpenCategory] = useState<number | null>(0);

  const handleReserve = (categoryTitle: string, packName: string) => {
    if (onSelectPlan) {
      onSelectPlan(categoryTitle, packName);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="tarifs" className="py-24 bg-[#f8f9fa] border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-black/20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">Tarifs</span>
            <span className="h-px w-8 bg-black/20"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wider mb-4">Mes Formules</h2>
        </div>

        <div className="w-full max-w-3xl mx-auto flex flex-col gap-4">
          {pricingCategories.map((category, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border border-black/10 rounded-xl overflow-hidden"
            >
              <button 
                onClick={() => setOpenCategory(openCategory === idx ? null : idx)}
                className="w-full px-6 py-5 flex items-center justify-between bg-white hover:bg-black/5 transition-colors cursor-pointer"
              >
                <h3 className="font-bold uppercase tracking-wider text-sm">{category.title}</h3>
                {openCategory === idx ? <ChevronUp className="w-5 h-5 opacity-50" /> : <ChevronDown className="w-5 h-5 opacity-50" />}
              </button>
              
              {openCategory === idx && (
                <div className="px-6 pb-6 pt-2 flex flex-col gap-3">
                  {category.items.map((item, itemIdx) => (
                    <div key={itemIdx} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-3 border-b border-black/5 last:border-0 gap-3">
                      <span className="text-sm text-black/70">{item.name}</span>
                      <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                        <span className="font-bold text-sm bg-black/5 px-3 py-1 rounded-full">{item.price}</span>
                        <button 
                          onClick={() => handleReserve(category.title, item.name)}
                          className="px-4 py-1.5 bg-black text-white text-[9px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-black/80 transition-colors cursor-pointer"
                        >
                          Réserver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
