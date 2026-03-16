import './styles/globals.css'
import React from 'react'
// import Footer from '@/components/Footer' // Temporarily commented out to fix import error

export const metadata = {
  title: 'QueerPulse',
  description: 'Guía y chat LGBT+ Madrid - QueerPulse',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        {/* 
          Si vas a usar Google AdSense pega aquí tu script de AdSense (antes del cierre de head). Ejemplo:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXX" crossOrigin="anonymous"></script>

          Sustituye ca-pub-XXXXXXXXXXXX por tu client ID. 
          IMPORTANTE: respeta las políticas de AdSense y no uses service_role keys en el cliente.
        */}
      </head>
      <body>
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  )
}