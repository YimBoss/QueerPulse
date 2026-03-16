'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ProfileSetup({ user, onComplete }: { user: any, onComplete: () => void }) {
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('profiles')
      .upsert({ 
        id: user.id, 
        username: username,
        updated_at: new Date().toISOString() 
      })

    setLoading(false)
    if (error) {
      alert('Error al guardar el perfil: ' + error.message)
    } else {
      onComplete()
    }
  }

  return (
    <div style={{
      background: '#0f172a',
      padding: '40px',
      borderRadius: '20px',
      border: '1px solid #1e293b',
      width: '100%',
      maxWidth: '400px',
      textAlign: 'center'
    }}>
      <h2 style={{ color: 'white', marginBottom: '10px' }}>¡Casi listo!</h2>
      <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Elige el apodo que verán los demás en QueerPulse.</p>
      
      <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Tu apodo (ej: Fab01)" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #334155',
            background: '#020617',
            color: 'white',
            outline: 'none'
          }}
        />
        <button 
          type="submit" 
          disabled={loading || !username}
          style={{
            padding: '14px',
            borderRadius: '10px',
            background: '#ec4899',
            color: 'white',
            fontWeight: 'bold',
            cursor: loading ? 'not-allowed' : 'pointer',
            border: 'none'
          }}
        >
          {loading ? 'Guardando...' : 'EMPEZAR A CHATEAR'}
        </button>
      </form>
    </div>
  )
}