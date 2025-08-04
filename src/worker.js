import { WebWorkerMLCEngineHandler } from "https://esm.run/@mlc-ai/web-llm";

const handler = new WebWorkerMLCEngineHandler();

onmessage = (msg) => {
  handler.onmessage(msg);
};