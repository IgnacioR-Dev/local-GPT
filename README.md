```md
# 🧠 Local GPT - Agente LLM en tu Navegador

> Proyecto experimental para ejecutar agentes LLM directamente en el navegador, sin servidor ni backend.

![WebLLM](https://img.shields.io/badge/WebLLM-enabled-blue)
![WebGPU](https://img.shields.io/badge/WebGPU-required-orange)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📚 Índice

- [🚀 Instalación y Ejecución](#-instalación-y-ejecución)
- [🎨 Características](#-características)
- [🔧 Personalización](#-personalización)
- [🗂️ Estructura del Proyecto](#-estructura-del-proyecto)
- [🧵 ¿Qué hace worker.js?](#-qué-hace-workerjs)
- [⚠️ Advertencias](#-advertencias)
- [📦 Modelos Compatibles por Consumo de VRAM](#-modelos-compatibles-por-consumo-de-vram)
- [📜 Licencia](#-licencia)
- [🤝 Contribuciones](#-contribuciones)

---

## 🚀 Instalación y Ejecución

### Requisitos

- Navegador moderno compatible con ES Modules, Web Workers y WebGPU.
- Modelo open source optimizado para WebLLM ([ver modelos disponibles](https://github.com/mlc-ai/web-llm)).
- Servidor HTTP local (no usar `file://` directamente).

### Opción 1: Servidor con Node.js

```bash
npm install -g http-server
cd chatgpt-local
http-server
```

Accede desde: `http://127.0.0.1:8081`

### Opción 2: Live Server en Visual Studio Code

1. Instala la extensión **Live Server**.
2. Abre el proyecto.
3. Clic derecho en `index.html` → **Open with Live Server**.

---

## 🎨 Características

- Interfaz minimalista y adaptativa.
- Streaming de texto en tiempo real.
- Historial de conversación persistente (exportación/importación en JSON).
- Botón para copiar respuestas fácilmente.
- Separación visual entre mensajes.
- Autonomía total — sin backend ni conexión externa.
- Compatible con múltiples modelos open source.

---

## 🔧 Personalización

Modificá el comportamiento del modelo ajustando el System Prompt y parámetros:

```js
const mensajeSystem = {
  role: 'system',
  content: `Eres un programador experto en JavaScript que responde con ejemplos prácticos.`
};
```

También podés editar:

- `MODELO_SELECCIONADO` en `engine.js`
- `temperature`, `max_tokens` en `events.js`
- Estilos en `style.css`

---

## 🗂️ Estructura del Proyecto

```
CHATGPT-LOCAL/
├── .gitignore
├── README.md
├── package.json
├── package-lock.json
└── src/
    ├── index.html
    ├── style.css
    ├── main.js
    ├── worker.js
    └── modules/
        ├── dom.js
        ├── engine.js
        ├── events.js
        ├── exportImport.js
        └── messages.js
```

---

## 🧵 ¿Qué hace `worker.js`?

Corre un **Web Worker** que:

- Carga el modelo optimizado vía WebAssembly/WebGPU.
- Ejecuta inferencias sin bloquear el hilo principal.
- Comunica resultados mediante `postMessage`.

---

## ⚠️ Advertencias

- El rendimiento depende del hardware (CPU/GPU/WebGPU).
- Modelos pesados pueden saturar equipos sin aceleración.
- Proyecto enfocado en exploración y aprendizaje, no producción.

---

## 📦 Modelos Compatibles por Consumo de VRAM

### 🟢 LIGEROS (≤ 1500 MB)

| Modelo         | `model_id`                               | VRAM aprox. |
|----------------|-------------------------------------------|-------------|
| SmolLM-135M     | `SmolLM2-135M-Instruct-q0f16-MLC`       | 359 MB      |
| SmolLM-360M     | `SmolLM2-360M-Instruct-q4f16_1-MLC`     | 376 MB      |
| LLaMA-3 1B      | `Llama-3.2-1B-Instruct-q4f16_1-MLC`      | 879 MB      |
| Qwen 0.5B       | `Qwen1.5-0.5B-Chat-q4f16_1-MLC`          | 1372 MB     |
| Phi-3 Mini      | `phi-3-mini-4k-instruct-q4f16_1-MLC`     | 1464 MB     |

### 🟡 MEDIANOS (1501–4000 MB)

| Modelo                 | `model_id`                                   | VRAM aprox. |
|------------------------|----------------------------------------------|-------------|
| SmolLM 1.7B            | `SmolLM2-1.7B-Instruct-q4f16_1-MLC`          | 1774 MB     |
| Qwen 1.5B              | `Qwen1.5-1.5B-Chat-q4f16_1-MLC`              | 2046 MB     |
| DeepSeek Coder 1.3B    | `deepseek-coder-1.3b-instruct-q4f16_1-MLC`   | 2111 MB     |
| LLaMA-3 3B (Hermes)    | `Hermes-3-Llama-3.2-3B-q4f16_1-MLC`          | 2263 MB     |
| Phi-3.5 Mini           | `Phi-3.5-mini-instruct-q4f16_1-MLC`          | 3672 MB     |

### 🔴 PESADOS (> 4000 MB)

| Modelo                  | `model_id`                                  | VRAM aprox. |
|-------------------------|---------------------------------------------|-------------|
| Mistral 7B Instruct     | `Mistral-7B-Instruct-v0.3-q4f16_1-MLC`       | 4573 MB     |
| LLaMA-3 8B (Hermes)     | `Hermes-2-Theta-Llama-3-8B-q4f16_1-MLC`      | 4976 MB     |
| Qwen 4B                 | `Qwen1.5-4B-Chat-q4f16_1-MLC`                | 4710 MB     |
| DeepSeek Coder 6.7B     | `deepseek-coder-6.7b-instruct-q4f16_1-MLC`   | 5222 MB     |
| Qwen2 7B                | `Qwen2-7B-Instruct-q4f16_1-MLC`              | 5645 MB     |

---

## 📜 Licencia

Distribuido bajo la [licencia MIT](https://opensource.org/licenses/MIT). Apto para uso personal, educativo o colaborativo.

---

## 🤝 Contribuciones

¡Bienvenidas! Puedes aportar en:

- Modularidad y rendimiento.
- Nuevas funciones y compatibilidad de modelos.
- Mejora visual o documentación.

---