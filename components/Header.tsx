
import React, { useState, useEffect } from 'react';

interface HeaderProps {
  onOpenReservation: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenReservation }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-serif font-bold tracking-tight">ÉCLAT D'ART</span>
          <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">Galerie Privée</span>
        </div>
        
        <nav className="hidden md:flex space-x-8 text-sm font-medium tracking-wide uppercase text-gray-700">
          <a href="#home" className="hover:text-black transition-colors">Accueil</a>
          <a href="#gallery" className="hover:text-black transition-colors">Collection</a>
          <a href="#about" className="hover:text-black transition-colors">L'Artiste</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </nav>

        <button 
          onClick={onOpenReservation}
          className="text-sm font-medium border border-gray-900 px-4 py-2 hover:bg-black hover:text-white transition-all active:scale-95"
        >
          Réserver une œuvre
        </button>
      </div>
    </header>
  );
};

export default Header;
