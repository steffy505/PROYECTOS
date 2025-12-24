
import React from 'react';
import { Star, MessageCircle, ThumbsUp, Quote } from 'lucide-react';
import { REVIEWS } from '../constants';

const ReviewsView: React.FC = () => {
  return (
    <div className="space-y-12 animate-in fade-in duration-500 max-w-5xl mx-auto pb-20">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black text-gray-800">Voces de Nuestros Clientes</h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          La satisfacción de quienes nos eligen es nuestra mayor recompensa. Descubre sus experiencias.
        </p>
        <div className="flex items-center justify-center gap-1 text-[#FFB6C1]">
          {[1,2,3,4,5].map(i => <Star key={i} size={24} fill="currentColor" />)}
          <span className="ml-2 font-black text-gray-800">4.9 / 5.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REVIEWS.map((review) => (
          <div 
            key={review.id} 
            className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative group hover:shadow-xl transition-all duration-300"
          >
            <Quote className="absolute top-8 right-8 text-[#FFB6C1]/10 w-16 h-16" />
            
            <div className="flex items-center gap-4 mb-6 relative">
              <img 
                src={review.avatar} 
                alt={review.user} 
                className="w-14 h-14 rounded-full border-2 border-[#FFB6C1] p-0.5"
              />
              <div>
                <h4 className="font-bold text-gray-800">{review.user}</h4>
                <div className="flex gap-0.5 mt-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={14} 
                      className={i < review.rating ? 'text-[#FFB6C1]' : 'text-gray-200'} 
                      fill={i < review.rating ? 'currentColor' : 'none'} 
                    />
                  ))}
                </div>
              </div>
              <span className="ml-auto text-xs text-gray-400 font-medium">{review.date}</span>
            </div>

            <p className="text-gray-600 leading-relaxed italic relative">
              "{review.comment}"
            </p>

            <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between text-gray-400">
               <button className="flex items-center gap-2 hover:text-[#FFB6C1] transition-colors">
                <ThumbsUp size={16} /> <span className="text-xs font-bold">Útil</span>
              </button>
              <button className="flex items-center gap-2 hover:text-[#FFB6C1] transition-colors">
                <MessageCircle size={16} /> <span className="text-xs font-bold">Responder</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#FFB6C1] rounded-[3rem] p-10 text-white text-center shadow-2xl shadow-pink-100 overflow-hidden relative">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-4">¿Te gustaría compartir tu experiencia?</h3>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">Ayúdanos a seguir mejorando para ofrecerte siempre la mejor calidad.</p>
          <button className="bg-white text-[#FFB6C1] px-10 py-4 rounded-2xl font-black shadow-lg hover:scale-105 transition-transform">
            Escribir Reseña
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default ReviewsView;
