'use client'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-left">
          <strong>QueerPulse</strong> — Guía y chat LGBT+ Madrid
        </div>
        <nav className="footer-links" aria-label="Enlaces legales">
          <Link href="/legal">Aviso Legal</Link>
          <Link href="/privacy">Privacidad</Link>
          <Link href="/cookies">Cookies</Link>
          <Link href="/terms">Términos de Uso</Link>
        </nav>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} QueerPulse</div>
    </footer>
  )
}