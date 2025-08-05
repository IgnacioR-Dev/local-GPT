# 🧠 LocalGPT - Agente LLM en tu Navegador

LocalGPT es un agente conversacional que funciona 100% en el navegador, usando modelos como LLaMA 3 con WebLLM. No requiere servidor, funciona offline tras la carga inicial, y permite chatear con un modelo de lenguaje directamente desde tu máquina, de forma privada y personalizada. Usando tecnologías como **Web Workers**, **WebGPU** y [`@mlc-ai/web-llm`], ofrece una experiencia ideal para entornos educativos, demostraciones técnicas o exploración local de modelos LLM.

---

## 🚀 Instalación y Ejecución

### Requisitos

- Navegador moderno compatible con ES Modules, Web Workers y WebGPU (Chrome, Edge, Firefox).
- Modelo open source optimizado para WebLLM (Obtener desde https://github.com/mlc-ai/web-llm).
- Servidor HTTP local (no usar `file://` directamente).

### Opción 1: Servidor simple con Node.js

```bash
npm install -g http-server
cd chatgpt-local
http-server
```

Accede desde: `http://127.0.0.1:8081`

### Opción 2: Live Server en Visual Studio Code

1. Instala la extensión **Live Server**.
2. Abre el proyecto en VSCode.
3. Haz clic derecho en `index.html` → **Open with Live Server**.

---

## 🎨 Características

- Interfaz minimalista y adaptativa.
- Streaming de texto en tiempo real.
- Historial de conversación persistente (exportación/importación en JSON).
- Botón para copiar respuestas con un clic.
- Separación visual entre entradas del usuario y respuestas del bot.
- Totalmente autónomo — *sin backend, APIs ni conexión externa*.
- Compatible con múltiples modelos open source optimizados.

---

## 🔧 Personalización

- Cambia el modelo editando `MODELO_SELECCIONADO` en `engine.js`.
- Ajusta parámetros como `temperature`, `max_tokens` y más en `events.js` para determinar los parametros de respuesta.
- Edita el estilo visual en `style.css`.
- Personaliza el comportamiento del modelo (System Prompt).

Por ejemplo, puedes establecerlo como:

* `"Eres un programador experto en JavaScript."`
* `"Actúa como un tutor amigable que explica conceptos técnicos a principiantes."`
* `"Eres un asistente profesional que responde de manera breve y precisa."`

Aquí tienes el fragmento exacto donde puedes hacer la modificación (ubicado en el archivo 'events.js'):

```js
const mensajeSystem = {
  role: 'system',
  content: `Eres un programador experto en JavaScript que responde con ejemplos prácticos.`
};
```

Este mensaje se envía al modelo antes que cualquier otro mensaje del usuario, y define su comportamiento durante toda la conversación.

---

## 🗂️ Estructura del Proyecto

```
CHATGPT-LOCAL/
├── .gitignore               # Exclusión de archivos innecesarios
├── README.md                # Documentación del proyecto
├── package.json             # Dependencias y scripts del proyecto
├── package-lock.json        # Resolución exacta de dependencias
└── src/
    ├── index.html           # Estructura principal del frontend
    ├── style.css            # Estilos visuales
    ├── main.js              # Inicialización del programa
    ├── worker.js            # Web Worker para cargar el modelo
    └── modules/
        ├── dom.js           # Manipulación del DOM
        ├── engine.js        # Motor de inferencia
        ├── events.js        # Manejo de eventos y logica
        ├── exportImport.js  # Persistencia de sesiones con JSON
        └── messages.js      # Lógica de conversación
```

---

## 🧵 ¿Qué hace `worker.js`?

El archivo `worker.js` corre un **Web Worker** que:

- Carga el modelo de lenguaje optimizado en WebAssembly/WebGPU.
- Ejecuta inferencias de forma paralela al hilo principal.
- Mantiene fluidez en la interfaz mediante `postMessage`.

---

## ⚠️ Advertencias

- El rendimiento depende de tu hardware (CPU, GPU, WebGPU disponible).
- Modelos pesados pueden no ser adecuados para dispositivos sin aceleración.
- Este proyecto está orientado netamente a exploración y aprendizaje, no a producción.

---

## 📜 Licencia

Distribuido bajo la [licencia MIT](https://opensource.org/licenses/MIT). Apto para uso personal, educativo o colaborativo.

---

## 🤝 Contribuciones

¡Siempre bienvenidas! Puedes colaborar con:

- Mejoras en estructura modular y rendimiento.
- Nuevas funcionalidades o integración de modelos.
- Correcciones en diseño, lógica o documentación.

---

## 📦 Modelos Compatibles por Consumo de VRAM

### 🟢 LIGEROS *(≤ 1500 MB)*

| Modelo         | `model_id`                               | VRAM aprox. |
|----------------|-------------------------------------------|-------------|
| SmolLM-135M     | `"SmolLM2-135M-Instruct-q0f16-MLC"`       | 359 MB      |
| SmolLM-360M     | `"SmolLM2-360M-Instruct-q4f16_1-MLC"`     | 376 MB      |
| LLaMA-3 1B      | `"Llama-3.2-1B-Instruct-q4f16_1-MLC"`      | 879 MB      |
| Qwen 0.5B       | `"Qwen1.5-0.5B-Chat-q4f16_1-MLC"`          | 1372 MB     |
| Phi-3 Mini      | `"phi-3-mini-4k-instruct-q4f16_1-MLC"`     | 1464 MB     |

### 🟡 MEDIANOS *(1501 – 4000 MB)*

| Modelo                 | `model_id`                                    | VRAM aprox. |
|------------------------|-----------------------------------------------|-------------|
| SmolLM 1.7B            | `"SmolLM2-1.7B-Instruct-q4f16_1-MLC"`          | 1774 MB     |
| Qwen 1.5B              | `"Qwen1.5-1.5B-Chat-q4f16_1-MLC"`              | 2046 MB     |
| DeepSeek Coder 1.3B    | `"deepseek-coder-1.3b-instruct-q4f16_1-MLC"`   | 2111 MB     |
| LLaMA-3 3B (Hermes)    | `"Hermes-3-Llama-3.2-3B-q4f16_1-MLC"`          | 2263 MB     |
| Phi-3.5 Mini           | `"Phi-3.5-mini-instruct-q4f16_1-MLC"`          | 3672 MB     |

### 🔴 PESADOS *(> 4000 MB)*

| Modelo                  | `model_id`                                    | VRAM aprox. |
|-------------------------|-----------------------------------------------|-------------|
| Mistral 7B Instruct     | `"Mistral-7B-Instruct-v0.3-q4f16_1-MLC"`       | 4573 MB     |
| LLaMA-3 8B (Hermes)     | `"Hermes-2-Theta-Llama-3-8B-q4f16_1-MLC"`      | 4976 MB     |
| Qwen 4B                 | `"Qwen1.5-4B-Chat-q4f16_1-MLC"`                | 4710 MB     |
| DeepSeek Coder 6.7B     | `"deepseek-coder-6.7b-instruct-q4f16_1-MLC"`   | 5222 MB     |
| Qwen2 7B                | `"Qwen2-7B-Instruct-q4f16_1-MLC"`              | 5645 MB     |

---
