import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Search, Grid, Maximize2, Filter, Warehouse } from 'lucide-react';
import { ALL_IMAGES, CATEGORIES, ImageItem } from '../data/images';

// Helper: pick one representative image per category for the "Tout" overview
function getOnePerCategory(images: ImageItem[], categories: readonly string[]): ImageItem[] {
  const result: ImageItem[] = [];
  const catsWithImages = categories.filter(c => c !== "Tout");
  
  for (const cat of catsWithImages) {
    const catImages = images.filter(img => img.category === cat);
    if (catImages.length > 0) {
      // Pick a roughly central image as representative
      const pick = catImages[Math.floor(catImages.length / 3)];
      result.push({ ...pick, size: result.length % 5 === 0 ? 'large' : result.length % 3 === 0 ? 'medium' : 'small' });
    }
  }
  return result;
}

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("Tout");
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [catalogCategory, setCatalogCategory] = useState<string>("Tout");

  // "Tout" = one photo per category (overview), otherwise ALL images in that category
  const mainGalleryItems = useMemo(() => {
    if (activeCategory === "Tout") {
      return getOnePerCategory(ALL_IMAGES, CATEGORIES);
    }
    return ALL_IMAGES.filter(item => item.category === activeCategory);
  }, [activeCategory]);

  // Catalog filtered items (all images, filterable by category + search)
  const catalogFilteredItems = useMemo(() => {
    return ALL_IMAGES.filter(item => {
      const matchesCategory = catalogCategory === "Tout" || item.category === catalogCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.filename.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [catalogCategory, searchQuery]);

  // Current active list for lightbox
  const currentLightboxItems = isCatalogOpen ? catalogFilteredItems : mainGalleryItems;

  // Keyboard nav
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      else if (e.key === 'ArrowLeft') handlePrevImage();
      else if (e.key === 'ArrowRight') handleNextImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, currentLightboxItems]);

  const handlePrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(prev => prev !== null ? (prev === 0 ? currentLightboxItems.length - 1 : prev - 1) : null);
  };

  const handleNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex(prev => prev !== null ? (prev === currentLightboxItems.length - 1 ? 0 : prev + 1) : null);
  };

  const openCatalogWithCategory = (cat: string = "Tout") => {
    setCatalogCategory(cat);
    setSearchQuery('');
    setIsCatalogOpen(true);
  };

  // Count images by category for display
  const catCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    ALL_IMAGES.forEach(img => { counts[img.category] = (counts[img.category] || 0) + 1; });
    return counts;
  }, []);

  return (
    <section id="galerie" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center max-w-2xl mx-auto mb-12 flex flex-col items-center">
          <div className="flex items-center gap-4 mb-4">
            <span className="h-px w-8 bg-black/20"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">02</span>
            <span className="h-px w-8 bg-black/20"></span>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl text-black uppercase tracking-wider mb-4">Galerie</h2>
          <p className="text-xs uppercase tracking-widest text-black/60 mb-8">
            {ALL_IMAGES.length} Réalisations d'exception
          </p>
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-4">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-[10px] uppercase font-bold tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
                  activeCategory === cat 
                    ? 'bg-black text-white shadow-md' 
                    : 'bg-[#f8f9fa] text-black/50 hover:bg-black/5 hover:text-black'
                }`}
              >
                {cat}
                {cat !== "Tout" && catCounts[cat] && (
                  <span className="ml-1 opacity-60 text-[9px]">({catCounts[cat]})</span>
                )}
              </button>
            ))}
          </div>

          {/* Subtitle per mode */}
          <p className="text-[10px] uppercase tracking-widest text-black/40 mb-8">
            {activeCategory === "Tout" 
              ? "Un aperçu de chaque catégorie — cliquez pour explorer" 
              : `${mainGalleryItems.length} photos dans la catégorie ${activeCategory}`}
          </p>
        </div>

        {/* Main Grid View */}
        <motion.div 
          layout
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {mainGalleryItems.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.src}`}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
                className={`relative overflow-hidden group cursor-pointer rounded-sm bg-neutral-100 ${
                  activeCategory === "Tout" ? 'aspect-[3/4]' :
                  item.size === 'large' ? 'md:col-span-2 md:row-span-2 aspect-auto' : 
                  item.size === 'medium' ? 'md:col-span-2 aspect-auto' : 'aspect-[3/4]'
                }`}
                onClick={() => {
                  if (activeCategory === "Tout") {
                    // Clicking a category tile opens that category
                    setActiveCategory(item.category);
                  } else {
                    setSelectedImageIndex(index);
                  }
                }}
              >
                <img 
                  src={item.src} 
                  alt={item.category}
                  loading="lazy"
                  className="w-full h-full min-h-[200px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 md:p-6">
                  <span className="self-start text-[9px] font-bold uppercase tracking-widest bg-white/90 text-black px-3 py-1 rounded-full backdrop-blur-sm">
                    {item.category}
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-white text-xs font-bold uppercase tracking-widest border border-white/80 px-4 py-2 hover:bg-white hover:text-black transition-colors">
                      {activeCategory === "Tout" ? `Voir ${catCounts[item.category] || 0} photos` : "Agrandir"}
                    </span>
                    <Maximize2 className="w-4 h-4 text-white/80" />
                  </div>
                </div>

                {/* Category label overlay always visible in "Tout" mode */}
                {activeCategory === "Tout" && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <span className="text-white text-[10px] font-bold uppercase tracking-widest">
                      {item.category}
                    </span>
                    <span className="text-white/60 text-[9px] ml-2">
                      ({catCounts[item.category] || 0})
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Action Buttons */}
        <div className="mt-16 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => openCatalogWithCategory(activeCategory)}
            className="group px-8 py-4 bg-black text-white hover:bg-neutral-800 transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-lg flex items-center gap-3 cursor-pointer"
          >
            <Grid className="w-4 h-4 text-white/80 group-hover:scale-110 transition-transform" />
            <span>Catalogue complet ({ALL_IMAGES.length} photos)</span>
          </button>
          <a
            href="#contact"
            className="group px-8 py-4 bg-white border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 text-[10px] font-bold uppercase tracking-[0.2em] rounded-full shadow-sm flex items-center gap-3"
          >
            <Warehouse className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>Réserver / Privatiser le Studio</span>
          </a>
        </div>
      </div>

      {/* FULL CATALOG MODAL OVERLAY */}
      <AnimatePresence>
        {isCatalogOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-black/95 backdrop-blur-md flex flex-col overflow-hidden"
          >
            {/* Catalog Top Header */}
            <div className="bg-neutral-900 border-b border-white/10 p-4 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
                <div className="flex items-center gap-2">
                  <Grid className="w-5 h-5 text-white/70" />
                  <h3 className="text-white font-serif text-lg md:text-xl uppercase tracking-wider">
                    Catalogue Complet
                  </h3>
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/50 bg-white/10 px-3 py-1 rounded-full">
                  {catalogFilteredItems.length} photos
                </span>
                <button 
                  onClick={() => setIsCatalogOpen(false)}
                  className="md:hidden text-white/70 hover:text-white p-2"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border border-white/10 text-white placeholder-white/40 text-xs rounded-full pl-9 pr-4 py-2 focus:outline-none focus:border-white/40 transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <button 
                  onClick={() => setIsCatalogOpen(false)}
                  className="hidden md:flex items-center gap-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full text-xs transition-colors cursor-pointer"
                >
                  <span>Fermer</span>
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Sub-header Category Selector */}
            <div className="bg-black/60 border-b border-white/5 px-4 md:px-6 py-3 overflow-x-auto flex items-center gap-2 no-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 mr-2 flex items-center gap-1 shrink-0">
                <Filter className="w-3 h-3" /> Catégorie:
              </span>
              {CATEGORIES.map((cat) => {
                const count = cat === "Tout" ? ALL_IMAGES.length : (catCounts[cat] || 0);
                return (
                  <button
                    key={cat}
                    onClick={() => setCatalogCategory(cat)}
                    className={`px-3 py-1.5 text-[10px] uppercase font-bold tracking-widest rounded-full shrink-0 transition-all cursor-pointer ${
                      catalogCategory === cat
                        ? 'bg-white text-black font-extrabold'
                        : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Catalog Grid */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
              {catalogFilteredItems.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-white/50 gap-4">
                  <Search className="w-12 h-12 stroke-[1]" />
                  <p className="text-sm font-light">Aucune photo ne correspond à votre recherche.</p>
                  <button 
                    onClick={() => { setCatalogCategory("Tout"); setSearchQuery(''); }}
                    className="text-xs border border-white/30 px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors cursor-pointer"
                  >
                    Réinitialiser les filtres
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                  {catalogFilteredItems.map((item, index) => (
                    <motion.div
                      key={`cat-${item.id}-${item.src}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: Math.min(index * 0.01, 0.3) }}
                      className="group relative aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImageIndex(index)}
                    >
                      <img 
                        src={item.src} 
                        alt={item.category}
                        loading="lazy"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3">
                        <span className="self-start text-[8px] font-bold uppercase tracking-widest bg-black/60 text-white px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
                          {item.category}
                        </span>
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] text-white/80 font-mono truncate max-w-[80%]">
                            {item.filename}
                          </span>
                          <Maximize2 className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {selectedImageIndex !== null && currentLightboxItems[selectedImageIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 p-4 md:p-12 select-none"
            onClick={() => setSelectedImageIndex(null)}
          >
            <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-white z-10">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold uppercase tracking-widest bg-white/10 px-3 py-1.5 rounded-full border border-white/20">
                  {currentLightboxItems[selectedImageIndex].category}
                </span>
                <span className="text-xs font-mono text-white/60 hidden sm:inline-block">
                  {currentLightboxItems[selectedImageIndex].filename}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-white/70">
                  {selectedImageIndex + 1} / {currentLightboxItems.length}
                </span>
                <button 
                  className="p-2 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
                  onClick={() => setSelectedImageIndex(null)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {currentLightboxItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer"
              >
                <ChevronLeft className="w-8 h-8" />
              </button>
            )}

            <motion.div
              key={currentLightboxItems[selectedImageIndex].src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-full max-h-full flex items-center justify-center p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentLightboxItems[selectedImageIndex].src}
                alt={currentLightboxItems[selectedImageIndex].category}
                className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
              />
            </motion.div>

            {currentLightboxItems.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all hover:scale-110 cursor-pointer"
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
