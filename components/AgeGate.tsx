'use client'
import React, { useEffect, useState } from 'react'

export default function AgeGate() {
  const [checked, setChecked] = useState<boolean | null>(null)
  const [cookiesAccepted, setCookiesAccepted] = useState<boolean>(() => {
    try { return localStorage.getItem('qp_cookies_accepted') === '1' } catch { return false }
  })

  useEffect(() => {
    try {
      const v = localStorage.getItem('qp_age_verified')
      if (v === '1') setChecked(true)
      else if (v === '0') setChecked(false)
      else setChecked(null)
    } catch {
      setChecked(null)
    }
  }, [])

  const setAgeCookie = (value: '1' | '0') => {
    // 1 año
    document.cookie = `qp_age_verified=${value}; path=/; max-age=${60*60*24*365}; SameSite=Lax`
    try { localStorage.setItem('qp_age_verified', value) } catch {}
  }

  const acceptAge = () => { setAgeCookie('1'); setChecked(true) }
  const denyAge = () => { setAgeCookie('0'); setChecked(false) }

  const acceptCookies = () => {
    try { localStorage.setItem('qp_cookies_accepted', '1') } catch {}
    setCookiesAccepted(true)
    // opcional: set cookie too
    document.cookie = `qp_cookies_accepted=1; path=/; max-age=${60*60*24*365}; SameSite=Lax`
  }

  if (checked === false) {
    return (
      <div className="age-blocker">
        <div className="age-blocker-inner">
          <h2>Acceso restringido</h2>
          <p>Debes ser mayor de 18 años para acceder a QueerPulse.</p>
          <a href="https://www.google.com" rel="noreferrer">Salir</a>
        </div>
      </div>
    )
  }

  if (checked === null) {
    return (
      <div className="age-modal" role="dialog" aria-modal="true">
        <div className="age-modal-card">
          <h2>¿Eres mayor de 18 años?</h2>
          <p>El acceso a QueerPulse está restringido a personas mayores de 18 años. Confirma si eres mayor de edad para continuar.</p>
          <div className="age-modal-actions">
            <button onClick={denyAge} className="btn-secondary">No, salir</button>
            <button onClick={acceptAge} className="btn-primary">Sí, soy mayor de 18</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {!cookiesAccepted && (
        <div className="cookie-banner" role="region" aria-label="Aviso de cookies">
          <div>
            Esta web utiliza cookies para mejorar la experiencia. Al continuar aceptas nuestra <a href="/cookies">política de cookies</a>.
          </div>
          <div>
            <button onClick={acceptCookies} className="btn-primary">Aceptar</button>
          </div>
        </div>
      )}
      <></>
    </>
  )
}