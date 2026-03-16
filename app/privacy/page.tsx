'use client'
import React from 'react'

export default function PrivacyPage() {
  return (
    <div style={{ padding: 20, maxWidth: 900 }}>
      <h1>Política de Privacidad</h1>

      <p>Última actualización: {new Date().getFullYear()}</p>

      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento de los datos recabados en QueerPulse es: <strong>[NOMBRE/ENTIDAD]</strong>, con domicilio en <strong>[DIRECCIÓN]</strong> y correo de contacto <a href="mailto:[EMAIL]">[EMAIL]</a>.
        </p>
        <p>Rellena aquí tu nombre/razón social, dirección completa y correo electrónico de contacto.</p>
      </section>

      <section>
        <h2>2. Finalidades del tratamiento</h2>
        <p>Tratamos los datos personales de los usuarios con las siguientes finalidades:</p>
        <ul>
          <li>Gestión de la cuenta y autenticación del usuario (registro, acceso y recuperación de contraseña).</li>
          <li>Gestión y almacenamiento de los mensajes del chat para proporcionar el servicio en tiempo real.</li>
          <li>Almacenamiento y gestión de imágenes que los usuarios suban al chat (en Supabase Storage).</li>
          <li>Envío de comunicaciones relacionadas con el servicio (notificaciones administrativas o de seguridad).</li>
          <li>Cumplimiento de obligaciones legales y resolución de incidencias o abusos (reportes, peticiones judiciales).</li>
        </ul>
      </section>

      <section>
        <h2>3. Legitimación para el tratamiento</h2>
        <p>
          La base legal para el tratamiento de sus datos es:
        </p>
        <ul>
          <li>La ejecución del contrato de prestación del servicio cuando el usuario se registra y usa la plataforma.</li>
          <li>El consentimiento del interesado para determinados tratamientos (p. ej. marketing si lo hubiera).</li>
          <li>El cumplimiento de obligaciones legales y la ejecución de medidas de interés público o solicitud de las autoridades competentes.</li>
        </ul>
      </section>

      <section>
        <h2>4. Categorías de datos</h2>
        <p>Los datos que tratamos pueden incluir:</p>
        <ul>
          <li>Datos identificativos: correo electrónico, identificador de usuario (auth.uid) y apodo (username).</li>
          <li>Datos de contenido: mensajes de chat (texto) y archivos/imágenes que el usuario suba.</li>
          <li>Metadatos técnicos: dirección IP (según logs), datos de sesión y demás datos técnicos necesarios para el funcionamiento.</li>
          <li>Datos sensibles: recuerda que el propio uso del chat puede implicar la revelación de datos de categoría especial (orientación sexual). Tales datos se tratan por la propia decisión del usuario en el marco de la prestación del servicio y con los cuidados indicados en esta política.</li>
        </ul>
      </section>

      <section>
        <h2>5. Conservación de los datos</h2>
        <p>Los datos se conservarán el tiempo necesario para cumplir la finalidad para la que se recabaron y para cumplir obligaciones legales. A modo orientativo:</p>
        <ul>
          <li>Datos de cuenta (auth & profiles): mientras la cuenta esté activa y 2 años tras su cancelación para cumplimiento legal y posibles reclamaciones.</li>
          <li>Mensajes del chat: conservados durante <strong>12 meses</strong> por defecto (configurable). Tras ese periodo podrán anonimizarse o eliminarse.</li>
          <li>Imágenes subidas: mientras el usuario mantenga la cuenta y hasta 12 meses adicionales salvo que el usuario solicite su eliminación.</li>
        </ul>
        <p>Adapta los plazos conforme a tu política de retención y obligaciones sectoriales.</p>
      </section>

      <section>
        <h2>6. Destinatarios o categorías de destinatarios</h2>
        <p>No cederemos sus datos a terceros salvo:</p>
        <ul>
          <li>Proveedores que prestan servicios técnicos (hosting, almacenamiento, bases de datos). Actualmente se utilizan proveedores terceros como Supabase y Vercel.</li>
          <li>Autoridades competentes cuando exista obligación legal o solicitud judicial.</li>
        </ul>
        <p>Siempre que se realicen transferencias internacionales de datos se garantizará un nivel de protección adecuado (cláusulas contractuales, exenciones legales, etc.).</p>
      </section>

      <section>
        <h2>7. Derechos del interesado</h2>
        <p>Usted podrá:</p>
        <ul>
          <li>Solicitar acceso a sus datos.</li>
          <li>Solicitar la rectificación de datos inexactos.</li>
          <li>Solicitar la supresión de sus datos cuando, entre otros motivos, los datos ya no sean necesarios para los fines que fueron recogidos.</li>
          <li>Solicitar la limitación del tratamiento en determinados casos.</li>
          <li>Ejercer el derecho de oposición en los supuestos previstos.</li>
          <li>Solicitar la portabilidad de sus datos en un formato estructurado y de uso común.</li>
        </ul>
        <p>Para ejercer sus derechos puede escribir a <a href="mailto:[EMAIL]">[EMAIL]</a> o a la dirección postal indicada anteriormente, aportando copia de su documento de identidad y la petición concreta.</p>
        <p>Si considera que no se han respetado sus derechos puede presentar una reclamación ante la Agencia Española de Protección de Datos (AEPD): <a href="https://www.aepd.es">www.aepd.es</a>.</p>
      </section>

      <section>
        <h2>8. Medidas de seguridad</h2>
        <p>
          QueerPulse aplica medidas técnicas y organizativas para proteger los datos frente a accesos no autorizados, pérdida, alteración o divulgación. Entre otras:
        </p>
        <ul>
          <li>Transmisión segura mediante TLS/HTTPS.</li>
          <li>Control de accesos a sistemas y claves seguras.</li>
          <li>Protección de almacenamiento mediante proveedores con certificación y acuerdos de encargado de tratamiento.</li>
        </ul>
        <p>No obstante, el usuario debe saber que ninguna medida de seguridad es absoluta; por ello se pide prudencia al compartir información sensible dentro del chat.</p>
      </section>

      <section>
        <h2>9. Cambios en la política</h2>
        <p>Nos reservamos el derecho a modificar esta política. Publicaremos la fecha de última actualización en la cabecera y, cuando proceda, informaremos a los usuarios activos del cambio.</p>
      </section>

      <section>
        <h2>10. Datos de contacto</h2>
        <p>Para consultas o solicitudes relativas a esta Política de Privacidad puede contactar en: <a href="mailto:[EMAIL]">[EMAIL]</a>.</p>
      </section>

      <p>Nota: sustituya [NOMBRE/ENTIDAD], [DIRECCIÓN] y [EMAIL] por sus datos reales antes de publicar.</p>
    </div>
  )
}