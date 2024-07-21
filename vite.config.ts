import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { readFileSync } from "fs";
import path from "path";

import typescript from "@rollup/plugin-typescript";

const packageJson = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);
const globals = {
  ...(packageJson?.dependencies || {}),
};

function resolve(str: string) {
  return path.resolve(__dirname, str);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: 'es2015',
      rootDir: resolve("src/components"),
      declaration: true,
      declarationDir: resolve("dist"),
      exclude:resolve("node_modules"),
      allowSyntheticDefaultImports: true,
    }),
  ],
  build: {
    outDir: "dist",
    lib: {
      entry: resolve("src/components/index.ts"),
      name: "fish-ui-sy",
      fileName: (format) => `fish-ui-sy.${format}.js`,
      formats: ["cjs", "es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", ...Object.keys(globals)],
      output: {
         // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          ...globals,
        },
        format: 'cjs'
      }
    },
  },
});
