
import React from 'react';
import { ShoppingCart, Menu, X, Home, Utensils, MessageSquare, CreditCard } from 'lucide-react';
import { ViewType } from '../types';

interface NavbarProps {
  currentView: ViewType;
  onNavigate: (view: ViewType) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, cartCount, onOpenCart }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'inicio', label: 'Inicio', icon: <Home size={18} /> },
    { id: 'productos', label: 'Productos', icon: <Utensils size={18} /> },
    { id: 'comentarios', label: 'Comentarios', icon: <MessageSquare size={18} /> },
    { id: 'pagos', label: 'Medios de Pago', icon: <CreditCard size={18} /> },
  ];

  return (
    <nav className="bg-[#FFB6C1] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => onNavigate('inicio')}>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white">La Casita <span className="text-pink-50 font-medium">de las Primas</span></span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id as ViewType)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-sm font-semibold ${
                  currentView === item.id 
                    ? 'bg-white text-[#FFB6C1] shadow-lg' 
                    : 'hover:bg-white/20'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Cart Icon */}
          <div className="flex items-center gap-4">
            <button 
              onClick={onOpenCart}
              className="relative p-2 rounded-full hover:bg-white/20 transition-colors"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-[#FFB6C1]">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-full hover:bg-white/20 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FFB6C1] border-t border-white/20 pb-4 pt-2 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id as ViewType);
                setIsMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                currentView === item.id 
                  ? 'bg-white text-[#FFB6C1] font-semibold shadow-lg' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
