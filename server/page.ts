import Router from "@koa/router";

const pageRouter = new Router()

pageRouter.get('/api', async (ctx, next) => {
  // TODO your code
  await next()
})

export default pageRouter