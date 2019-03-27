import * as Koa from "koa";
import * as Router from "koa-router";
import * as path from "path";
import * as serve from "koa-static";
import * as compress from "koa-compress";
import * as fs from "fs";

// tslint:disable-next-line no-var-requires
const config = require("../../config");

const createServer = async () => {
  const app = new Koa();
  const router = new Router();

  app.use(compress());
  app.use(serve(path.resolve(__dirname, "../../dist")));

  router.get("*", async ctx => {
    const index = fs.readFileSync(
      path.resolve(__dirname, "../../dist/client/index.html"),
      {
        encoding: "utf8"
      }
    );
    const processedIndex = index.replace(
      "var config=;",
      `var config=${JSON.stringify(config)};`
    );

    ctx.status = 200;
    ctx.body = processedIndex;
  });

  app.use(router.routes());

  return app;
};

const server = createServer();
server.then(app => {
  app.listen(config.PORT, () => {
    console.log(`Web app is served at http://localhost:${config.PORT}`);
  });
});
