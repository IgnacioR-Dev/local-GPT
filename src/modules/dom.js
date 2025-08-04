// modules/dom.js
export const $ = (selector) => document.querySelector(selector);

export const $formulario = $('#formulario-chat');
export const $entrada = $('#input-mensaje');
export const $contenedor = $('main');
export const $botonEnviar = $('#boton-enviar');
export const $botonExportarJSON = $('#exportar-json');
export const $botonImportarJSON = $('#importar-json-btn');
export const $inputImportarJSON = $('#importar-json');
export const $botonResetearChat = $('#resetear-chat');
export const $estado = $('#estado');
export const $plantillaMensaje = $('#message-template');
export const $listaMensajes = $('#lista-mensajes');
