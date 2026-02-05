
import React, { useState, useRef, MouseEvent, TouchEvent, useEffect } from 'react';
import { Painting } from '../types';

interface QuickPreviewProps {
  painting: Painting | null;
  onClose: () => void;
}

const QuickPreview: React.FC<QuickPreviewProps> = ({ painting, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isRoomView, setIsRoomView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Bloquer tout scroll extérieur quand l'œuvre est ouverte (important pour mobile)
  useEffect(() => {
    if (painting) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [painting]);

  if (!painting) return null;

  const updateZoomPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current || isRoomView) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setZoomPos({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || isRoomView || isFullScreen) return;
    updateZoomPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed && !isRoomView && !isFullScreen) {
      const touch = e.touches[0];
      updateZoomPosition(touch.clientX, touch.clientY);
    }
  };

  const toggleZoom = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRoomView || isFullScreen) return;
    if ((e.target as HTMLElement).closest('.action-btn')) return;

    if (!isZoomed) {
      const clientX = 'clientX' in e ? (e as any).clientX : (e as any).touches[0].clientX;
      const clientY = 'clientY' in e ? (e as any).clientY : (e as any).touches[0].clientY;
      updateZoomPosition(clientX, clientY);
    }
    setIsZoomed(!isZoomed);
  };

  const toggleFullScreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullScreen(!isFullScreen);
    setIsZoomed(false);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center animate-in fade-in duration-300">
      {/* Overlay global */}
      <div className="absolute inset-0 bg-white md:bg-black/20 backdrop-blur-md" onClick={onClose} />
      
      {/* Vue Plein Écran (Overlay de plus haut niveau) */}
      {isFullScreen && (
        <div className="fixed inset-0 z-[1000] bg-black flex items-center justify-center overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          <img 
            src={painting.imageUrl} 
            alt={painting.title}
            className="max-w-full max-h-full object-contain pointer-events-none"
          />
          <button 
            onClick={toggleFullScreen}
            className="absolute top-6 right-6 p-4 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full text-white transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="absolute bottom-8 left-0 right-0 text-center text-white/30 text-[10px] uppercase tracking-[0.5em] pointer-events-none">
            {painting.title}
          </div>
        </div>
      )}

      {/* Conteneur Principal (Détails & Navigation) */}
      <div className={`relative bg-white w-full max-w-7xl h-full md:h-[90vh] md:max-h-[900px] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-500`}>
        
        {/* Navigation Flottante */}
        <div className="absolute top-4 left-4 z-[160] flex gap-2">
          <button 
            onClick={() => setIsRoomView(false)}
            className={`action-btn px-5 py-2 text-[9px] uppercase tracking-widest font-bold transition-all border rounded-full shadow-lg ${!isRoomView ? 'bg-black text-white border-black' : 'bg-white/90 text-gray-500 border-gray-100'}`}
          >
            L'œuvre
          </button>
          <button 
            onClick={() => { setIsRoomView(true); setIsZoomed(false); }}
            className={`action-btn px-5 py-2 text-[9px] uppercase tracking-widest font-bold transition-all border rounded-full shadow-lg ${isRoomView ? 'bg-black text-white border-black' : 'bg-white/90 text-gray-500 border-gray-100'}`}
          >
            Mise en situation
          </button>
        </div>

        {/* Bouton Fermer */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-[160] p-3 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 shadow-lg hover:bg-black hover:text-white transition-all active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Section Visuelle (Image ou Room View) */}
        <div 
          ref={containerRef}
          className={`relative w-full md:w-3/5 lg:w-2/3 h-[55vh] md:h-full transition-all duration-700 select-none overflow-hidden shrink-0 ${isRoomView ? 'bg-[#f4f4f3]' : 'bg-[#fafafa]'} ${!isRoomView && isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={toggleZoom}
        >
          {/* Room View : Mur de Salon Moderne */}
          {isRoomView && (
            <div className="absolute inset-0 animate-in fade-in duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover"
                alt="Mur de salon haut de gamme"
              />
              <div className="absolute inset-0 bg-black/5"></div>
            </div>
          )}

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border-2 border-black/5 border-t-black rounded-full animate-spin"></div>
            </div>
          )}

          {/* L'œuvre (centrée et dimensionnée) */}
          <div className={`relative w-full h-full flex items-center justify-center p-6 md:p-12 lg:p-20 transition-all duration-1000 ease-out ${
            isRoomView ? 'scale-[0.28] md:scale-[0.35] -translate-y-16 md:-translate-y-20' : 'scale-100'
          }`}>
            <img 
              src={painting.imageUrl} 
              alt={painting.title}
              onLoad={() => setIsLoaded(true)}
              className={`max-w-full max-h-full object-contain transition-all duration-700 ${
                isRoomView 
                  ? 'shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),0_20px_40px_-20px_rgba(0,0,0,0.4)] border-[12px] border-white ring-1 ring-black/10' 
                  : 'shadow-2xl'
              } ${isZoomed && !isRoomView ? 'scale-[2.5] md:scale-[3.5]' : 'scale-100'} ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'}`}
              style={isZoomed && !isRoomView ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              draggable={false}
            />

            {/* Bouton Plein Écran (uniquement en mode œuvre) */}
            {!isRoomView && isLoaded && (
              <button 
                onClick={toggleFullScreen}
                className="action-btn absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-2xl hover:bg-black hover:text-white transition-all z-[140] active:scale-90"
                title="Passer en plein écran"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Section Contenu : Scrollable sur mobile */}
        <div className="flex-1 overflow-y-auto bg-white flex flex-col scroll-smooth">
          <div className="p-8 md:p-12 lg:p-16 flex-1">
            <div className="flex items-center space-x-3 mb-8">
              <span className="w-10 h-[1px] bg-black"></span>
              <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold">{painting.category}</span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-serif mb-8 leading-[1.1] tracking-tight">{painting.title}</h2>
            
            <div className="flex flex-wrap items-center gap-6 mb-10 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">
              <span className="bg-gray-50 px-3 py-1.5 rounded">{painting.dimensions}</span>
              <span className="bg-gray-50 px-3 py-1.5 rounded">Original Signé</span>
            </div>

            <div className="text-4xl font-serif font-light mb-12 text-gray-900 border-b border-gray-100 pb-10">{painting.price}</div>
            
            <div className="space-y-10">
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 mb-6">L'œuvre par Asma</h4>
                <p className="text-gray-600 font-light leading-relaxed italic text-lg lg:text-xl">
                  "{painting.description}"
                </p>
              </div>

              <div className="bg-gray-50 p-6 space-y-4">
                <h4 className="text-[9px] uppercase tracking-[0.3em] font-bold text-gray-400">Détails techniques</h4>
                <div className="grid grid-cols-2 gap-4 text-[11px] font-medium tracking-widest">
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-[9px]">Medium</span>
                    <span>Huile sur Toile</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-[9px]">Finition</span>
                    <span>Vernis Brillant</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Boutons d'Action (Sticky sur mobile si nécessaire, ici en fin de flux) */}
          <div className="p-8 md:p-12 lg:p-16 pt-0 mt-auto space-y-4">
            <button className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-gray-800 active:scale-[0.98] shadow-xl">
              Acquérir l'œuvre
            </button>
            <button className="w-full border border-black text-black py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all active:scale-[0.98]">
              Contacter l'artiste
            </button>
            <div className="flex flex-col items-center gap-3 pt-6 opacity-30 text-[8px] uppercase tracking-[0.3em] font-bold">
              <div className="flex gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-4" alt="Stripe" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
              </div>
              <span>Expédition mondiale assurée</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickPreview;
