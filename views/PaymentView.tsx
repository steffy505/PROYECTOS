
import React from 'react';
import { Smartphone, Banknote, ShieldCheck, QrCode, ExternalLink } from 'lucide-react';

const PaymentView: React.FC = () => {
  const qrImageUrl = "https://lh3.googleusercontent.com/d/1s38RB-sGygfXDFTWTE6GB-Q7nbdYxkMu";

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in slide-in-from-right-4 duration-500 pb-20">
      <div className="text-center">
        <h2 className="text-4xl font-black text-gray-800">Medios de Pago</h2>
        <p className="text-gray-500 mt-4 max-w-xl mx-auto">
          En La Casita de las Primas hacemos todo simple para ti.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Yape Section */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-300">
          <div className="bg-[#7d2181]/10 p-6 rounded-3xl">
            <Smartphone size={64} className="text-[#7d2181]" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">Yape</h3>
            <p className="text-gray-500 mt-2">Envíanos un Yapeo al instante. Rápido y seguro.</p>
          </div>
          
          <div className="w-full bg-gray-50 p-6 rounded-2xl border border-gray-100 space-y-4">
            <div className="flex items-center justify-center gap-2 text-sm font-bold text-gray-800">
               <QrCode size={18} className="text-[#7d2181]" /> Escanea el QR para pagar
            </div>
            <div className="aspect-square w-48 bg-white mx-auto flex items-center justify-center border-4 border-white shadow-md rounded-xl overflow-hidden">
               <img 
                src={qrImageUrl} 
                alt="QR Yape La Casita" 
                className="w-full h-full object-contain p-2"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://placehold.co/400x400/7d2181/white?text=QR+YAPE";
                }}
               />
            </div>
            <p className="text-[10px] text-gray-400 italic">
              Recuerda guardar tu código de aprobación para confirmar tu pedido.
            </p>
          </div>
        </div>

        {/* Cash Section */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center text-center space-y-6 hover:shadow-xl transition-all duration-300">
          <div className="bg-green-100 p-6 rounded-3xl">
            <Banknote size={64} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800">Efectivo</h3>
            <p className="text-gray-500 mt-2">Paga al recibir tu pedido en la puerta de tu casa.</p>
          </div>
          <div className="flex-1 flex items-center">
             <div className="p-8 border-2 border-dashed border-green-100 rounded-[2rem] text-sm text-gray-400 font-medium leading-relaxed">
               Por favor, indica si necesitas vuelto al momento de confirmar tu pedido por WhatsApp para agilizar la entrega.
             </div>
          </div>
        </div>
      </div>

      <div className="bg-[#FFB6C1]/5 rounded-[2.5rem] p-10 border-2 border-dashed border-[#FFB6C1]/30 flex flex-col md:flex-row items-center gap-8">
        <div className="bg-white p-6 rounded-full shadow-sm">
           <ShieldCheck size={48} className="text-[#FFB6C1]" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-2xl font-bold text-gray-800 mb-2">Seguridad Garantizada</h4>
          <p className="text-gray-500 leading-relaxed">
            Tu confianza es fundamental. Recibimos los pagos directamente y verificamos cada transacción para tu tranquilidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentView;
