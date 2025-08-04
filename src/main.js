import { crearMotor } from './modules/engine.js';
import { inicializarEventos } from './modules/events.js';

const estado = {
  historial: [],
  setHistorial(nuevo) {
    this.historial = nuevo;
  },
  limpiarHistorial() {
    this.historial = [];
  }
};

(async () => {
  const motor = await crearMotor();
  inicializarEventos(motor, estado);
})();
