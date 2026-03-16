'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function AuthForm() {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)
  
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (isRegistering) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
        })

        if (error) throw error
        if (data.session) {
          // Si entra aquí es que no necesita confirmar email
          window.location.href = '/chat' 
        } else {
          setMessage({ type: 'success', text: '¡Cuenta creada! Revisa tu email.' })
        }
      } else {
        // --- INICIO DE SESIÓN ---
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) throw error

        // CAMBIO CLAVE: Usamos window.location.href para forzar la recarga
        // y que el middleware detecte la nueva cookie de sesión.
        window.location.href = '/chat'
      }
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ background: '#0f172a', padding: '40px', borderRadius: '20px', width: '100%', maxWidth: '400px' }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '25px' }}>
        {isRegistering ? 'Crear cuenta' : 'Iniciar Sesión'}
      </h2>

      {message && (
        <div style={{ padding: '10px', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', textAlign: 'center', backgroundColor: message.type === 'error' ? '#7f1d1d' : '#064e3b', color: 'white' }}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="email" 
          placeholder="Correo" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', background: '#020617', color: 'white', border: '1px solid #334155' }}
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '12px', borderRadius: '8px', background: '#020617', color: 'white', border: '1px solid #334155' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '14px', borderRadius: '10px', background: '#ec4899', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>
          {loading ? 'Cargando...' : isRegistering ? 'Registrarse' : 'Entrar'}
        </button>
      </form>

      <button onClick={() => setIsRegistering(!isRegistering)} style={{ background: 'none', border: 'none', color: '#3b82f6', marginTop: '20px', width: '100%', cursor: 'pointer' }}>
        {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  )
}