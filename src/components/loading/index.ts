import Loading from "./index.vue";
import { createRender } from "../../assets/libs";

let render: ReturnType<typeof createRender>;

export default function createLoading() {
  if (render === undefined)
    render = createRender({
      component: Loading,
    });

  return render;
}
