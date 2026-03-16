'use client'

import React, { useState, useEffect } from 'react'
import { createClient } from '@/utils/supabase/client'
import ChatRoom from './ChatRoom'
import ProfileSetup from './ProfileSetup'

// Función para generar un color basado en el nombre o ID
const getAvatarColor = (id: string) => {
  const colors = ['#f87171', '#fb923c', '#fbbf24', '#4ade80', '#22d3ee', '#818cf8', '#c084fc', '#f472b6'];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ChatDashboard({ currentUser }: { currentUser: any }) {
  const supabase = createClient()
  const [users, setUsers] = useState<any[]>([])
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [hasProfile, setHasProfile] = useState<boolean | null>(null)

  useEffect(() => {
    const checkProfile = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', currentUser.id)
        .single()
      
      setHasProfile(!!data?.username)
    }

    const fetchUsers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, username')
        .neq('id', currentUser.id)
      setUsers(data || [])
    }

    checkProfile()
    fetchUsers()
  }, [currentUser.id])

  if (hasProfile === null) return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>Cargando QueerPulse...</div>

  if (!hasProfile) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <ProfileSetup user={currentUser} onComplete={() => setHasProfile(true)} />
      </div>
    )
  }

  return (
    <div style={{ 
      display: 'flex', 
      gap: '20px', 
      height: '85vh', 
      maxWidth: '1200px', 
      margin: '0 auto',
      background: '#020617',
      padding: '10px',
      borderRadius: '20px'
    }}>
      {/* Sidebar de Contactos */}
      <div style={{ 
        width: '280px', 
        background: '#0f172a', 
        borderRadius: '16px', 
        padding: '20px', 
        border: '1px solid #1e293b',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div 
          onClick={() => setSelectedUser(null)} 
          style={{ 
            padding: '12px', 
            cursor: 'pointer', 
            background: !selectedUser ? '#ec4899' : 'transparent', 
            borderRadius: '10px',
            color: 'white',
            marginBottom: '15px',
            fontWeight: 'bold',
            textAlign: 'center',
            border: !selectedUser ? 'none' : '1px solid #334155'
          }}
        >
          🌍 Sala General
        </div>
        
        <p style={{ fontSize: '11px', color: '#64748b', marginBottom: '10px', letterSpacing: '1px', fontWeight: 'bold' }}>CONTACTOS</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {users.map(u => (
            <div 
              key={u.id} 
              onClick={() => setSelectedUser(u)} 
              style={{ 
                padding: '10px', 
                cursor: 'pointer', 
                background: selectedUser?.id === u.id ? 'rgba(59, 130, 246, 0.2)' : 'transparent', 
                borderRadius: '10px',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                border: selectedUser?.id === u.id ? '1px solid #3b82f6' : '1px solid transparent'
              }}
            >
              <div style={{ 
                width: '10px', 
                height: '10px', 
                borderRadius: '50%', 
                background: getAvatarColor(u.id) 
              }} />
              <span style={{ fontSize: '14px' }}>{u.username || 'Usuario anónimo'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Área de Chat */}
      <div style={{ flex: 1, height: '100%' }}>
        <ChatRoom 
          key={selectedUser ? selectedUser.id : 'general'} 
          user={currentUser} 
          receiverId={selectedUser?.id} 
          receiverName={selectedUser?.username} 
        />
      </div>
    </div>
  )
}