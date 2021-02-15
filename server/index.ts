import Koa, { Context } from "koa";
import Router from "@koa/router";
import { createSSRRender, setupDevServer, createRenderer } from "./renderer";
import koaStatic from "koa-static";
import path from "path";
import { BundleRenderer, BundleRendererOptions } from "vue-server-renderer";
import LRU from "lru-cache";

const pageCache = new LRU({
  max: 100,
  maxAge: 1000, // 重要提示：条目在 1 秒后过期。
});

const mode = process.env.NODE_ENV;
const isDev = mode === "development";
// const isDev = false;

const app = new Koa();
const router = new Router();

let renderer: BundleRenderer;
if (isDev) {
  setupDevServer(
    app,
    (bundle: string | object, options: BundleRendererOptions) => {
      console.log("render update finished");
      renderer = createRenderer(bundle, options);
    }
  ).then(() => {
    app.use(renderPage);
  });
} else {
  renderer = createSSRRender();
  app.use(koaStatic(path.resolve(__dirname, "../dist"))).use(renderPage);
}

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

async function renderPage(ctx: Context) {
  console.log("路由匹配:", ctx.url);
  try {
    const cacheable = isCacheable(ctx.url);
    if (cacheable && pageCache.has(ctx.url)) {
      console.log(`${ctx.url} from page cache`);
      ctx.status = 200;
      ctx.body = pageCache.get(ctx.url);
      return;
    }
    const context: any = {
      url: ctx.url,
    };
    const html = await renderer.renderToString(context);

    if (cacheable) {
      pageCache.set(ctx.url, html);
    }

    ctx.res.setHeader("Content-Type", "text/html");
    ctx.status = 200;
    ctx.body = html;

    
  } catch (err) {
    // next()
    console.log(err);

    if (err.url) {
      ctx.redirect(err.url);
    } else if (err.code === 404) {
      ctx.status = err.code || 500;
      ctx.body = "404 NOT FOUND";
    } else {
      ctx.status = err.code || 500;
      ctx.body = "Server Error";
    }
  }
}

function isCacheable(url: string) {
  return ["/home", "/profiles"].indexOf(url) >= 0;
}
