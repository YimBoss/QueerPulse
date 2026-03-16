'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('qp_cookies_accepted')) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('qp_cookies_accepted', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 lg:left-auto lg:w-96 z-[1000] glass p-6 rounded-[2rem] border-pink-500/20 animate-in slide-in-from-bottom-5">
      <p className="text-[10px] text-zinc-400 leading-normal mb-4">
        Usamos cookies para que QueerPulse brille más. Al seguir aquí, aceptas que usemos datos para anuncios y análisis. 
        Lee nuestra <Link href="/cookies" className="text-pink-500 underline">Política de Cookies</Link>.
      </p>
      <button 
        onClick={accept}
        className="w-full bg-white text-black py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition-all"
      >
        ACEPTAR Y CONTINUAR
      </button>
    </div>
  );
}