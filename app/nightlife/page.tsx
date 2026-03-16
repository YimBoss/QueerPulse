'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function Nightlife() {
  const supabase = React.useRef(createClient()).current
  const [places, setPlaces] = useState<any[]>([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const load = async () => {
      const q = supabase.from('places').select('*').order('name')
      const { data, error } = await q
      if (error) {
        console.warn('Error cargando places', error)
        setPlaces([])
        return
      }
      setPlaces(data || [])
    }
    load()
  }, [supabase])

  const filtered = places.filter(p => !filter || (p.category || '').toLowerCase().includes(filter.toLowerCase()) || (p.neighborhood || '').toLowerCase().includes(filter.toLowerCase()))

  return (
    <div style={{ padding: 20 }}>
      <h2>Nightlife y diversión — Bares, discotecas, saunas y hoteles LGBT en Madrid</h2>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <input placeholder="Filtrar por categoría o barrio (ej. bar, chueca)" value={filter} onChange={e => setFilter(e.target.value)} style={{ padding: 8, width: 320 }} />
      </div>

      {filtered.length === 0 ? (
        <p>No hay locales listados. Puedes añadirlos desde Supabase → Table Editor → places.</p>
      ) : (
        <div style={{ display: 'grid', gap: 12 }}>
          {filtered.map(p => (
            <div key={p.id} style={{ padding: 12, background: '#071026', borderRadius: 8 }}>
              <strong style={{ fontSize: 16 }}>{p.name}</strong> <span style={{ color: '#94a3b8' }}>({p.category})</span>
              <div style={{ color: '#cbd5e1' }}>{p.address} — {p.neighborhood}</div>
              {p.website && <div><a href={p.website} target="_blank" rel="noreferrer">{p.website}</a></div>}
              {p.description && <div style={{ marginTop: 6 }}>{p.description}</div>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}