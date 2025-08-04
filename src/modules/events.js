// modules/events.js
import {
  $formulario,
  $entrada,
  $contenedor,
  $botonEnviar,
  $botonExportarJSON,
  $botonImportarJSON,
  $inputImportarJSON,
  $botonResetearChat,
  $estado
} from './dom.js';

import { agregarMensaje, renderizarHistorial } from './messages.js';
import {
  exportarConversacionJSON,
  manejarArchivoImportado
} from './exportImport.js';

export function inicializarEventos(motor, estado) {
  let generando = false; // bandera de estado

  function actualizarEstadoBoton() {
    $botonEnviar.disabled = generando || $entrada.value.trim() === '';
  }

  $entrada.addEventListener('input', actualizarEstadoBoton);
  actualizarEstadoBoton();

  $formulario.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (generando) return;

    const textoUsuario = $entrada.value.trim();
    if (!textoUsuario) return;

    agregarMensaje(textoUsuario, 'user');
    $entrada.value = '';
    actualizarEstadoBoton();
    $estado.textContent = 'Pensando...';
    generando = true;

    estado.historial.push({ role: 'user', content: textoUsuario });

    const mensajeSystem = {
      role: 'system',
      content: ` `
    };

    const mensajes = [mensajeSystem, ...estado.historial];

    try {
      const fragmentos = await motor.chat.completions.create({
        messages: mensajes,
        stream: true,
        max_tokens: 400,
        temperature: 0.4,
        top_p: 0.4,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      });

      let respuesta = '';
      const $mensajeBot = agregarMensaje('', 'bot');
      let lastUpdate = Date.now();

      for await (const fragmento of fragmentos) {
        const [opcion] = fragmento.choices;
        const contenido = opcion?.delta?.content ?? '';
        if (!contenido) continue;

        respuesta += contenido;

        const now = Date.now();
        if (now - lastUpdate > 40) {
          $mensajeBot.textContent = respuesta;
          $contenedor.scrollTop = $contenedor.scrollHeight;
          lastUpdate = now;
        }
      }

      $mensajeBot.textContent = respuesta;
      $contenedor.scrollTop = $contenedor.scrollHeight;
      estado.historial.push({ role: 'assistant', content: respuesta });

    } catch (err) {
      agregarMensaje('Ocurrió un error al generar la respuesta.', 'bot');
      console.error(err);
    }

    generando = false;
    $estado.textContent = '';
    actualizarEstadoBoton();
    $contenedor.scrollTop = $contenedor.scrollHeight;
  });

  // Exportar conversación en JSON
  $botonExportarJSON.addEventListener('click', () =>
    exportarConversacionJSON(estado.historial)
  );

  // Importar conversación desde JSON
  $botonImportarJSON.addEventListener('click', () => {
    $inputImportarJSON.value = '';
    $inputImportarJSON.click();
  });

  $inputImportarJSON.addEventListener('change', (e) =>
    manejarArchivoImportado(e, estado)
  );

  // Reiniciar conversación
  $botonResetearChat.addEventListener('click', () => {
    if (estado.historial.length === 0) {
      alert('No hay conversación para reiniciar.');
      return;
    }

    const confirmar = confirm('¿Seguro que quieres reiniciar la conversación? Se eliminarán todos los mensajes.');
    if (!confirmar) return;

    estado.limpiarHistorial();
    renderizarHistorial([]);
    $estado.textContent = 'Conversación reiniciada.';
  });

  // Menú desplegable de opciones
  const $toggleOpciones = document.getElementById('toggle-opciones');
  const $opcionesLista = document.getElementById('opciones-lista');

  $toggleOpciones.addEventListener('click', () => {
    const isVisible = $opcionesLista.style.display === 'block';
    $opcionesLista.style.display = isVisible ? 'none' : 'block';

    $toggleOpciones.setAttribute('aria-expanded', String(!isVisible));
    $toggleOpciones.textContent = `Opciones ${!isVisible ? '▲' : '▼'}`;
  });
}
