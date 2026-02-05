
import React, { useState, useEffect } from 'react';
import { PAINTINGS } from '../constants';
import { Painting } from '../types';
import QuickPreview from './QuickPreview';

const GalleryItem: React.FC<{ painting: Painting, index: number, onClick: () => void }> = ({ painting, index, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div 
      className={`group cursor-pointer animate-in fade-in slide-in-from-bottom-8 duration-700 fill-mode-both`}
      style={{ animationDelay: `${(index % 6) * 100}ms` }}
      onClick={onClick}
    >
      {/* Conteneur d'image avec ratio fixe mais affichage complet de l'œuvre */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f0f0f0] mb-6 group-hover:shadow-2xl transition-all duration-700 border border-black/[0.03]">
        {/* Skeleton / Loading state - simpler indicator */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-5 h-5 border border-black/10 border-t-black/40 rounded-full animate-spin"></div>
          </div>
        )}
        
        {/* Error Fallback */}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-8 text-center">
            <div className="opacity-20 flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-[8px] uppercase tracking-widest font-bold">Image indisponible</p>
            </div>
          </div>
        ) : (
          <img 
            src={painting.imageUrl} 
            alt={painting.title}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              console.error(`Failed to load: ${painting.imageUrl}`);
              setHasError(true);
            }}
            className={`w-full h-full object-contain p-2 md:p-4 transition-all duration-700 group-hover:scale-105 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}
        
        {/* Overlay au survol */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300"></div>
        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white px-6 py-2.5 text-[9px] uppercase tracking-[0.3em] font-bold shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 whitespace-nowrap border border-black/5 pointer-events-none">
          Détails de l'œuvre
        </div>
      </div>

      <div className="flex justify-between items-start px-1">
        <div className="max-w-[70%]">
          <h3 className="text-xl md:text-2xl font-serif mb-2 group-hover:text-gray-500 transition-colors leading-tight truncate">{painting.title}</h3>
          <div className="flex items-center gap-3">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold whitespace-nowrap">{painting.dimensions}</p>
            <span className="w-1 h-1 bg-gray-200 rounded-full shrink-0"></span>
            <p className="text-[9px] text-gray-400 uppercase tracking-widest font-bold truncate">{painting.category}</p>
          </div>
        </div>
        <span className="text-lg font-light text-gray-900 font-serif whitespace-nowrap">{painting.price}</span>
      </div>
    </div>
  );
};

const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tout');
  const [previewPainting, setPreviewPainting] = useState<Painting | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const categories = ['Tout', 'Abstrait', 'Moderne', 'Portrait', 'Paysage'];

  const filteredPaintings = selectedCategory === 'Tout' 
    ? PAINTINGS 
    : PAINTINGS.filter(p => p.category === selectedCategory);

  const displayedPaintings = showAll ? filteredPaintings : filteredPaintings.slice(0, 6);

  const handleShowMore = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setShowAll(true);
      setIsGenerating(false);
    }, 800);
  };

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-4 block font-bold">Archives</span>
            <h2 className="text-4xl md:text-6xl font-serif mb-6 leading-tight">Collection <br/><span className="italic">Sélectionnée</span></h2>
            <div className="h-[1px] w-20 bg-black/10 mb-8"></div>
            <p className="text-gray-500 font-light leading-relaxed max-w-md">
              Chaque œuvre est présentée dans son intégralité. Cliquez pour une immersion totale.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-6 text-[9px] uppercase tracking-[0.4em] font-bold">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-2 border-b-2 transition-all ${
                  selectedCategory === cat ? 'border-black text-black' : 'border-transparent text-gray-300 hover:text-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {displayedPaintings.map((painting, index) => (
            <GalleryItem 
              key={painting.id} 
              painting={painting} 
              index={index} 
              onClick={() => setPreviewPainting(painting)} 
            />
          ))}
        </div>

        {!showAll && filteredPaintings.length > 6 && (
          <div className="mt-32 text-center">
            <button 
              onClick={handleShowMore}
              disabled={isGenerating}
              className={`relative inline-flex items-center px-12 py-5 border border-black/10 text-[9px] uppercase tracking-[0.5em] font-bold transition-all overflow-hidden group ${isGenerating ? 'cursor-wait' : 'hover:border-black'}`}
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <div className="w-3 h-3 border border-black/20 border-t-black rounded-full animate-spin mr-3"></div>
                  Chargement...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Afficher plus d'œuvres</span>
                  <div className="absolute inset-0 bg-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                </>
              )}
            </button>
          </div>
        )}
      </div>

      <QuickPreview 
        painting={previewPainting} 
        onClose={() => setPreviewPainting(null)} 
      />
    </section>
  );
};

export default Gallery;
