
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="contact" className="bg-white border-t border-gray-100 py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <span className="text-2xl font-serif font-bold tracking-tight mb-4 block uppercase">Éclat d'Art</span>
          <p className="text-gray-500 font-light max-w-sm mb-8">
            Inscrivez-vous à la newsletter privée d'Asma pour être informé en priorité de ses nouvelles créations et des vernissages exclusifs.
          </p>
          <div className="flex max-w-sm">
            <input 
              type="email" 
              placeholder="Votre adresse email" 
              className="flex-1 border-b border-gray-300 py-2 text-sm outline-none focus:border-black transition-colors"
            />
            <button className="text-xs uppercase tracking-widest font-bold ml-4 pb-2 border-b border-black">S'abonner</button>
          </div>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-6">Navigation</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><a href="#home" className="hover:text-black">Accueil</a></li>
            <li><a href="#gallery" className="hover:text-black">Collection</a></li>
            <li><a href="#about" className="hover:text-black">L'Artiste</a></li>
            <li><a href="#shipping" className="hover:text-black">Livraison & Retours</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.3em] font-bold mb-6">Suivez-moi</h4>
          <ul className="space-y-4 text-sm text-gray-500 font-light">
            <li><a href="#" className="hover:text-black">Instagram</a></li>
            <li><a href="#" className="hover:text-black">Pinterest</a></li>
            <li><a href="#" className="hover:text-black">LinkedIn</a></li>
            <li><a href="#" className="hover:text-black">Behance</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-gray-400">
        <p>© 2024 Éclat d'Art - Asma. Tous droits réservés.</p>
        <div className="flex space-x-8">
          <a href="#" className="hover:text-black">Mentions Légales</a>
          <a href="#" className="hover:text-black">CGV</a>
          <a href="#" className="hover:text-black">Confidentialité</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
