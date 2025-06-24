const log = {
  info: (...msg) => console.info("[INFO]", ...msg),
  warn: (...msg) => console.warn("[WARN]", ...msg),
  error: (...msg) => console.error("[ERROR]", ...msg),
  debug: (...msg) => console.debug("[DEBUG]", ...msg),
};

export default log;
