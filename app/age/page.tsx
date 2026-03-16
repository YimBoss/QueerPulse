'use client'
import React from 'react'
import AgeGate from '@/components/AgeGate'
import Link from 'next/link'

export default function AgePage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Verificación de edad</h1>
      <p>Debe confirmar que es mayor de 18 años para acceder al chat.</p>
      <AgeGate />
      <p style={{ marginTop: 16 }}>
        Si no puede ver el modal, <Link href="/">vuelve al inicio</Link>.
      </p>
    </main>
  )
}