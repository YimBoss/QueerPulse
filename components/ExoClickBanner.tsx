'use client';
import { useEffect } from 'react';

export default function ExoClickBanner() {
  useEffect(() => {
    try {
      // 1. Cargamos el script principal de ExoClick
      const script = document.createElement('script');
      script.src = "https://a.magsrv.com/ad-provider.js";
      script.async = true;
      script.type = "application/javascript";
      document.body.appendChild(script);

      // 2. Ejecutamos el push para que el anuncio se sirva
      const inlineScript = document.createElement('script');
      inlineScript.innerHTML = '(window.AdProvider = window.AdProvider || []).push({"serve": {}});';
      document.body.appendChild(inlineScript);
    } catch (e) {
      console.error("Error cargando publicidad:", e);
    }
  }, []);

  return (
    <div className="flex flex-col items-center my-6 w-full min-h-[250px] justify-center">
      <span className="text-[10px] text-gray-500 mb-2 uppercase tracking-widest">Publicidad</span>
      <div className="bg-gray-900/30 rounded-lg p-1 border border-gray-800">
        {/* Este es el bloque que identifica tu zona de anuncios */}
        <ins className="eas6a97888e2" data-zoneid="5838370"></ins>
      </div>
    </div>
  );
}