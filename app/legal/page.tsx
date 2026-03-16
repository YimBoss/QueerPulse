'use client'
import React from 'react'

export default function LegalPage() {
  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <h1>Aviso Legal</h1>

      <p>Última actualización: {new Date().getFullYear()}</p>

      <section>
        <h2>1. Identificación del titular</h2>
        <p>
          Este sitio web, QueerPulse, es titularidad de <strong>[NOMBRE/ENTIDAD]</strong> (NIF/CIF: <strong>[NIF/CIF]</strong>), con domicilio en <strong>[DIRECCIÓN]</strong>.
        </p>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          El presente Aviso Legal regula el uso del sitio web queerpulse.[dominio] así como las responsabilidades que se derivan del uso de sus servicios.
        </p>
      </section>

      <section>
        <h2>3. Condiciones de uso</h2>
        <p>
          El acceso y uso de QueerPulse atribuye la condición de usuario y supone la aceptación plena de todas las condiciones contenidas en este Aviso Legal y en los documentos que se integran por referencia (Política de Privacidad, Política de Cookies y Términos de Uso).
        </p>
      </section>

      <section>
        <h2>4. Propiedad intelectual</h2>
        <p>
          Todos los contenidos del sitio web (textos, logos, imágenes, diseños y códigos) son propiedad del titular o de terceros que han autorizado su uso. Queda prohibida su reproducción, distribución o transformación sin autorización expresa.
        </p>
      </section>

      <section>
        <h2>5. Limitación de responsabilidad</h2>
        <p>
          QueerPulse actúa como mero proveedor de la plataforma técnica. No se responsabiliza de las opiniones, conductas o contenidos que los usuarios publiquen en los chats ni de la veracidad de los datos aportados por terceros en la guía.
        </p>
        <p>
          No se garantiza la continuidad del servicio ni la ausencia de errores; en la medida permitida por la ley, QueerPulse no será responsable de daños derivados del uso del servicio o de terceros proveedores (Supabase, Vercel).
        </p>
      </section>

      <section>
        <h2>6. Legislación aplicable y jurisdicción</h2>
        <p>
          Las relaciones entre el usuario y QueerPulse se regirán por la normativa española vigente. Para la resolución de cualquier conflicto, las partes se someten, con renuncia expresa a otro fuero, a los Juzgados y Tribunales de <strong>[CIUDAD]</strong>.
        </p>
      </section>

      <section>
        <h2>7. Contacto</h2>
        <p>Para cuestiones legales o de reclamaciones, contacta en: <a href="mailto:[EMAIL]">[EMAIL]</a> o en la dirección postal indicada más arriba.</p>
      </section>

      <hr />

      <h3>Instrucciones para completar este Aviso Legal</h3>
      <ol>
        <li>
          Sustituye <strong>[NOMBRE/ENTIDAD]</strong> por tu nombre o razón social completa.
        </li>
        <li>
          Sustituye <strong>[NIF/CIF]</strong> por tu número fiscal (si eres empresa) o NIF (si eres persona física).
        </li>
        <li>
          Sustituye <strong>[DIRECCIÓN]</strong> por la dirección postal completa del responsable.
        </li>
        <li>
          Sustituye <strong>[EMAIL]</strong> por el correo de contacto habilitado para reclamaciones y derechos ARCO/RGPD.
        </li>
        <li>
          Sustituye <strong>[CIUDAD]</strong> por la ciudad cuya jurisdicción aplicará en caso de conflicto (normalmente tu ciudad o la sede administrativa).
        </li>
        <li>
          Revisa la cláusula de limitación de responsabilidad y adáptala con tu asesoría legal si ofreces servicios especiales (p. ej. atención directa, citas presenciales).
        </li>
      </ol>

      <p>IMPORTANTE: Este texto es un modelo de carácter informativo. Te recomendamos que, antes de publicar, lo revise un asesor jurídico para adaptarlo a tu situación concreta.</p>
    </div>
  )
}