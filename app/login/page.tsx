'use client'
import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (isRegistering) {
      // REGISTRO
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
      })
      if (error) alert(error.message)
      else alert('¡Registro exitoso! Revisa tu correo para confirmar.')
    } else {
      // INICIO DE SESIÓN CON CONTRASEÑA
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) alert('Error: ' + error.message)
      else router.push('/chat')
    }
    setLoading(false)
  }

  return (
    <div style={{ 
      background: '#020617', minHeight: '100vh', display: 'flex', 
      justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' 
    }}>
      <div style={{ 
        background: '#0f172a', padding: '40px', borderRadius: '16px', 
        border: '1px solid #1e293b', width: '100%', maxWidth: '400px' 
      }}>
        <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '24px' }}>
          {isRegistering ? 'Crear cuenta' : 'Iniciar Sesión'}
        </h2>
        
        <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Tu correo" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#020617', color: 'white' }}
            required
          />
          <input 
            type="password" 
            placeholder="Tu contraseña" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '12px', borderRadius: '8px', border: '1px solid #334155', background: '#020617', color: 'white' }}
            required
          />
          
          <button type="submit" disabled={loading} style={{ 
            padding: '12px', background: '#ec4899', color: 'white', 
            border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' 
          }}>
            {loading ? 'Procesando...' : isRegistering ? 'Registrarme' : 'Entrar'}
          </button>
        </form>

        <button 
          onClick={() => setIsRegistering(!isRegistering)}
          style={{ 
            background: 'none', border: 'none', color: '#94a3b8', 
            marginTop: '20px', width: '100%', cursor: 'pointer', fontSize: '14px' 
          }}
        >
          {isRegistering ? '¿Ya tienes cuenta? Inicia sesión' : '¿No tienes cuenta? Regístrate'}
        </button>
      </div>
    </div>
  )
}