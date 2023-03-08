import { DEFAULT_EXTENSIONS } from "@babel/core";
import babel from "@rollup/plugin-babel";
import typescript from "rollup-plugin-typescript2";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import svgr from "@svgr/rollup";
import { terser } from "rollup-plugin-terser";
import typescriptEngine from "typescript";
import pkg from "./package.json" assert { type: "json" };
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import image from "@rollup/plugin-image";

const config = {
  input: "./src/index.ts",
  output: [
    {
      file: pkg.module,
      format: "esm",
      exports: "named",
      sourcemap: false,
    },
  ],
  external: ["wagmi", "@mui/material"],
  plugins: [
    peerDepsExternal(),
    postcss({
      plugins: [],
      minimize: true,
    }),
    external({
      includeDependencies: true,
    }),
    typescript({
      tsconfig: "./tsconfig.json",
      typescript: typescriptEngine,
      sourceMap: false,
    }),
    commonjs({ include: /node_modules/ }),
    babel({
      extensions: [...DEFAULT_EXTENSIONS, ".ts", "tsx"],
      babelHelpers: "runtime",
      exclude: /node_modules/,
    }),
    url(),
    svgr(),
    image(),
    resolve({ extensions: [".ts", ".js"], browser: true }),
    terser(),
    json(),
  ],
  watch: {
    clearScreen: false,
  },
};

export default config;
