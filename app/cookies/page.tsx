'use client'
import React from 'react'

export default function CookiesPage() {
  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <h1>Política de Cookies</h1>
      <p>Última actualización: {new Date().getFullYear()}</p>

      <section>
        <h2>¿Qué son las cookies?</h2>
        <p>
          Las cookies son archivos que se descargan en su dispositivo al acceder a determinadas páginas web. Permiten, entre otras cosas, almacenar y recuperar información sobre la navegación realizada desde el equipo.
        </p>
      </section>

      <section>
        <h2>¿Qué cookies utilizamos en QueerPulse?</h2>
        <p>En QueerPulse usamos las siguientes categorías de cookies:</p>

        <h3>1. Cookies técnicas (necesarias)</h3>
        <p>Permiten la navegación y el uso de las funciones básicas (p. ej. mantener la sesión iniciada). Estas cookies son necesarias para prestar el servicio.</p>

        <h3>2. Cookies de preferencia</h3>
        <p>Almacenan las decisiones del usuario (por ejemplo idioma, aceptación del age gate o preferencias visuales).</p>

        <h3>3. Cookies de análisis</h3>
        <p>Permiten recopilar información anónima sobre el uso de la web para mejorar su funcionamiento (p. ej. Google Analytics si se instala).</p>

        <h3>4. Cookies de publicidad</h3>
        <p>Si se muestran anuncios de terceros (AdSense u otras redes), estas cookies pueden usarse para personalizar la publicidad. Las cookies publicitarias son gestionadas por terceros y están sujetas a sus propias políticas.</p>
      </section>

      <section>
        <h2>Lista indicativa de cookies</h2>
        <p>Ejemplo de cookies que podrían estar presentes (depende de la configuración final):</p>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Cookie</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Finalidad</th>
              <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>qp_age_verified</td>
              <td>Guardar verificación de edad (age gate)</td>
              <td>12 meses (localStorage)</td>
            </tr>
            <tr>
              <td>supabase-auth-token</td>
              <td>Mantener sesión autenticada (gestión por Supabase)</td>
              <td>Sesión / persistente según configuración</td>
            </tr>
            <tr>
              <td>_ga, _gid</td>
              <td>Google Analytics (si lo implementas) - análisis</td>
              <td>_ga: 2 años; _gid: 24 horas</td>
            </tr>
            <tr>
              <td>adsense (varía)</td>
              <td>Publicidad y personalización de anuncios</td>
              <td>Variable (terceros)</td>
            </tr>
          </tbody>
        </table>
        <p>Nota: la tabla es orientativa. Ajusta según las cookies concretas que actives.</p>
      </section>

      <section>
        <h2>Cómo gestionar o desactivar cookies</h2>
        <p>
          Puede configurar su navegador para rechazar la mayoría de las cookies o para avisarle antes de aceptarlas. Si rechaza cookies técnicas podría verse afectada la funcionalidad del servicio.
        </p>
        <p>Enlaces de ayuda de navegadores (ejemplos):</p>
        <ul>
          <li>Chrome: https://support.google.com/chrome/answer/95647</li>
          <li>Firefox: https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web</li>
          <li>Safari: https://support.apple.com/es-es/guide/safari/sfri11471/mac</li>
        </ul>
      </section>

      <section>
        <h2>Consentimiento</h2>
        <p>
          Al aceptar el aviso de cookies en el age-gate usted presta su consentimiento al uso de cookies de acuerdo con esta política. Para el tratamiento de cookies de análisis o publicidad podrá revocar su consentimiento en cualquier momento eliminando las cookies desde el navegador o cambiando la configuración de consentimiento si se implementa.
        </p>
      </section>

      <p>Si desea que redacte un mecanismo de consentimiento (modal con categorías) o la lista técnica de cookies detectadas, dímelo y lo preparo.</p>
    </div>
  )
}