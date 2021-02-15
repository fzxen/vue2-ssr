import createClientConf from "./client.conf";
import createServerConf from "./server.conf";
import webpack from "webpack";

const clientCompiler = webpack(createClientConf());
const serverCompiler = webpack(createServerConf());

clientCompiler.run((err, stats) => {
  const result = stats?.toJson();
  if (stats?.hasErrors()) {
    console.log("client error", result.errors);
  }
});
serverCompiler.run((err, stats) => {
  const result = stats?.toJson();
  if (stats?.hasErrors()) {
    console.log("client error", result.errors);
  }
});
