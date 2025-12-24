
import React from 'react';
import { ArrowRight, Sparkles, TrendingUp, Package, AlertCircle } from 'lucide-react';
import { PRODUCTS } from '../constants';

interface HomeViewProps {
  onExplore: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onExplore }) => {
  // Mostramos los primeros 8 productos para la sección de stock rápido
  const stockHighlights = PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-12 pb-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FFB6C1] to-[#ffdae0] p-8 md:p-16 text-white">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6">
             <Sparkles size={16} /> ¡Bienvenidos a nuestra casita!
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-black mb-6 leading-tight">
            Sabor Casero <br /> con Amor de Primas.
          </h1>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-lg font-medium leading-relaxed">
            Deliciosas hamburguesas, chorizos artesanales y las mejores bebidas. Calidad garantizada en cada bocado.
          </p>
          <button 
            onClick={onExplore}
            className="bg-white text-[#FFB6C1] px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-pink-900/10 flex items-center gap-2 hover:translate-x-1 transition-transform"
          >
            Ver Menú de Hoy <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block">
           <img 
            src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=800&auto=format&fit=crop" 
            alt="Hero food" 
            className="w-full h-full object-cover rounded-l-[100px] opacity-90 shadow-2xl"
           />
        </div>
      </section>

      {/* Stock en Tiempo Real y Disponibilidad */}
      <section>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 flex items-center gap-2">
              <Package className="text-[#FFB6C1]" /> Stock Disponible
            </h2>
            <p className="text-gray-500 mt-1">Indicadores actualizados en tiempo real.</p>
          </div>
          <div className="bg-orange-50 text-orange-600 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 border border-orange-100">
            <AlertCircle size={16} /> ¡Se agotan rápido!
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stockHighlights.map((product) => {
            const stockPercent = (product.stock / product.maxStock) * 100;
            const stockColor = stockPercent > 50 ? 'bg-green-500' : stockPercent > 20 ? 'bg-orange-400' : 'bg-red-500';
            
            return (
              <div 
                key={product.id} 
                className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-gray-800 leading-tight group-hover:text-[#FFB6C1] transition-colors">{product.name}</h3>
                  <span className="text-[#FFB6C1] font-black shrink-0 ml-2">S/ {product.price.toFixed(2)}</span>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    <span>Unidades</span>
                    <span className={stockPercent <= 20 ? 'text-red-500' : 'text-gray-800'}>
                      {product.stock} / {product.maxStock}
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${stockColor} transition-all duration-1000 ease-out`}
                      style={{ width: `${stockPercent}%` }}
                    />
                  </div>
                </div>
                
                <button 
                  onClick={onExplore}
                  className="w-full mt-6 bg-[#FFB6C1]/10 text-[#FFB6C1] py-3 rounded-xl text-xs font-bold hover:bg-[#FFB6C1] hover:text-white transition-all uppercase tracking-widest"
                >
                  Ver en catálogo
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Highlight Banner */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB6C1]/10 rounded-full -mr-16 -mt-16 blur-3xl" />
        <div className="relative z-10 text-center md:text-left">
          <h3 className="text-3xl font-black mb-2">¡Antojo Dulce!</h3>
          <p className="text-gray-400 font-medium">Prueba nuestras nuevas gelatinas en vaso y bolsita desde S/ 1.00.</p>
        </div>
        <div className="relative z-10">
          <button 
            onClick={onExplore}
            className="bg-[#FFB6C1] text-white px-10 py-4 rounded-2xl font-black shadow-lg shadow-pink-500/20 hover:scale-105 transition-transform"
          >
            Ver Postres
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomeView;
