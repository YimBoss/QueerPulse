'use client'

import React, { useEffect, useState, useRef } from 'react'
import { createClient } from '@/utils/supabase/client'

const getUsernameColor = (id: string) => {
  const colors = ['#f87171', '#fb923c', '#fbbf24', '#4ade80', '#22d3ee', '#818cf8', '#c084fc', '#f472b6'];
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return colors[Math.abs(hash) % colors.length];
}

export default function ChatRoom({ user, receiverId, receiverName }: any) {
  const supabase = createClient()
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [roomId, setRoomId] = useState<number | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const initRoom = async () => {
      const roomName = receiverId ? [user.id, receiverId].sort().join('--') : 'general'
      let { data: room } = await supabase.from('rooms').select('id').eq('name', roomName).maybeSingle()
      if (!room) {
        const { data: newRoom } = await supabase.from('rooms').insert({ name: roomName, is_private: !!receiverId }).select().single()
        room = newRoom
      }
      if (room) setRoomId(room.id)
    }
    initRoom()
  }, [receiverId, user.id])

  useEffect(() => {
    if (!roomId) return
    const fetchMessages = async () => {
      const { data } = await supabase.from('messages').select('*, profiles:sender(username)').eq('room_id', roomId).order('created_at', { ascending: true })
      setMessages(data || [])
    }
    fetchMessages()

    const channel = supabase.channel(`room-${roomId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `room_id=eq.${roomId}` }, 
        async (payload) => {
          const { data: profile } = await supabase.from('profiles').select('username').eq('id', payload.new.sender).single()
          setMessages(prev => [...prev, { ...payload.new, profiles: profile }])
        }
      ).subscribe()
    return () => { supabase.removeChannel(channel) }
  }, [roomId])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages])

  const sendText = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !roomId) return
    await supabase.from('messages').insert({ content: newMessage, sender: user.id, room_id: roomId, is_image: false })
    setNewMessage('')
  }

  const sendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !roomId) return

    // Nombre único para la imagen
    const fileExt = file.name.split('.').pop()
    const fileName = `${user.id}-${Date.now()}.${fileExt}`
    
    // Subida al Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('chat_images')
      .upload(fileName, file)

    if (uploadError) {
      console.error("Error detallado:", uploadError)
      alert(`Error al subir: ${uploadError.message}. ¿Creaste el bucket 'chat_images' en Supabase?`)
      return
    }

    // Obtener URL pública
    const { data: { publicUrl } } = supabase.storage
      .from('chat_images')
      .getPublicUrl(fileName)

    // Guardar mensaje en la tabla
    await supabase.from('messages').insert({
      content: publicUrl,
      sender: user.id,
      room_id: roomId,
      is_image: true
    })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0f172a', borderRadius: '16px', border: '1px solid #1e293b' }}>
      <div style={{ padding: '15px', borderBottom: '1px solid #1e293b', color: 'white', fontWeight: 'bold' }}>
        {receiverId ? `💬 Chat con ${receiverName}` : '🌍 Sala General'}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map(m => (
          <div key={m.id} style={{ alignSelf: m.sender === user.id ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
            <div style={{ fontSize: '11px', fontWeight: 'bold', color: getUsernameColor(m.sender), marginBottom: '4px', textAlign: m.sender === user.id ? 'right' : 'left' }}>
              {m.sender === user.id ? 'Tú' : (m.profiles?.username || 'Usuario')}
            </div>
            <div style={{ 
              background: m.sender === user.id ? '#ec4899' : '#1e293b', 
              padding: m.is_image ? '4px' : '10px 14px', 
              borderRadius: m.sender === user.id ? '16px 16px 2px 16px' : '16px 16px 16px 2px', 
              color: 'white'
            }}>
              {m.is_image ? (
                <img src={m.content} alt="Imagen" style={{ maxWidth: '100%', borderRadius: '12px', display: 'block' }} />
              ) : (
                <span style={{ fontSize: '15px' }}>{m.content}</span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendText} style={{ padding: '15px', display: 'flex', gap: '10px', background: '#0f172a', borderTop: '1px solid #1e293b' }}>
        <input type="file" id="img-up" accept="image/*" onChange={sendImage} style={{ display: 'none' }} />
        <label htmlFor="img-up" style={{ background: '#1e293b', padding: '12px', borderRadius: '12px', cursor: 'pointer', fontSize: '20px' }}>📸</label>
        
        <input 
          value={newMessage} 
          onChange={e => setNewMessage(e.target.value)} 
          placeholder="Escribe un mensaje..." 
          style={{ flex: 1, padding: '12px', borderRadius: '12px', border: '1px solid #334155', background: '#020617', color: 'white', outline: 'none' }} 
        />
        <button type="submit" style={{ padding: '10px 20px', background: '#ec4899', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold' }}>Enviar</button>
      </form>
    </div>
  )
}