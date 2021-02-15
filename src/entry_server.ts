import { createApp } from "./app";

interface IServerContext {
  url: string;
  state: any,
  meta: any
}

export default function (ctx: IServerContext) {
  const { app, router, store } = createApp();
  return new Promise<typeof app>((resolve, reject) => {
    router.push(ctx.url);
    ctx.meta = app.$meta()

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (matchedComponents.length <= 0) {
        return reject({ code: 404 });
      }

      Promise.all(
        matchedComponents.map((com: any) => {
          if (com.asyncData !== undefined) {
            return com.asyncData({ store, router: router.currentRoute });
          }
        })
      ).then(() => {
        ctx.state = store.state
        resolve(app);
      }).catch(() => {
        reject({ code: 500 })
      });
    }, reject);
  });
}
