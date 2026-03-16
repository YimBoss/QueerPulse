'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function AdminPage() {
  const supabase = React.useRef(createClient()).current
  const [user, setUser] = useState<any | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [places, setPlaces] = useState<any[]>([])
  const [orgs, setOrgs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [msg, setMsg] = useState<string | null>(null)

  // Form state for new place
  const [placeForm, setPlaceForm] = useState<any>({ name: '', category: '', address: '', neighborhood: '', lat: '', lng: '', phone: '', website: '', description: '' })
  const [orgForm, setOrgForm] = useState<any>({ name: '', description: '', website: '', phone: '' })
  // site_settings
  const [exoTop, setExoTop] = useState('')
  const [exoBottom, setExoBottom] = useState('')

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const { data } = await supabase.auth.getUser()
      const u = data?.user ?? null
      setUser(u)
      if (u) {
        // cargar perfil
        const { data: p } = await supabase.from('profiles').select('id, username, is_admin').eq('id', u.id).maybeSingle()
        setProfile(p ?? null)
        setIsAdmin(!!(p as { is_admin?: boolean } | null)?.is_admin)
      }
      await loadAll()
      setLoading(false)
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadAll = async () => {
    const { data: ps } = await supabase.from('places').select('*').order('name')
    setPlaces(ps || [])
    const { data: og } = await supabase.from('support_orgs').select('*').order('name')
    setOrgs(og || [])
    const { data: top } = await supabase.from('site_settings').select('value').eq('key', 'exo_top').maybeSingle()
    const { data: bottom } = await supabase.from('site_settings').select('value').eq('key', 'exo_bottom').maybeSingle()
    setExoTop((top as { value?: string } | null)?.value ?? '')
    setExoBottom((bottom as { value?: string } | null)?.value ?? '')
  }

  if (loading) return <div style={{ padding: 20 }}>Cargando...</div>
  if (!user) return <div style={{ padding: 20 }}>Debes iniciar sesión para ver el panel de administración.</div>
  if (!isAdmin) return <div style={{ padding: 20 }}>Acceso denegado. Necesitas permisos de administrador.</div>

  // Places CRUD
  const createPlace = async () => {
    setMsg(null)
    const payload = {
      name: placeForm.name,
      category: placeForm.category,
      address: placeForm.address,
      neighborhood: placeForm.neighborhood,
      lat: placeForm.lat ? Number(placeForm.lat) : null,
      lng: placeForm.lng ? Number(placeForm.lng) : null,
      phone: placeForm.phone,
      website: placeForm.website,
      description: placeForm.description
    }
    const { error } = await (supabase.from('places') as any).insert([payload])
    if (error) return setMsg('Error creando lugar: ' + error.message)
    setMsg('Lugar creado')
    setPlaceForm({ name: '', category: '', address: '', neighborhood: '', lat: '', lng: '', phone: '', website: '', description: '' })
    await loadAll()
  }

  const deletePlace = async (id: number) => {
    if (!confirm('¿Borrar este lugar?')) return
    const { error } = await (supabase.from('places') as any).delete().eq('id', id)
    if (error) return setMsg('Error borrando: ' + error.message)
    setMsg('Lugar borrado')
    await loadAll()
  }

  // Orgs CRUD
  const createOrg = async () => {
    setMsg(null)
    const payload = { name: orgForm.name, description: orgForm.description, website: orgForm.website, phone: orgForm.phone }
    const { error } = await (supabase.from('support_orgs') as any).insert([payload])
    if (error) return setMsg('Error creando organización: ' + error.message)
    setMsg('Organización creada')
    setOrgForm({ name: '', description: '', website: '', phone: '' })
    await loadAll()
  }

  const deleteOrg = async (id: number) => {
    if (!confirm('¿Borrar esta organización?')) return
    const { error } = await (supabase.from('support_orgs') as any).delete().eq('id', id)
    if (error) return setMsg('Error borrando: ' + error.message)
    setMsg('Organización borrada')
    await loadAll()
  }

  // Site settings update (ads)
  const saveAds = async () => {
    setMsg(null)
    // upsert exo_top
    await (supabase.from('site_settings') as any).upsert([{ key: 'exo_top', value: exoTop }])
    await (supabase.from('site_settings') as any).upsert([{ key: 'exo_bottom', value: exoBottom }])
    setMsg('Tags publicitarios guardados')
    await loadAll()
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Panel de administración</h2>
      <p>Usuario: {profile?.username} {profile?.is_admin && <strong>(admin)</strong>}</p>

      <section style={{ marginTop: 16 }}>
        <h3>Places (Nightlife)</h3>
        <div style={{ display: 'grid', gap: 8 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Nombre" value={placeForm.name} onChange={e => setPlaceForm({ ...placeForm, name: e.target.value })} />
            <input placeholder="Categoría" value={placeForm.category} onChange={e => setPlaceForm({ ...placeForm, category: e.target.value })} />
            <input placeholder="Barrio" value={placeForm.neighborhood} onChange={e => setPlaceForm({ ...placeForm, neighborhood: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Dirección" value={placeForm.address} onChange={e => setPlaceForm({ ...placeForm, address: e.target.value })} style={{ flex: 1 }} />
            <input placeholder="Lat" value={placeForm.lat} onChange={e => setPlaceForm({ ...placeForm, lat: e.target.value })} />
            <input placeholder="Lng" value={placeForm.lng} onChange={e => setPlaceForm({ ...placeForm, lng: e.target.value })} />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input placeholder="Teléfono" value={placeForm.phone} onChange={e => setPlaceForm({ ...placeForm, phone: e.target.value })} />
            <input placeholder="Web" value={placeForm.website} onChange={e => setPlaceForm({ ...placeForm, website: e.target.value })} />
            <button onClick={createPlace} className="btn-primary">Crear place</button>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          {places.map(p => (
            <div key={p.id} style={{ background: '#071026', padding: 8, borderRadius: 6, marginBottom: 8 }}>
              <strong>{p.name}</strong> — {p.category} — {p.neighborhood}
              <div style={{ marginTop: 6 }}>
                <button onClick={() => deletePlace(p.id)} className="btn-secondary">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Support Orgs</h3>
        <div style={{ display: 'flex', gap: 8 }}>
          <input placeholder="Nombre" value={orgForm.name} onChange={e => setOrgForm({ ...orgForm, name: e.target.value })} />
          <input placeholder="Web" value={orgForm.website} onChange={e => setOrgForm({ ...orgForm, website: e.target.value })} />
          <button onClick={createOrg} className="btn-primary">Crear org</button>
        </div>

        <div style={{ marginTop: 12 }}>
          {orgs.map(o => (
            <div key={o.id} style={{ background: '#071026', padding: 8, borderRadius: 6, marginBottom: 8 }}>
              <strong>{o.name}</strong>
              <div style={{ marginTop: 6 }}>
                <button onClick={() => deleteOrg(o.id)} className="btn-secondary">Borrar</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 20 }}>
        <h3>Tags publicitarios (ExoClick)</h3>
        <p>Pega aquí el HTML/JS que ExoClick te proporcione para los slots TOP y BOTTOM. Ten en cuenta que deben cumplir las políticas y la edad del visitante (mayores de 18).</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <label>EXO TOP (slot superior)</label>
          <textarea value={exoTop} onChange={e => setExoTop(e.target.value)} style={{ minHeight: 120, width: '100%' }} />
          <label>EXO BOTTOM (slot inferior)</label>
          <textarea value={exoBottom} onChange={e => setExoBottom(e.target.value)} style={{ minHeight: 120, width: '100%' }} />
          <div>
            <button onClick={saveAds} className="btn-primary">Guardar tags</button>
          </div>
        </div>
      </section>

      {msg && <div style={{ marginTop: 12, color: '#ffdede' }}>{msg}</div>}
    </div>
  )
}