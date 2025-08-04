import { $plantillaMensaje, $listaMensajes, $contenedor } from './dom.js';

export function agregarMensaje(texto, emisor) {
  const $wrapper = document.createElement('div');
  $wrapper.className = `mensaje-contenedor ${emisor}`;

  const plantilla = $plantillaMensaje.content.cloneNode(true);
  const $nuevoMensaje = plantilla.querySelector('.message');

  const $quien = $nuevoMensaje.querySelector('span');
  const $contenido = $nuevoMensaje.querySelector('p');

  $contenido.textContent = texto;
  $quien.textContent = emisor === 'bot' ? 'GPT' : 'Tú';
  $nuevoMensaje.classList.add(emisor);

  $wrapper.appendChild($nuevoMensaje);

  if (emisor === 'bot') {
    const $contenedorCopia = document.createElement('div');
    $contenedorCopia.className = 'contenedor-copiar';

    const $botonCopiar = document.createElement('button');
    $botonCopiar.className = 'copiar-mensaje';
    $botonCopiar.title = 'Copiar';

    const iconoCopiar = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconoCopiar.setAttribute("viewBox", "0 0 24 24");
    iconoCopiar.style.width = "24px";
    iconoCopiar.style.height = "24px";
    iconoCopiar.innerHTML = `<path d="M16 2H8a2 2 0 0 0-2 2v2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2h2a2 2 0 0 0 2-2V6a4 4 0 0 0-4-4zm-8 2h8a2 2 0 0 1 2 2v1h-8a2 2 0 0 0-2 2v11H6V8a2 2 0 0 1 2-2V4zm8 16H8V10h8v10z"/>`;

    const iconoListo = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconoListo.setAttribute("viewBox", "0 0 24 24");
    iconoListo.style.width = "24px";
    iconoListo.style.height = "24px";
    iconoListo.style.display = "none";
    iconoListo.innerHTML = `<polyline points="20 6 9 17 4 12" style="fill:none;stroke:#fff;stroke-width:2;stroke-linecap:round;stroke-linejoin:round"/>`;

    $botonCopiar.appendChild(iconoCopiar);
    $botonCopiar.appendChild(iconoListo);

    $botonCopiar.addEventListener('click', () => {
      navigator.clipboard.writeText($contenido.textContent);
      iconoCopiar.style.display = "none";
      iconoListo.style.display = "inline";
      setTimeout(() => {
        iconoListo.style.display = "none";
        iconoCopiar.style.display = "inline";
      }, 1500);
    });

    $contenedorCopia.appendChild($botonCopiar);
    $wrapper.appendChild($contenedorCopia);
  }

  $listaMensajes.appendChild($wrapper);
  
  const estaCercaDelFinal = $contenedor.scrollTop + $contenedor.clientHeight >= $contenedor.scrollHeight - 100;

  if (estaCercaDelFinal) {
    $contenedor.scrollTop = $contenedor.scrollHeight;
  }

  return $contenido;
}

export function renderizarHistorial(historialMensajes) {
  $listaMensajes.innerHTML = '';
  historialMensajes.forEach(msg => {
    agregarMensaje(msg.content, msg.role === 'user' ? 'user' : 'bot');
  });
  $contenedor.scrollTop = $contenedor.scrollHeight;
}
