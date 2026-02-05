
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Gallery from './components/Gallery';
import About from './components/About';
import ArtAdvisor from './components/ArtAdvisor';
import Footer from './components/Footer';
import ReservationView from './components/ReservationView';

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <Header onOpenReservation={() => setIsReservationOpen(true)} />
      <main>
        <Hero />
        
        {/* Featured Section */}
        <section className="py-20 bg-black text-white text-center">
          <div className="max-w-3xl mx-auto px-6">
            <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-6 block">Philosophie</span>
            <h2 className="text-3xl md:text-5xl font-serif leading-tight italic">
              "L'art est le langage de l'âme, capable de transmettre ce que les mots ne peuvent exprimer."
            </h2>
          </div>
        </section>

        <Gallery />
        <About />
        
        {/* Contact/Appointment Cta */}
        <section className="py-24 bg-white border-t border-gray-100 px-6 md:px-12 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif mb-6">Une commande personnalisée ?</h2>
            <p className="text-gray-500 font-light mb-12">
              Vous avez un projet spécifique pour votre intérieur ou votre entreprise ? Je réalise des œuvres sur commande pour s'adapter parfaitement à vos dimensions et vos couleurs.
            </p>
            <button 
              onClick={() => setIsReservationOpen(true)}
              className="bg-black text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-gray-800 transition-all"
            >
              Prendre rendez-vous
            </button>
          </div>
        </section>
      </main>
      
      <Footer />
      <ArtAdvisor />

      {/* Salon de Réservation */}
      <ReservationView 
        isOpen={isReservationOpen} 
        onClose={() => setIsReservationOpen(false)} 
      />
    </div>
  );
}

export default App;
