// logging.js
import log from "https://cdn.jsdelivr.net/npm/loglevel";
log.setLevel("info");

export default log;

// utils.js
export function validateShopForm(name, location) {
  return name.length > 0 && location.length > 0;
}
