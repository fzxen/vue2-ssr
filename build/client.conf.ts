import merge from "webpack-merge";
import createBaseConf from "./base.conf";
import VueSSRClientPlugin from "vue-server-renderer/client-plugin";
import { ab } from "./utils";

export default function createClientConf() {
  const isDev = process.env.NODE_ENV === "development";
  const base = createBaseConf();
  return merge(base, {
    entry: [ab("./src/entry_client.ts")],
    output: {
      filename: isDev ? "[name].js" : "[name][chunkhash].js",
    },
    plugins: [new VueSSRClientPlugin()],
  });
}
