import { envs } from "./config/envs.js";
import { AppRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";
import { MongoDatabase } from "./infrastructure/data/mongo/init.js";

(() => {
  main();
})();

async function main() {
  const appRoutes = new AppRoutes();

  await MongoDatabase.connect({
    url: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const server = new Server({
    port: envs.PORT,
    routes: appRoutes.routes(),
    public_path: envs.PUBLIC_PATH,
  });

  server.start();

};