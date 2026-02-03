
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
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 mb-6 group-hover:shadow-2xl transition-all duration-500">
        {/* Skeleton / Loading state */}
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 bg-[length:200%_100%] animate-[shimmer_1.5s_infinite] shadow-inner" />
        )}
        
        {/* Error Fallback */}
        {hasError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50 p-8 text-center border border-gray-100">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2">Image non disponible</p>
              <p className="font-serif italic text-gray-300">{painting.title}</p>
            </div>
          </div>
        ) : (
          <img 
            src={painting.imageUrl} 
            alt={painting.title}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
          />
        )}
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
        <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 text-[9px] uppercase tracking-[0.2em] font-bold shadow-sm opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
          Explorer l'œuvre
        </div>
      </div>
      <div className="flex justify-between items-start px-1">
        <div>
          <h3 className="text-2xl font-serif mb-2 group-hover:text-gray-600 transition-colors">{painting.title}</h3>
          <div className="flex items-center gap-3">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{painting.dimensions}</p>
            <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
            <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">{painting.category}</p>
          </div>
        </div>
        <span className="text-xl font-light text-gray-900">{painting.price}</span>
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
    }, 1200);
  };

  useEffect(() => {
    setShowAll(false);
  }, [selectedCategory]);

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 bg-white">
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Collection Actuelle</h2>
            <div className="h-1 w-20 bg-black mb-6"></div>
            <p className="text-gray-500 font-light">
              Chaque pièce est unique, signée et accompagnée d'un certificat d'authenticité. 
              Une immersion dans les archives privées de l'artiste.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 text-xs uppercase tracking-widest font-medium">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`pb-1 border-b-2 transition-all ${
                  selectedCategory === cat ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
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
          <div className="mt-24 text-center">
            <button 
              onClick={handleShowMore}
              disabled={isGenerating}
              className={`relative inline-flex items-center px-12 py-5 border border-black text-xs uppercase tracking-[0.3em] font-bold transition-all overflow-hidden group ${isGenerating ? 'cursor-wait' : 'hover:bg-black hover:text-white'}`}
            >
              {isGenerating ? (
                <span className="flex items-center">
                  <svg className="animate-spin h-4 w-4 mr-3" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Ouverture des archives...
                </span>
              ) : (
                <>
                  <span className="relative z-10">Voir toute la collection</span>
                  <div className="absolute inset-0 bg-black scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 -z-10"></div>
                </>
              )}
            </button>
            <p className="mt-6 text-[10px] text-gray-400 uppercase tracking-widest font-light italic">
              Explorez les {filteredPaintings.length} œuvres originales disponibles
            </p>
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
