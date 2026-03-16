'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SupportPage() {
  const supabase = React.useRef(createClient()).current
  const [orgs, setOrgs] = useState<any[]>([])

  useEffect(() => {
    const load = async () => {
      // asumimos que tienes una tabla 'support_orgs' en Supabase con datos,
      // si no existe, rellena manualmente desde Table Editor o te doy el SQL.
      const { data, error } = await supabase.from('support_orgs').select('*').order('name')
      if (error) {
        console.warn('No existe tabla support_orgs o error:', error)
        setOrgs([])
        return
      }
      setOrgs(data || [])
    }
    load()
  }, [supabase])

  return (
    <div style={{ padding: 20 }}>
      <h2>Red de apoyo — Servicios LGBT+ en Madrid</h2>
      {orgs.length === 0 ? (
        <div style={{ marginTop: 12 }}>
          <p>No hay organizaciones listadas. Puedes añadirlas en Supabase → Table Editor → support_orgs.</p>
        </div>
      ) : (
        <ul>
          {orgs.map((o) => (
            <li key={o.id} style={{ marginBottom: 12, background: '#071026', padding: 12, borderRadius: 8 }}>
              <strong>{o.name}</strong><br />
              <span style={{ color: '#94a3b8' }}>{o.description}</span><br />
              <a href={o.website} target="_blank" rel="noreferrer">{o.website}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}