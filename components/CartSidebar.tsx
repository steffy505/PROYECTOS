import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Send, ChevronLeft, QrCode, ShieldCheck, Banknote, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
}

type PaymentMethod = 'yape' | 'efectivo';

const CartSidebar: React.FC<CartSidebarProps> = ({ isOpen, onClose, items, onUpdateQuantity, onRemove }) => {
  const [step, setStep] = React.useState<'cart' | 'payment-selection' | 'checkout'>('cart');
  const [paymentMethod, setPaymentMethod] = React.useState<PaymentMethod>('yape');
  const [approvalCode, setApprovalCode] = React.useState('');
  const [changeInfo, setChangeInfo] = React.useState('');
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  // URL de tu QR de Yape
  const qrImageUrl = "https://lh3.googleusercontent.com/d/1s38RB-sGygfXDFTWTE6GB-Q7nbdYxkMu";

  const handleSendWhatsApp = () => {
    if (paymentMethod === 'yape' && !approvalCode) {
      alert("Por favor, ingresa el código de aprobación de tu Yape.");
      return;
    }

    // CONFIGURACIÓN: Reemplaza con tu número real
    const phoneNumber = "51900000000"; 
    
    let message = `¡Hola La Casita de las Primas! 👋\nNuevo pedido solicitado:\n\n`;
    
    items.forEach(item => {
      message += `- ${item.quantity}x ${item.name} (S/ ${(item.price * item.quantity).toFixed(2)})\n`;
    });
    
    message += `\n*Total: S/ ${total.toFixed(2)}*`;
    message += `\n*Método de Pago: ${paymentMethod === 'yape' ? 'Yape' : 'Efectivo'}*`;
    
    if (paymentMethod === 'yape') {
      message += `\n*Código Yape: ${approvalCode}*`;
    } else if (changeInfo) {
      message += `\n*Nota sobre el pago: Pagaré con S/ ${changeInfo} (Necesito vuelto)*`;
    }
    
    message += `\n\nQuedo a la espera de la confirmación. ¡Gracias!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
    
    resetState();
    onClose();
  };

  const resetState = () => {
    setStep('cart');
    setPaymentMethod('yape');
    setApprovalCode('');
    setChangeInfo('');
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={handleClose} />
      
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center bg-[#FFB6C1] text-white">
          <div className="flex items-center gap-2">
            {step !== 'cart' && (
              <button 
                onClick={() => setStep(step === 'checkout' ? 'payment-selection' : 'cart')} 
                className="mr-2 p-1 hover:bg-white/20 rounded-full"
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <h2 className="text-xl font-bold flex items-center gap-2">
              {step === 'cart' && <><ShoppingBag size={20} /> Tu Pedido</>}
              {step === 'payment-selection' && "Elegir Pago"}
              {step === 'checkout' && (paymentMethod === 'yape' ? 'Pago con Yape' : 'Pago en Efectivo')}
            </h2>
          </div>
          <button onClick={handleClose} className="p-1 hover:bg-white/20 rounded-full">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {step === 'cart' && (
            <div className="space-y-6">
              {items.length === 0 ? (
                <div className="h-full py-20 flex flex-col items-center justify-center text-gray-400 space-y-4">
                  <ShoppingBag size={64} className="opacity-20" />
                  <p className="text-lg font-medium">Tu carrito está vacío</p>
                  <button onClick={onClose} className="text-[#FFB6C1] font-bold hover:underline">Ir a ver el menú</button>
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Resumen de productos</p>
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-gray-50 p-3 rounded-2xl border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-xl shadow-sm border border-white" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</h3>
                        <div className="flex items-center gap-3 mt-1">
                          <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
                            <button onClick={() => onUpdateQuantity(item.id, -1)} className="px-2 py-1 hover:bg-gray-50"><Minus size={10} /></button>
                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity(item.id, 1)} className="px-2 py-1 hover:bg-gray-50"><Plus size={10} /></button>
                          </div>
                          <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500"><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <p className="font-black text-gray-800 text-sm">S/ {(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 'payment-selection' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <p className="text-gray-500 font-medium text-center">¿Cómo deseas pagar tu pedido?</p>
              
              <div className="grid grid-cols-1 gap-4">
                <button 
                  onClick={() => { setPaymentMethod('yape'); setStep('checkout'); }}
                  className="group relative flex items-center gap-5 p-6 rounded-[2rem] border-2 border-gray-100 hover:border-[#7d2181] hover:bg-purple-50 transition-all text-left"
                >
                  <div className="bg-[#7d2181] text-white p-4 rounded-2xl shadow-lg shadow-purple-200">
                    <QrCode size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-lg">Yape</h4>
                    <p className="text-sm text-gray-500">Pago rápido mediante QR.</p>
                  </div>
                  <ChevronLeft className="ml-auto rotate-180 text-gray-300 group-hover:text-[#7d2181]" />
                </button>

                <button 
                  onClick={() => { setPaymentMethod('efectivo'); setStep('checkout'); }}
                  className="group relative flex items-center gap-5 p-6 rounded-[2rem] border-2 border-gray-100 hover:border-green-500 hover:bg-green-50 transition-all text-left"
                >
                  <div className="bg-green-500 text-white p-4 rounded-2xl shadow-lg shadow-green-200">
                    <Banknote size={28} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800 text-lg">Efectivo</h4>
                    <p className="text-sm text-gray-500">Paga al recibir el pedido.</p>
                  </div>
                  <ChevronLeft className="ml-auto rotate-180 text-gray-300 group-hover:text-green-500" />
                </button>
              </div>
            </div>
          )}

          {step === 'checkout' && paymentMethod === 'yape' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
              <div className="text-center space-y-2">
                <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Total a Yapear</p>
                <div className="text-4xl font-black text-[#7d2181]">S/ {total.toFixed(2)}</div>
              </div>
              
              <div className="mx-auto w-64 aspect-square bg-white p-4 rounded-[2.5rem] shadow-xl border-4 border-[#7d2181]/10">
                <img 
                  src={qrImageUrl} 
                  alt="QR Yape" 
                  className="w-full h-full object-contain rounded-xl"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/400x400/7d2181/white?text=QR+YAPE" }}
                />
              </div>

              <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Código de Aprobación</span>
                  <input 
                    type="text" 
                    placeholder="Ej: 876123"
                    value={approvalCode}
                    onChange={(e) => setApprovalCode(e.target.value)}
                    className="mt-1 w-full bg-gray-50 border-2 border-gray-100 focus:border-[#7d2181] rounded-2xl p-4 text-center text-lg font-black tracking-[0.2em] outline-none transition-all"
                  />
                </label>
                <div className="bg-purple-50 p-4 rounded-2xl border border-purple-100 flex gap-3">
                  <ShieldCheck className="text-[#7d2181] shrink-0" size={20} />
                  <p className="text-[11px] text-purple-700 leading-tight">
                    Tu pago es verificado manualmente al recibir el WhatsApp. Por favor, asegúrate de que el código sea correcto.
                  </p>
                </div>
              </div>
            </div>
          )}

          {step === 'checkout' && paymentMethod === 'efectivo' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 py-4">
               <div className="flex flex-col items-center text-center space-y-4">
                  <div className="bg-green-100 p-8 rounded-full text-green-500">
                    <CheckCircle2 size={64} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-gray-800">Pago en Puerta</h3>
                    <p className="text-gray-500 max-w-xs mx-auto">
                      Prepararemos tu pedido de inmediato y pagarás al momento de la entrega.
                    </p>
                  </div>
               </div>

               <div className="space-y-4">
                <label className="block">
                  <span className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">¿Necesitas vuelto?</span>
                  <input 
                    type="text" 
                    placeholder="Ej: Pago con un billete de S/ 20"
                    value={changeInfo}
                    onChange={(e) => setChangeInfo(e.target.value)}
                    className="mt-1 w-full bg-gray-50 border-2 border-gray-100 focus:border-green-500 rounded-2xl p-4 text-sm font-bold outline-none transition-all"
                  />
                </label>
                <p className="text-[11px] text-gray-400 text-center px-4">
                  Informar si necesitas vuelto nos ayuda a que el repartidor llegue preparado y tu entrega sea más rápida.
                </p>
               </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {items.length > 0 && (
          <div className="p-6 border-t bg-white shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.05)] space-y-4">
            {step === 'cart' && (
              <>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-black text-gray-400 uppercase">Subtotal</span>
                  <span className="text-2xl font-black text-[#FFB6C1]">S/ {total.toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => setStep('payment-selection')}
                  className="w-full bg-[#FFB6C1] text-white py-4 rounded-2xl font-black shadow-lg shadow-pink-100 hover:bg-[#ffa0b0] transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  Continuar al Pago <ChevronLeft className="rotate-180" size={20} />
                </button>
              </>
            )}

            {step === 'checkout' && (
              <button 
                onClick={handleSendWhatsApp}
                className={`w-full ${paymentMethod === 'yape' ? 'bg-[#7d2181]' : 'bg-[#25D366]'} text-white py-4 rounded-2xl font-black shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2`}
              >
                <Send size={20} /> {paymentMethod === 'yape' ? 'Confirmar Yapeo' : 'Enviar Pedido'} por WhatsApp
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;