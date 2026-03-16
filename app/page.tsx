import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import AuthForm from '@/components/AuthForm' // Asegúrate de haber creado este componente

export default async function IndexPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Si el usuario ya está autenticado, no lo dejamos en el login, lo mandamos al chat
  if (user) {
    redirect('/chat')
  }

  return (
    <main style={{ 
      background: '#020617', 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{ marginBottom: '30px', textAlign: 'center' }}>
        <h1 style={{ color: '#ec4899', fontSize: '3rem', fontWeight: 'bold', margin: 0 }}>QueerPulse</h1>
        <p style={{ color: '#94a3b8' }}>Conecta con libertad</p>
      </div>
      
      {/* Aquí renderizamos el formulario de Email/Password */}
      <AuthForm />
    </main>
  )
}