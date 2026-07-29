import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Smartphone, Instagram, Send, Calendar, Clock, CheckCircle } from 'lucide-react';
import { CalendarInput } from './CalendarInput';
import { pricingCategories } from './Pricing';

interface ContactProps {
  selectedPlan?: { category: string; pack: string } | null;
}

export function Contact({ selectedPlan }: ContactProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    pack: '',
    message: ''
  });
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    if (selectedPlan?.category) {
      setFormData(prev => ({
        ...prev,
        category: selectedPlan.category,
        pack: selectedPlan.pack || ''
      }));
    }
  }, [selectedPlan]);

  const selectedCategory = pricingCategories.find(c => c.title === formData.category);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, phone, category, pack, message } = formData;
    
    if (!name || !phone || !category || !message || !date || !time) {
      alert("Veuillez remplir tous les champs obligatoires, y compris la date et l'heure.");
      return;
    }

    const price = selectedCategory?.items.find(i => i.name === pack)?.price;
    const packText = pack ? `%0A*Formule* : ${pack} ${price ? `(${price})` : ''}` : '';
    const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    
    const text = `Bonjour Lelou Studio ! Je souhaite vous parler de mon projet. %0A%0A*Nom* : ${name}%0A*Téléphone* : ${phone}%0A*Catégorie* : ${category}${packText}%0A*Date souhaitée* : ${formattedDate} à ${time}%0A*Message* : ${message}`;
    const url = `https://wa.me/2250709719874?text=${text}`;
    window.open(url, '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-[#f8f9fa] border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-black/20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">05</span>
            <span className="h-px w-8 bg-black/20"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wider mb-4">
            Réservez Votre Séance
          </h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Complétez le formulaire ci-dessous pour planifier votre shooting ou nous poser toutes vos questions.
          </p>
        </div>

        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          
          {/* 1. FORMULAIRE DE RESERVATION (PLACÉ EN PREMIER) */}
          <div className="flex-[1.2] w-full order-1">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-black/5 space-y-6">
              <div className="border-b border-black/5 pb-4 mb-6">
                <h3 className="font-serif text-xl text-black uppercase tracking-wider mb-1">Formulaire de réservation</h3>
                <p className="text-xs text-black/50">Tous les champs sont requis pour valider votre demande.</p>
              </div>

              {formData.category && formData.pack && (
                <div className="bg-black text-white p-4 rounded-xl flex items-center justify-between gap-3 shadow-md border border-black/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-lg">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <span className="block text-[9px] uppercase font-bold tracking-widest text-white/70">Formule sélectionnée</span>
                      <span className="text-xs font-bold">{formData.category} — {formData.pack}</span>
                    </div>
                  </div>
                  {selectedCategory?.items.find(i => i.name === formData.pack)?.price && (
                    <span className="text-xs font-extrabold bg-white text-black px-3 py-1 rounded-full shrink-0">
                      {selectedCategory.items.find(i => i.name === formData.pack)?.price}
                    </span>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Nom complet *</label>
                  <input 
                    type="text" 
                    placeholder="Ex: Jean Dupont" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Téléphone / WhatsApp *</label>
                  <input 
                    type="tel" 
                    placeholder="Ex: +225 07 00 00 00 00" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Adresse Email *</label>
                  <input 
                    type="email" 
                    placeholder="Ex: email@exemple.com" 
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Catégorie de prestation *</label>
                  <select 
                    required
                    value={formData.category}
                    onChange={e => setFormData({...formData, category: e.target.value, pack: ''})}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa] appearance-none"
                  >
                    <option value="" disabled>Sélectionner une catégorie</option>
                    {pricingCategories.map(cat => (
                       <option key={cat.title} value={cat.title}>{cat.title}</option>
                    ))}
                    <option value="Autre">Autre projet</option>
                  </select>
                </div>
              </div>

              {selectedCategory && (
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Formule souhaitée</label>
                  <select 
                    required
                    value={formData.pack}
                    onChange={e => setFormData({...formData, pack: e.target.value})}
                    className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa] appearance-none"
                  >
                    <option value="" disabled>Choisir une formule</option>
                    {selectedCategory.items.map(item => (
                      <option key={item.name} value={item.name}>{item.name} - {item.price}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Date et Heure souhaitées *</label>
                <CalendarInput date={date} setDate={setDate} time={time} setTime={setTime} />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-black/60 mb-2">Détails de votre demande *</label>
                <textarea 
                  placeholder="Décrivez votre projet (lieu, inspirations, nombre de personnes...)" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full border border-black/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-black/50 transition-colors bg-[#f8f9fa] resize-none"
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="w-full py-4 bg-black text-white text-[10px] uppercase tracking-[0.2em] font-bold rounded-lg hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span>Envoyer ma demande via WhatsApp</span>
              </button>
            </form>
          </div>

          {/* 2. INFOS DE CONTACT / COORDONNEES (PLACÉ EN DEUXIÈME) */}
          <div className="flex-1 w-full order-2 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-black/5 flex flex-col justify-between self-stretch">
            <div>
              <h3 className="font-serif text-2xl text-black uppercase tracking-wider mb-4">Nos Coordonnées</h3>
              
              <p className="text-sm text-black/70 leading-relaxed mb-8">
                Vous préférez nous contacter directement ? L'équipe de Lelou Studio est à votre écoute pour vous conseiller.
              </p>

              <div className="space-y-6 mb-10">
                <a 
                  href="https://wa.me/2250709719874" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9fa] hover:bg-black hover:text-white transition-all group border border-black/5"
                >
                  <div className="p-3 rounded-full bg-black/5 group-hover:bg-white/20 text-black group-hover:text-white transition-colors">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-white/60">Téléphone & WhatsApp</span>
                    <span className="text-sm font-semibold">+225 07 09 71 98 74</span>
                  </div>
                </a>

                <a 
                  href="mailto:contact@leloustudio.com" 
                  className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9fa] hover:bg-black hover:text-white transition-all group border border-black/5"
                >
                  <div className="p-3 rounded-full bg-black/5 group-hover:bg-white/20 text-black group-hover:text-white transition-colors">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-white/60">Email</span>
                    <span className="text-sm font-semibold">contact@leloustudio.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-xl bg-[#f8f9fa] border border-black/5">
                  <div className="p-3 rounded-full bg-black/5 text-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40">Studio Photo</span>
                    <span className="text-sm font-semibold text-black/80">Abidjan, Côte d'Ivoire</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Instagram Official Section */}
            <div className="pt-6 border-t border-black/10">
              <span className="block text-[10px] font-bold uppercase tracking-widest text-black/40 mb-3">
                Suivez-nous sur Instagram
              </span>
              <a 
                href="https://www.instagram.com/lelou__studio___" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 text-white font-bold hover:opacity-90 transition-opacity shadow-md"
              >
                <div className="flex items-center gap-3">
                  <Instagram className="w-6 h-6" />
                  <span className="text-xs uppercase tracking-wider font-extrabold">@lelou__studio___</span>
                </div>
                <span className="text-[10px] bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                  Suivre
                </span>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
