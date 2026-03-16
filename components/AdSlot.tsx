'use client';

export default function AdSlot({ position }: { position: 'top' | 'left' | 'bottom' }) {
  const styles = {
    top: "w-full h-[90px] bg-zinc-900/40 border-b border-zinc-800 flex items-center justify-center text-[10px] text-zinc-600 tracking-[0.4em] uppercase",
    left: "hidden xl:flex w-[160px] h-full bg-zinc-950 border-r border-zinc-900 items-center justify-center text-[10px] text-zinc-700 writing-vertical rotate-180 uppercase tracking-widest sticky top-0",
    bottom: "w-full h-[100px] bg-gradient-to-t from-pink-950/10 to-transparent border-t border-zinc-900 flex items-center justify-center text-[10px] text-zinc-600 tracking-[0.4em] uppercase"
  };

  return (
    <div className={styles[position]}>
      <div className="flex flex-col items-center gap-1">
        <span className="opacity-40 font-bold">Publicidad</span>
        <span className="text-[8px] text-pink-500/50">Espacio Disponible</span>
      </div>
    </div>
  );
}