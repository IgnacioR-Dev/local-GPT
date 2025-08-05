// modules/engine.js
import { CreateWebWorkerMLCEngine } from "https://esm.run/@mlc-ai/web-llm";
import { $botonEnviar, $estado } from './dom.js';

const MODELO_SELECCIONADO = 'Llama-3.2-3B-Instruct-q4f32_1-MLC';

export async function crearMotor() {
  const motor = await CreateWebWorkerMLCEngine(
    new Worker('./worker.js', { type: 'module' }),
    MODELO_SELECCIONADO,
    {
      initProgressCallback: (info) => {
        $estado.textContent = 'Cargando modelo...';
        if (info.progress === 1) {
          $botonEnviar.removeAttribute('disabled');
          $estado.textContent = 'Modelo cargado';
        }
      },
    }
  );
  return motor;
}
