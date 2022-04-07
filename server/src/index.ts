import { initializeDatabaseConnection } from "./config/database";
import { startApplication } from "./config/app";

(async () => {
  await initializeDatabaseConnection(startApplication);
})();
