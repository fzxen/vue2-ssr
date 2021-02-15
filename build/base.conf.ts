import { ab } from "./utils";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import ExtractCssPlugin, {
  loader as extractLoader,
} from "mini-css-extract-plugin";

export default function createBaseConf(): Configuration {
  const isDev = process.env.NODE_ENV === "development";

  const plugins = [new VueLoaderPlugin(), new ExtractCssPlugin()];

  return {
    output: {
      publicPath: "/",
      path: ab("./dist"),
      filename: "[name].[chunkhash].js",
    },
    devtool: isDev ? "cheap-module-source-map" : false,

    mode: isDev ? "development" : "production",

    resolve: {
      extensions: [".ts", ".vue", ".js"],
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: ["ts-loader"],
        },
        {
          test: /\.vue$/,
          use: ["vue-loader"],
        },
        {
          test: /\.css$/,
          use: [
            isDev ? "vue-style-loader" : extractLoader,
            {
              loader: "css-loader",
              options: {
                esModule: false,
              },
            },
          ],
        },
        {
          test: /\.scss$/,
          use: [
            isDev ? "vue-style-loader" : extractLoader,
            {
              loader: "css-loader",
              options: {
                esModule: false,
              },
            },
            "sass-loader",
          ],
        },
      ],
    },

    plugins,
  };
}
