import { createApp } from "./app";
import Vue from "vue";
import createLoading from "./components/loading";

const { app, router, store } = createApp();

const initalState = (window as any).__INITIAL_STATE__;
if (initalState) {
  store.replaceState(initalState);
}

Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    Promise.all(
      to.matched.map((c) => {
        const options = c.components.$options;
        const asyncData = (options as any).asyncData;
        if (asyncData) {
          return asyncData({
            store: store,
            route: to,
          });
        }
      })
    ).finally(next);
  },
});

router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);

    let diffed = false;
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = prevMatched[i] !== c);
    });

    if (activated.length <= 0) next();

    // 这里可以显示加载器
    const render = createLoading();
    render
      .mount()
      .then(() =>
        Promise.all(
          activated.map((c: any) => {
            if (c.asyncData) return c.asyncData({ store, router: to });
          })
        )
      )
      .then((res) => {
        // TODO 将结果 合并到data选项
      })
      .catch(() => {
        // TODO 跳转到错误页面
      })
      .finally(() => {
        // 这里可以关闭加载器
        render.hide();
        next();
      });
  });
  app.$mount("#app");
});
