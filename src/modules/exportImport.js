// modules/exportImport.js
import { $estado } from './dom.js';
import { renderizarHistorial } from './messages.js';

export function exportarConversacionJSON(historialMensajes) {
  if (!Array.isArray(historialMensajes) || historialMensajes.length === 0) {
    alert('No hay mensajes para exportar.');
    return;
  }

  const jsonStr = JSON.stringify(historialMensajes, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `chat_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();

  URL.revokeObjectURL(url);
}

export function manejarArchivoImportado(evento, estado) {
  const archivo = evento.target.files[0];
  if (!archivo) return;

  const lector = new FileReader();

  lector.onload = (e) => {
    try {
      const datos = JSON.parse(e.target.result);

      if (!Array.isArray(datos)) throw new Error('El JSON no es un array válido.');

      const esValido = datos.every(msg =>
        typeof msg === 'object' &&
        typeof msg.role === 'string' &&
        typeof msg.content === 'string'
      );

      if (!esValido) throw new Error('Formato inválido de mensajes.');

      estado.setHistorial(datos);
      renderizarHistorial(datos);
      $estado.textContent = 'Conversación importada correctamente.';
    } catch (err) {
      alert('Archivo JSON inválido: ' + err.message);
    }
  };

  lector.readAsText(archivo);
}
