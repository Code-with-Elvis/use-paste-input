import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["usePaste.ts"],
  format: ["esm", "cjs"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
