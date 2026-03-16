'use client'
import React from 'react'

export default function TermsPage() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Términos y Condiciones de Uso - QueerPulse</h1>

      <section>
        <h2>1. Requisito de Mayoría de Edad</h2>
        <p>
          El acceso a QueerPulse está estrictamente restringido a personas mayores de 18 años. Al utilizar esta plataforma, el usuario declara bajo su propia responsabilidad que posee la capacidad legal necesaria según la legislación española para acceder a contenidos destinados a adultos.
        </p>
      </section>

      <section>
        <h2>2. Naturaleza del Servicio</h2>
        <p>
          QueerPulse es una plataforma híbrida que ofrece:
        </p>
        <ul>
          <li>Un Directorio y Guía de Recursos informativo para la comunidad LGBT+.</li>
          <li>Un Espacio de Chat en tiempo real para la interacción entre usuarios.</li>
        </ul>
        <p>QueerPulse actúa únicamente como intermediario técnico y no se hace responsable de las opiniones o conductas de los usuarios dentro del chat.</p>
      </section>

      <section>
        <h2>3. Normas de Conducta y Chat</h2>
        <p>Para garantizar un entorno seguro, queda estrictamente prohibido:</p>
        <ul>
          <li>La publicación de contenido que promueva el odio, la violencia o la discriminación.</li>
          <li>El acoso, spam o la difusión de datos personales de terceros sin consentimiento (doxing).</li>
          <li>La distribución de material audiovisual que infrinja derechos de autor o leyes de exhibición en España.</li>
          <li>Cualquier sospecha de contenido ilegal que involucre a menores será reportada de inmediato a las autoridades competentes.</li>
        </ul>
      </section>

      <section>
        <h2>4. Propiedad Intelectual y Publicidad</h2>
        <p>El nombre QueerPulse, su logotipo y diseño son propiedad exclusiva del titular. La plataforma puede contener espacios publicitarios o banners patrocinados de terceros. QueerPulse no garantiza la veracidad o calidad de los productos o servicios ofrecidos en los enlaces externos de la guía.</p>
      </section>

      <section>
        <h2>5. Privacidad y Datos Sensibles</h2>
        <p>De acuerdo con el RGPD, se informa que al participar en el chat, el usuario puede revelar datos de categoría especial (orientación sexual). El usuario consiente explícitamente el tratamiento de estos datos con la única finalidad de permitir la comunicación en la plataforma.</p>
      </section>

      <section>
        <h2>6. Limitación de Responsabilidad</h2>
        <p>QueerPulse no se hace responsable de interrupciones del servicio por mantenimiento o errores técnicos derivados de proveedores externos (como Supabase o Vercel), ni de pérdida de datos por fallos en el navegador o la conexión del usuario.</p>
      </section>

      <p>Última actualización: {new Date().getFullYear()}</p>
    </div>
  )
}