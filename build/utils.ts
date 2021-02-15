import path from "path";

export const ab = (relative: string) =>
  path.resolve(__dirname, `../${relative}`);
