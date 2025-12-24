
import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ChevronLeft, QrCode, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const [isPaying, setIsPaying] = React.useState(false);
  const [approvalCode, setApprovalCode] = React.useState('');
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const qrImageUrl = "https://lh3.googleusercontent.com/d/1s38RB-sGygfXDFTWTE6GB-Q7nbdYxkMu";

  const handleSendWhatsApp = () => {
    if (!approvalCode && isPaying) {
      alert("Por favor, ingresa el código de aprobación de tu Yape.");
      return;
    }

    const phoneNumber = "51900000000"; // Reemplazar con el número real de la tienda
    let message = "¡Hola La Casita de las Primas! 👋\nHe realizado un pago por Yape y quiero confirmar mi pedido:\n\n";
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (S/ ${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += `\n*Total Pagado: S/ ${total.toFixed(2)}*`;
    message += `\n*Código de Aprobación Yape: ${approvalCode}*\n\n`;
    message += "Quedo atento a la confirmación del envío. ¡Gracias!";
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    // Reset state after sending
    setIsPaying(false);
    setApprovalCode('');
    onClose();
  };

  const resetAndClose = () => {
    setIsPaying(false);
    setApprovalCode('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={resetAndClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300">
        <div className="p-6 border-b flex justify-between items-center bg-[#FFB6C1] text-white">
          <div className="flex items-center gap-2">
            {isPaying && (
              <button onClick={() => setIsPaying(false)} className="mr-2 p-1 hover:bg-white/20 rounded-full">
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold flex items-center gap-2">
              {isPaying ? 'Confirmar Pago' : <><ShoppingBag size={20} /> Tu Pedido</>}
            </h2>
          </div>
          <button onClick={resetAndClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {!isPaying ? (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="h-full py-20 flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-[#FFB6C1] font-semibold hover:underline">
                    Explorar nuestro menú
                  </button>
                </div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Resumen de Productos</p>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center mb-4 last:mb-0">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm border border-white" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="p-1 hover:bg-gray-100 rounded-l-lg"><Minus size={12} /></button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="p-1 hover:bg-gray-100 rounded-r-lg"><Plus size={12} /></button>
                          </div>
                          <button onClick={() => onRemove(item.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-gray-800 text-sm">S/ {(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center space-y-2">
                <p className="text-gray-500 text-sm font-medium">Escanea y paga con Yape para finalizar tu pedido.</p>
                <div className="text-2xl font-black text-[#FFB6C1]">Total: S/ {total.toFixed(2)}</div>
              </div>
              
              <div className="relative group mx-auto w-64 aspect-square bg-white p-4 rounded-[2rem] shadow-xl border-4 border-[#FFB6C1]/20">
                <img 
                  src={qrImageUrl} 
                  alt="QR Yape La Casita" 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "https://placehold.co/400x400/FFB6C1/white?text=QR+YAPE";
                  }}
                />
                <div className="absolute -bottom-3 -right-3 bg-[#7d2181] text-white p-3 rounded-2xl shadow-lg">
                  <QrCode size={24} />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Código de Aprobación</span>
                  <input 
                    type="text" 
                    placeholder="Ej: 123456"
                    value={approvalCode}
                    onChange={(e) => setApprovalCode(e.target.value)}
                    className="mt-1 w-full bg-gray-50 border-2 border-gray-100 focus:border-[#FFB6C1] focus:ring-0 rounded-2xl p-4 text-center text-lg font-black tracking-widest outline-none transition-all"
                  />
                </label>
                <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start">
                  <ShieldCheck className="text-blue-500 shrink-0 mt-0.5" size={18} />
                  <p className="text-[11px] text-blue-700 leading-tight">
                    Tu pago es procesado directamente por Yape. El código de aprobación nos permite verificar tu transacción rápidamente.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t space-y-4 bg-white shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)]">
            {!isPaying ? (
              <>
                <div className="flex justify-between items-end mb-2">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Total Estimado</span>
                  <span className="text-3xl font-black text-[#FFB6C1]">S/ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setIsPaying(true)}
                  className="w-full bg-[#FFB6C1] text-white py-4 rounded-2xl font-black shadow-lg shadow-pink-100 hover:bg-[#ffa0b0] transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Continuar al Pago <ChevronLeft className="rotate-180" size={20} />
                </button>
              </>
            ) : (
              <button 
                onClick={handleSendWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-black shadow-lg shadow-green-100 hover:bg-[#20ba59] transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <Send size={20} /> Finalizar y Enviar Pedido
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
