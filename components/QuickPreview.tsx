
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

  // Bloquer le scroll du body uniquement si on est en plein écran
  useEffect(() => {
    if (painting && (isFullScreen || window.innerWidth < 768)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [painting, isFullScreen]);

  if (!painting) return null;

  const updateZoomPosition = (clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = ((clientX - left) / width) * 100;
    const y = ((clientY - top) / height) * 100;
    setZoomPos({ 
      x: Math.max(0, Math.min(100, x)), 
      y: Math.max(0, Math.min(100, y)) 
    });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || isRoomView) return;
    updateZoomPosition(e.clientX, e.clientY);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (isZoomed && !isRoomView) {
      const touch = e.touches[0];
      updateZoomPosition(touch.clientX, touch.clientY);
    }
  };

  const toggleZoom = (e: React.MouseEvent | React.TouchEvent) => {
    if (isRoomView) return;
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
      {/* Background overlay */}
      <div 
        className="absolute inset-0 bg-white/98 md:bg-white/95 backdrop-blur-xl"
        onClick={onClose}
      />
      
      {/* Main Container */}
      <div className={`relative bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row animate-in zoom-in-95 duration-500`}>
        
        {/* Navigation Tabs - Sticky on top on mobile */}
        <div className={`sticky top-0 left-0 right-0 md:absolute md:top-6 md:left-6 z-[160] flex gap-2 p-4 md:p-0 bg-white/50 md:bg-transparent backdrop-blur-md md:backdrop-blur-none transition-opacity ${isFullScreen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <button 
            onClick={() => setIsRoomView(false)}
            className={`action-btn px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-full shadow-sm ${!isRoomView ? 'bg-black text-white border-black' : 'bg-white/90 text-gray-500 border-gray-100'}`}
          >
            L'œuvre
          </button>
          <button 
            onClick={() => { setIsRoomView(true); setIsZoomed(false); }}
            className={`action-btn px-6 py-2.5 text-[10px] uppercase tracking-widest font-bold transition-all border rounded-full shadow-sm ${isRoomView ? 'bg-black text-white border-black' : 'bg-white/90 text-gray-500 border-gray-100'}`}
          >
            Mise en situation
          </button>
        </div>

        {/* Global Close Button */}
        {!isFullScreen && (
          <button 
            onClick={onClose}
            className="fixed top-4 right-4 md:absolute md:top-6 md:right-6 z-[160] p-4 bg-white/90 backdrop-blur-md rounded-full border border-gray-100 shadow-lg hover:bg-black hover:text-white transition-all active:scale-90"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Visual Section: Top 50% on mobile */}
        <div 
          ref={containerRef}
          className={`relative w-full transition-all duration-700 select-none overflow-hidden shrink-0 ${
            isFullScreen 
              ? 'fixed inset-0 z-[200] bg-black h-screen w-screen' 
              : 'md:w-3/5 lg:w-2/3 h-[50vh] md:h-[85vh] bg-[#fdfdfd]'
          } ${isRoomView ? 'bg-[#f5f5f4]' : ''} ${!isRoomView && isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onClick={toggleZoom}
        >
          {/* Realistic Living Room Wall */}
          {isRoomView && !isFullScreen && (
            <div className="absolute inset-0 animate-in fade-in duration-1000">
              <img 
                src="https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=2000" 
                className="w-full h-full object-cover"
                alt="Salon moderne avec mur blanc"
              />
              {/* Subtle lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/10"></div>
            </div>
          )}

          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-8 h-8 border border-black/10 border-t-black rounded-full animate-spin"></div>
            </div>
          )}

          {/* Full Screen Mode Controls */}
          {isFullScreen && (
            <button 
              onClick={toggleFullScreen}
              className="absolute top-6 right-6 z-[210] p-4 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}

          {/* THE CANVAS */}
          <div className={`relative w-full h-full flex items-center justify-center p-8 md:p-16 transition-all duration-1000 ease-out ${
            isRoomView ? 'scale-[0.25] md:scale-[0.38] -translate-y-24 md:-translate-y-36' : 'scale-100'
          }`}>
            <img 
              src={painting.imageUrl} 
              alt={painting.title}
              onLoad={() => setIsLoaded(true)}
              className={`max-w-full max-h-full object-contain transition-all duration-700 ${
                isRoomView 
                  ? 'shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4),0_20px_40px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white ring-1 ring-black/5' 
                  : 'shadow-2xl'
              } ${isZoomed && !isRoomView ? 'scale-[2.5] md:scale-[3.5]' : 'scale-100'} ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'}`}
              style={isZoomed && !isRoomView ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : undefined}
              draggable={false}
            />

            {/* Full Screen Button */}
            {!isFullScreen && !isRoomView && isLoaded && (
              <button 
                onClick={toggleFullScreen}
                className="action-btn absolute bottom-6 right-6 p-4 bg-white/90 backdrop-blur-md rounded-full shadow-xl hover:bg-black hover:text-white transition-all z-[140] active:scale-90"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
              </button>
            )}
          </div>

          {/* Situation Context Info */}
          {isRoomView && !isFullScreen && (
            <div className="absolute bottom-8 left-0 right-0 text-center animate-in fade-in slide-in-from-bottom-2 duration-1000">
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.4em] font-medium bg-white/40 backdrop-blur-sm inline-block px-6 py-2 rounded-full border border-black/5">Aperçu en intérieur moderne</p>
            </div>
          )}
        </div>

        {/* Content Section: Detailed info and CTAs */}
        {!isFullScreen && (
          <div className="w-full md:w-2/5 lg:w-1/3 p-8 md:p-12 lg:p-16 flex flex-col bg-white">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-10">
                <span className="w-12 h-[1px] bg-black"></span>
                <span className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">{painting.category}</span>
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-serif mb-10 leading-none tracking-tighter">{painting.title}</h2>
              
              <div className="flex flex-wrap items-center gap-4 mb-12">
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Dimensions</span>
                  <span className="text-[11px] font-bold tracking-widest">{painting.dimensions}</span>
                </div>
                <div className="w-px h-8 bg-gray-100"></div>
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 mb-1">Authenticité</span>
                  <span className="text-[11px] font-bold tracking-widest uppercase">Certifiée</span>
                </div>
              </div>

              <div className="text-5xl font-light mb-12 text-gray-900 font-serif">{painting.price}</div>
              
              <div className="space-y-10 mb-20">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 mb-6">Note de l'artiste</h4>
                  <p className="text-gray-600 font-light leading-relaxed italic text-xl border-l-2 border-black/5 pl-6">
                    "{painting.description}"
                  </p>
                </div>

                <div className="bg-gray-50 p-6 rounded-sm">
                  <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-900 mb-4">Détails de l'acquisition</h4>
                  <ul className="text-[11px] text-gray-500 space-y-3 font-medium uppercase tracking-widest">
                    <li className="flex justify-between border-b border-gray-100 pb-2"><span>Technique :</span> <span className="text-black">Huile sur Toile</span></li>
                    <li className="flex justify-between border-b border-gray-100 pb-2"><span>Finition :</span> <span className="text-black">Vernis Anti-UV</span></li>
                    <li className="flex justify-between"><span>Livraison :</span> <span className="text-black">Caisse en Bois sécurisée</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final CTA Buttons - Fixed at bottom on mobile or end of scroll */}
            <div className="space-y-4 pt-10 border-t border-gray-100 mt-auto">
              <button className="w-full bg-black text-white py-6 text-[10px] uppercase tracking-[0.4em] font-bold transition-all hover:bg-gray-800 active:scale-[0.98] shadow-2xl">
                Réserver cette œuvre
              </button>
              <button className="w-full border border-black text-black py-6 text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-black hover:text-white transition-all active:scale-[0.98]">
                Contacter l'Atelier
              </button>
              <div className="flex flex-col items-center gap-3 pt-6 opacity-40">
                <div className="flex gap-4">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-4" alt="Stripe" />
                  <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" />
                </div>
                <span className="text-[8px] uppercase tracking-[0.3em] text-gray-500 font-bold">Transaction Cryptée & Sécurisée</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickPreview;
