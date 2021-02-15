import Vue, { Component } from "vue";

interface ComponentRenderOptions {
  container?: HTMLElement;
  component: any;
  props?: any;
  delay?: number;
}

export function createRender({
  container = document.body,
  component,
  props = {},
  delay = 200,
}: ComponentRenderOptions) {
  const Instance = Vue.extend({
    name: "Wrap",
    data: () => ({ isShow: false }),
    render(h) {
      return h(component, {
        ref: "child",
        props: {
          isShow: this.isShow,
          ...props,
        },
        on: {
          hide,
          unmount: () => {
            unmount();
          },
        },
      });
    },
  });
  const instance = new Instance();
  const com = instance.$mount();

  function mount() {
    return new Promise<void>((resolve) => {
      if (!container.contains(com.$el)) container.appendChild(com.$el);
      setTimeout(() => {
        instance.$data.isShow = true;
        resolve();
      }, delay);
    });
  }
  function unmount() {
    return new Promise<void>((resolve) => {
      instance.$data.isShow = true;
      setTimeout(() => {
        instance.$destroy();
        if (container.contains(com.$el)) container.removeChild(com.$el);
        resolve();
      }, delay);
    });
  }
  function hide() {
    instance.$data.isShow = false;
  }

  return { mount, hide, unmount, instance };
}
