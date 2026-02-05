
import React, { useState, useEffect } from 'react';
import { PAINTINGS } from '../constants';
import { Painting } from '../types';

interface ReservationViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReservationView: React.FC<ReservationViewProps> = ({ isOpen, onClose }) => {
  const [selectedPaintingId, setSelectedPaintingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      // Reset after closing
      setTimeout(() => {
        setIsSuccess(false);
        setIsSubmitting(false);
      }, 500);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simuler un appel API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-white animate-in slide-in-from-right duration-700 ease-out overflow-y-auto">
      {/* Bouton Fermer */}
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[210] p-4 group"
      >
        <div className="flex items-center space-x-4">
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold opacity-0 group-hover:opacity-100 transition-opacity">Retour à la galerie</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transition-transform group-hover:rotate-90 duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      </button>

      {/* Contenu principal */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-24 md:py-32">
        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            {/* Colonne de gauche : Titre et Sélecteur */}
            <div className="space-y-12 animate-in fade-in slide-in-from-left-8 duration-1000">
              <div>
                <span className="text-[10px] uppercase tracking-[0.5em] text-gray-400 mb-6 block font-bold">Services de conciergerie</span>
                <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">Réservation <br/><span className="italic">Privée</span></h2>
                <div className="h-[1px] w-20 bg-black mb-12"></div>
                <p className="text-gray-500 font-light leading-relaxed max-w-md text-lg">
                  Chaque œuvre d'Asma est unique. En réservant ici, vous initiez une acquisition personnalisée avec un accompagnement dédié.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold">Sélectionnez l'œuvre de votre choix</h4>
                <div className="flex overflow-x-auto pb-6 space-x-6 scrollbar-hide snap-x">
                  {PAINTINGS.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => setSelectedPaintingId(p.id)}
                      className={`relative shrink-0 w-32 md:w-48 cursor-pointer group snap-start transition-all duration-500 ${selectedPaintingId === p.id ? 'scale-105' : 'opacity-60 grayscale hover:opacity-100 hover:grayscale-0'}`}
                    >
                      <div className={`aspect-[4/5] bg-gray-50 border transition-all ${selectedPaintingId === p.id ? 'border-black' : 'border-transparent'}`}>
                        <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="mt-4">
                        <p className="text-[10px] font-serif truncate">{p.title}</p>
                        <p className="text-[8px] text-gray-400 tracking-widest">{p.price}</p>
                      </div>
                      {selectedPaintingId === p.id && (
                        <div className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full animate-in zoom-in">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  ))}
                  {/* Option Commande Spéciale */}
                  <div 
                    onClick={() => setSelectedPaintingId('custom')}
                    className={`relative shrink-0 w-32 md:w-48 cursor-pointer snap-start transition-all duration-500 flex flex-col items-center justify-center border border-dashed ${selectedPaintingId === 'custom' ? 'bg-black text-white border-black' : 'border-gray-300 text-gray-400 hover:border-black hover:text-black'}`}
                  >
                    <div className="aspect-[4/5] flex flex-col items-center justify-center p-4 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <p className="text-[10px] uppercase tracking-widest font-bold">Commande sur mesure</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Colonne de droite : Formulaire */}
            <form onSubmit={handleSubmit} className="bg-gray-50/50 p-8 md:p-12 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
              <div className="space-y-8">
                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block group-focus-within:text-black transition-colors">Nom complet</label>
                  <input required type="text" className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none focus:border-black transition-all" placeholder="Jean Dupont" />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all group-focus-within:w-full"></div>
                </div>

                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block group-focus-within:text-black transition-colors">Adresse Email</label>
                  <input required type="email" className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none focus:border-black transition-all" placeholder="jean@exemple.com" />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all group-focus-within:w-full"></div>
                </div>

                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block group-focus-within:text-black transition-colors">Téléphone</label>
                  <input type="tel" className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none focus:border-black transition-all" placeholder="+33 6 00 00 00 00" />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all group-focus-within:w-full"></div>
                </div>

                <div className="group relative">
                  <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gray-400 mb-2 block group-focus-within:text-black transition-colors">Votre message ou préférences</label>
                  <textarea rows={3} className="w-full bg-transparent border-b border-gray-200 py-3 text-lg outline-none focus:border-black transition-all resize-none" placeholder="Dites-nous en plus sur votre projet..." />
                  <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all group-focus-within:w-full"></div>
                </div>
              </div>

              <button 
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-6 text-[10px] uppercase tracking-[0.5em] font-bold transition-all relative overflow-hidden group ${isSubmitting ? 'bg-gray-200 text-gray-400 cursor-wait' : 'bg-black text-white hover:bg-gray-800'}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin mr-3"></div>
                    Traitement de votre demande...
                  </span>
                ) : (
                  <>
                    <span className="relative z-10">Confirmer la demande de réservation</span>
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </>
                )}
              </button>
              
              <p className="text-[9px] text-gray-400 text-center uppercase tracking-widest leading-relaxed">
                En cliquant sur confirmer, vous acceptez d'être recontacté(e) sous 48h pour finaliser les modalités d'acquisition.
              </p>
            </form>
          </div>
        ) : (
          /* Écran de succès */
          <div className="max-w-3xl mx-auto text-center py-20 space-y-12 animate-in zoom-in-95 fade-in duration-1000">
            <div className="w-24 h-24 border border-black rounded-full flex items-center justify-center mx-auto mb-16">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-5xl md:text-7xl font-serif">Demande reçue.</h2>
            <p className="text-xl md:text-2xl font-light text-gray-500 leading-relaxed italic">
              "L'art est un voyage qui commence par une intention." <br/>
              Nous avons bien reçu votre demande. Asma ou son conseiller vous contacteront personnellement dans les plus brefs délais pour donner suite à cette rencontre artistique.
            </p>
            <div className="pt-12">
              <button 
                onClick={onClose}
                className="border border-black px-12 py-5 text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-black hover:text-white transition-all"
              >
                Retourner à la collection
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Footer du salon */}
      <div className="p-8 border-t border-gray-100 flex justify-between items-center text-[8px] uppercase tracking-[0.4em] text-gray-400 font-bold">
        <span>© 2024 Éclat d'Art - Service Privé</span>
        <div className="flex space-x-8">
          <span>Paris</span>
          <span>Galerie En Ligne</span>
        </div>
      </div>
    </div>
  );
};

export default ReservationView;
