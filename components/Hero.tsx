
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=2000" 
          alt="Art Studio" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40"></div>
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <h2 className="text-gray-600 uppercase tracking-[0.5em] text-sm mb-6 animate-pulse">Collection 2024</h2>
        <h1 className="text-5xl md:text-8xl font-serif mb-8 leading-tight">
          L'essence de l'émotion <br />
          <span className="italic">sur toile.</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
          Découvrez une sélection exclusive d'œuvres originales, créées pour sublimer vos espaces et éveiller vos sens.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <a 
            href="#gallery" 
            className="bg-black text-white px-8 py-4 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all w-full sm:w-auto"
          >
            Explorer la galerie
          </a>
          <a 
            href="#about" 
            className="border border-black px-8 py-4 text-sm uppercase tracking-widest hover:bg-black hover:text-white transition-all w-full sm:w-auto"
          >
            L'histoire de l'artiste
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden md:block">
        <div className="w-[1px] h-16 bg-black/30 mx-auto relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-black"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
