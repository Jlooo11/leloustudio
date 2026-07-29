import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, Heart, Users, Briefcase, Box, Shirt, Video, Plane, Warehouse, Camera, Baby, Cake, Gem,
  GraduationCap, Star, Maximize2, X, ChevronLeft, ChevronRight, Images, ArrowRight
} from 'lucide-react';
import { ALL_IMAGES, ImageItem } from '../data/images';

interface ServiceDefinition {
  id: string;
  title: string;
  category: string;
  coverImage: string;
  icon: React.ElementType;
  description: string;
}

const servicesList: ServiceDefinition[] = [
  { 
    id: "beaute", 
    title: "Beauté", 
    category: "Beauté", 
    coverImage: "/beaute/LEL02823.jpg", 
    icon: Sparkles,
    description: "Portraits haute définition mettant en valeur les détails du maquillage, du teint et des expressions."
  },
  { 
    id: "mariage", 
    title: "Mariage", 
    category: "Mariage", 
    coverImage: "/mariage/_DSC1347_Original.jpeg", 
    icon: Heart,
    description: "Immortalisez l'émotion de votre grande journée avec un reportage photo élégant et intemporel."
  },
  { 
    id: "dote", 
    title: "Dote", 
    category: "Dote", 
    coverImage: "/dote/LEL04762.jpg", 
    icon: Gem,
    description: "Mise en lumière des cérémonies traditionnelles de dote avec authenticité et raffinement."
  },
  { 
    id: "famille", 
    title: "Famille", 
    category: "Famille", 
    coverImage: "/famille/DSC03674.jpeg", 
    icon: Users,
    description: "Souvenirs de famille chaleureux et naturels capturés en studio ou en extérieur."
  },
  { 
    id: "grossesse", 
    title: "Grossesse", 
    category: "Grossesse", 
    coverImage: "/grossesse/LEL08567.jpg", 
    icon: Baby,
    description: "Séances maternité artistiques célébrant la magie et la douceur de la maternité."
  },
  { 
    id: "diplome", 
    title: "Diplôme", 
    category: "Diplôme", 
    coverImage: "/diplome/LEL00254.jpg", 
    icon: GraduationCap,
    description: "Portraits officiels et séances souvenirs pour immortaliser la remise de diplôme et la réussite académique."
  },
  { 
    id: "vedette", 
    title: "Vedette & VIP", 
    category: "Vedette", 
    coverImage: "/vedette/DSC00577 1_Original.jpeg", 
    icon: Star,
    description: "Shoots exclusifs et visuels d'exception pour artistes, célébrités et personnalités publiques."
  },
  { 
    id: "anniversaire", 
    title: "Anniversaire", 
    category: "Anniversaire", 
    coverImage: "/anniversaire/LEL09480.jpg", 
    icon: Cake,
    description: "Shootings festifs et créatifs pour fêter vos moments d'exception."
  },
  { 
    id: "corporate", 
    title: "Corporate", 
    category: "Corporate", 
    coverImage: "/corporate/LEL02135.jpeg", 
    icon: Briefcase,
    description: "Portraits professionnels et visuels d'entreprise pour sublimer votre image de marque."
  },
  { 
    id: "produit", 
    title: "Produit & Pub", 
    category: "Produit", 
    coverImage: "/produit cosmetique/DSC09d902_(2)_Original.jpeg", 
    icon: Box,
    description: "Packshots produit premium et visuels publicitaires percutants."
  },
  { 
    id: "vetements", 
    title: "Vêtements", 
    category: "Vêtements", 
    coverImage: "/vetement/DSC00033.jpeg", 
    icon: Shirt,
    description: "Lookbooks et photographie de mode valorisant les textures et coupes textiles."
  },
  { 
    id: "nude", 
    title: "Nude Artistique", 
    category: "Nude", 
    coverImage: "/nude/LEL08878.jpg", 
    icon: Sparkles,
    description: "Photographie boudoir et nus artistiques travaillés avec jeux d'ombres et lumière."
  },
  { 
    id: "studio-loc", 
    title: "Privatisation Studio", 
    category: "Studio", 
    coverImage: "/studio/LEL02751.jpg", 
    icon: Warehouse,
    description: "Galerie des shootings réalisés par nos clients ayant privatiser notre plateau de studio photo équipé."
  },
  { 
    id: "video", 
    title: "Production vidéo", 
    category: "Studio", 
    coverImage: "/studio/LEL02615.jpg", 
    icon: Video,
    description: "Captations vidéo professionnelles, clips, spots publicitaires et films évènementiels."
  }
];

export function Services() {
  const [selectedServiceId, setSelectedServiceId] = useState<string>("beaute");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Active selected service object
  const activeService = useMemo(() => {
    return servicesList.find(s => s.id === selectedServiceId) || servicesList[0];
  }, [selectedServiceId]);

  // Filtered photos for active service category
  const servicePhotos = useMemo(() => {
    const photos = ALL_IMAGES.filter(img => img.category === activeService.category);
    // Fallback to studio if no direct match
    if (photos.length === 0) {
      return ALL_IMAGES.filter(img => img.category === "Studio");
    }
    return photos;
  }, [activeService]);

  const handlePrevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => 
      prev !== null ? (prev === 0 ? servicePhotos.length - 1 : prev - 1) : null
    );
  };

  const handleNextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(prev => 
      prev !== null ? (prev === servicePhotos.length - 1 ? 0 : prev + 1) : null
    );
  };

  return (
    <section id="services" className="py-24 bg-[#f8f9fa] border-t border-black/10">
      <div className="container mx-auto px-6 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-black/20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">01</span>
            <span className="h-px w-8 bg-black/20"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wider mb-4">
            Nos Prestations & Services
          </h2>
          <p className="text-sm text-black/60 leading-relaxed">
            Cliquez sur un service pour découvrir la galerie photo correspondante.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full max-w-7xl mx-auto mb-16">
          {servicesList.map((service) => {
            const isSelected = service.id === selectedServiceId;
            const photoCount = ALL_IMAGES.filter(img => img.category === service.category).length;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                onClick={() => setSelectedServiceId(service.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all duration-300 flex flex-col justify-between p-4 h-40 group border ${
                  isSelected 
                    ? 'ring-2 ring-black border-black shadow-lg scale-[1.02] bg-black text-white' 
                    : 'bg-white border-black/10 hover:border-black/30 hover:shadow-md text-black'
                }`}
              >
                {/* Background image preview with overlay */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity">
                  <img 
                    src={service.coverImage} 
                    alt={service.title}
                    className="w-full h-full object-cover" 
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 ${isSelected ? 'bg-black/70' : 'bg-gradient-to-t from-white via-white/80 to-white/40'}`}></div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-black/5 text-black'}`}>
                    <Icon className="w-5 h-5" strokeWidth={1.8} />
                  </div>
                  {photoCount > 0 && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white text-black' : 'bg-black/10 text-black/60'
                    }`}>
                      {photoCount} photos
                    </span>
                  )}
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className={`text-xs uppercase font-bold tracking-wider mb-0.5 ${isSelected ? 'text-white' : 'text-black'}`}>
                    {service.title}
                  </h3>
                  <span className={`text-[9px] uppercase tracking-widest block font-medium ${isSelected ? 'text-white/70' : 'text-black/40'}`}>
                    {isSelected ? 'Sélectionné' : 'Voir les photos'}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Gallery for Selected Service */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-7xl mx-auto bg-white rounded-2xl p-6 md:p-10 border border-black/10 shadow-sm"
          >
            {/* Header of Active Service Gallery */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-black/10 mb-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-black text-white rounded-xl">
                  <activeService.icon className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif text-2xl uppercase tracking-wider text-black">
                      Galerie {activeService.title}
                    </h3>
                    <span className="text-xs font-bold uppercase tracking-widest bg-black/10 text-black px-3 py-1 rounded-full">
                      {servicePhotos.length} photos
                    </span>
                  </div>
                  <p className="text-xs text-black/60 mt-1 max-w-xl">
                    {activeService.description}
                  </p>
                </div>
              </div>

              <a
                href="#galerie"
                className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-black hover:opacity-60 transition-opacity bg-[#f8f9fa] px-4 py-2.5 rounded-full border border-black/10"
              >
                <span>Voir dans la galerie principale</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Photos Grid for Active Service */}
            {servicePhotos.length === 0 ? (
              <div className="text-center py-12 text-black/40 text-xs uppercase tracking-wider">
                Aucune photo disponible pour ce service.
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {servicePhotos.map((item, idx) => (
                  <motion.div
                    key={`${item.id}-${item.src}`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative aspect-[3/4] bg-neutral-100 rounded-lg overflow-hidden cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <img 
                      src={item.src} 
                      alt={`${activeService.title} - ${item.filename}`}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                      <span className="self-start text-[8px] font-bold uppercase tracking-widest bg-white/90 text-black px-2 py-0.5 rounded-full">
                        {item.category}
                      </span>
                      <div className="flex items-center justify-between">
                        <span className="text-white text-[9px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <Maximize2 className="w-3 h-3" /> Agrandir
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>

      {/* LIGHTBOX MODAL FOR SERVICE PHOTOS */}
      <AnimatePresence>
        {lightboxIndex !== null && servicePhotos[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-4 md:p-12 select-none"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Toolbar */}
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  {servicePhotos[lightboxIndex].category}
                </span>
                <span className="text-xs font-mono text-white/60 hidden sm:inline-block">
                  {servicePhotos[lightboxIndex].filename}
                </span>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/70">
                  {lightboxIndex + 1} / {servicePhotos.length}
                </span>
                <button 
                  className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                  onClick={() => setLightboxIndex(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Prev Arrow */}
            {servicePhotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            {/* Main Image */}
            <motion.div
              key={servicePhotos[lightboxIndex].src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={servicePhotos[lightboxIndex].src}
                alt={servicePhotos[lightboxIndex].category}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>

            {/* Next Arrow */}
            {servicePhotos.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110"
              >
                <ChevronRight className="w-8 h-8" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
