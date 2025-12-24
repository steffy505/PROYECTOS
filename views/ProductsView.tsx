
import React from 'react';
import { ShoppingCart, Plus, Info, Filter } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';

interface ProductsViewProps {
  onAddToCart: (product: Product) => void;
}

const ProductsView: React.FC<ProductsViewProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = React.useState('Todos');
  const categories = ['Todos', 'Comida', 'Bebidas', 'Postres'];
  
  const filteredProducts = filter === 'Todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">Nuestro Menú</h2>
          <p className="text-gray-500 mt-2">Productos frescos preparados con amor de primas.</p>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
          <Filter size={18} className="text-gray-400 mr-2 shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 ${
                filter === cat 
                  ? 'bg-[#FFB6C1] text-white shadow-lg shadow-pink-100' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col group"
          >
            <div className="h-64 relative overflow-hidden bg-gray-50">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
              {product.stock <= 5 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-lg">
                  ¡QUEDAN POCAS!
                </div>
              )}
            </div>
            
            <div className="p-6 flex flex-col flex-1">
              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-widest font-black text-[#FFB6C1] mb-1 block">
                  {product.category}
                </span>
                <h3 className="text-xl font-bold text-gray-800 leading-tight mb-2 group-hover:text-[#FFB6C1] transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
                  {product.description}
                </p>
              </div>

              <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-bold block uppercase tracking-tighter">Precio</span>
                  <span className="text-2xl font-black text-gray-800">S/ {product.price.toFixed(2)}</span>
                </div>
                
                <button 
                  onClick={() => onAddToCart(product)}
                  className="bg-[#FFB6C1] text-white p-4 rounded-2xl shadow-lg shadow-pink-100 hover:bg-[#ffa0b0] transition-all transform active:scale-90"
                >
                  <Plus size={24} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsView;
