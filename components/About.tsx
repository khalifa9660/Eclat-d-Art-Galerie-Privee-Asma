
import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-24 px-6 md:px-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2 relative">
          <div className="absolute -top-10 -left-10 w-40 h-40 border border-gray-200 -z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800" 
            alt="Asma dans son atelier" 
            className="w-full aspect-square object-cover shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute -bottom-6 -right-6 bg-black text-white p-8 hidden md:block">
            <p className="font-serif text-3xl italic">"L'art est une fenêtre ouverte sur l'invisible."</p>
            <p className="text-xs uppercase tracking-widest mt-4 text-gray-400">— Asma</p>
          </div>
        </div>

        <div className="lg:w-1/2">
          <h2 className="text-gray-500 uppercase tracking-[0.4em] text-xs mb-4">L'âme derrière le pinceau</h2>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">Asma <br />Artiste Française</h2>
          <div className="space-y-6 text-gray-700 font-light leading-relaxed">
            <p>
              Basée à Paris, Asma est une figure montante de l'art contemporain français. Son travail se distingue par une quête incessante de lumière et de pureté, traduisant des émotions complexes en compositions épurées et vibrantes.
            </p>
            <p>
              Formée dans les plus grandes écoles d'art, elle a su développer un langage visuel unique où chaque coup de pinceau est une intention, chaque texture une confession. Son art ne cherche pas à reproduire le monde, mais à en extraire l'essence la plus poétique et la plus intemporelle.
            </p>
          </div>
          
          <div className="mt-12 flex items-center space-x-8">
            <div>
              <span className="block text-3xl font-serif">25+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Expositions</span>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div>
              <span className="block text-3xl font-serif">450+</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Œuvres vendues</span>
            </div>
            <div className="w-px h-10 bg-gray-300"></div>
            <div>
              <span className="block text-3xl font-serif">12</span>
              <span className="text-[10px] uppercase tracking-widest text-gray-500">Années d'expérience</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
