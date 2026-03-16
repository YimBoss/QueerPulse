'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Verificamos si ya aceptó anteriormente
    const isAccepted = localStorage.getItem('qp_age_verified');
    if (!isAccepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('qp_age_verified', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-95 backdrop-blur-xl">
      <div className="max-w-md w-full p-10 bg-zinc-900 border border-pink-500/30 rounded-[3rem] text-center shadow-[0_0_100px_rgba(236,72,153,0.15)]">
        <div className="mb-6 inline-block p-4 bg-pink-500/10 rounded-full">
          <span className="text-4xl">🔞</span>
        </div>
        
        <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">
          CONTENIDO ADULTO
        </h2>
        
        <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-medium">
          Esta plataforma contiene información sobre locales de ocio nocturno y chats para adultos. 
          <span className="block mt-2 text-zinc-500 italic">¿Eres mayor de 18 años?</span>
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={handleAccept}
            className="w-full py-4 bg-pink-600 hover:bg-pink-500 text-white font-black rounded-2xl transition-all uppercase tracking-widest text-xs"
          >
            Sí, soy mayor de edad
          </button>
          
          <button 
            onClick={() => window.location.href = "https://www.google.com"}
            className="w-full py-4 bg-transparent border border-zinc-800 text-zinc-500 hover:text-white font-bold rounded-2xl transition-all text-xs"
          >
            No, salir
          </button>
        </div>

        <p className="mt-8 text-[10px] text-zinc-600 uppercase tracking-tighter">
          Al entrar, aceptas nuestros Términos y Política de Cookies.
        </p>
      </div>
    </div>
  );
}