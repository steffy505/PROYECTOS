import React from 'react';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import HomeView from './views/HomeView';
import ProductsView from './views/ProductsView';
import ReviewsView from './views/ReviewsView';
import PaymentView from './views/PaymentView';
import { ViewType, CartItem, Product } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = React.useState<ViewType>('inicio');
  const [cartItems, setCartItems] = React.useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  // Efecto para subir al inicio cada vez que cambiamos de pestaña
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderView = () => {
    switch (currentView) {
      case 'inicio': return <HomeView onExplore={() => setCurrentView('productos')} />;
      case 'productos': return <ProductsView onAddToCart={handleAddToCart} />;
      case 'comentarios': return <ReviewsView />;
      case 'pagos': return <PaymentView />;
      default: return <HomeView onExplore={() => setCurrentView('productos')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-[#FFB6C1] selection:text-white">
      <Navbar 
        currentView={currentView} 
        onNavigate={setCurrentView} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {renderView()}
      </main>

      <footer className="bg-white border-t border-gray-100 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <span className="text-2xl font-black tracking-tight text-[#FFB6C1]">La Casita <span className="text-gray-800 font-medium">de las Primas</span></span>
            <p className="text-gray-400 text-sm mt-2 font-medium">Sabor casero y atención personalizada.</p>
          </div>
          <div className="flex gap-8 text-sm font-bold text-gray-500">
            <a href="#" className="hover:text-[#FFB6C1] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#FFB6C1] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#FFB6C1] transition-colors">Ubicación</a>
          </div>
        </div>
      </footer>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
    </div>
  );
};

export default App;