import { defineConfig } from "evalite/config";
import { createInMemoryStorage } from "evalite/in-memory-storage";
// import { createSqliteStorage } from "evalite/sqlite-storage";

export default defineConfig({
  testTimeout: 300000, // Change according to your test duration. e.g, 5m = 300000ms.
  storage: () => createInMemoryStorage(),
  // storage: () => createSqliteStorage("./storage/evalite.db"),
});
