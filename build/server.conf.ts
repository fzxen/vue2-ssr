import createBaseConf from "./base.conf";
import merge from "webpack-merge";
import { ab } from "./utils";
import nodeExternals from "webpack-node-externals";
import VueSSRServerPlugin from "vue-server-renderer/server-plugin";

export default function createServerConf() {
  const base = createBaseConf()
  return merge(base, {
    entry: {
      app: ab("./src/entry_server.ts"),
    },
    target: "node",
    devtool: "source-map",
    output: {
      filename: "server-bundle.js",
      libraryTarget: "commonjs2",
    },
    externals: nodeExternals({
      // 不要外置化 webpack 需要处理的依赖模块。
      // 你可以在这里添加更多的文件类型。例如，未处理 *.vue 原始文件，
      // 你还应该将修改 `global`（例如 polyfill）的依赖模块列入白名单
      allowlist: [/\.css$/, /\.vue$/],
    }),
    plugins: [new VueSSRServerPlugin()],
  });
}
