import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ChatDashboard from '@/components/ChatDashboard'

export default async function ChatPage() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  // Doble verificación por seguridad
  if (authError || !user) {
    redirect('/')
  }

  // Obtenemos el perfil para mostrar el nombre personalizado
  const { data: profile } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', user.id)
    .single()

  return (
    <div style={{ background: '#020617', minHeight: '100vh', color: 'white', padding: '20px' }}>
      <header style={{ 
        maxWidth: '1200px', 
        margin: '0 auto 20px auto', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center' 
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', color: '#f8fafc' }}>Chat Principal</h1>
          <p style={{ margin: 0, color: '#64748b', fontSize: '14px' }}>
            Hola, <span style={{ color: '#ec4899', fontWeight: 'bold' }}>{profile?.username || user.email}</span>
          </p>
        </div>

        <form action="/auth/signout" method="post">
          <button 
            type="submit"
            style={{
              background: '#1e293b',
              border: '1px solid #334155',
              color: '#f1f5f9',
              padding: '8px 16px',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Cerrar sesión
          </button>
        </form>
      </header>

      <main>
        <ChatDashboard currentUser={user} />
      </main>
    </div>
  )
}