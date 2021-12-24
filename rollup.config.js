import less from 'less';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import staticImport from 'rollup-plugin-static-import';
import typescript from 'rollup-plugin-typescript2';
// ​import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

import external from 'rollup-plugin-peer-deps-external';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import { terser } from "rollup-plugin-terser";

const inputList = [
  'src/**/*.ts',
  'src/**/*.jsx',
  'src/**/*.tsx',
  '!src/**/_example',
  '!src/**/*.d.ts',
  '!src/**/__tests__',
];

const isProd = process.env.NODE_ENV === 'production';

const processLess = function (context, payload) {
  return new Promise((resolve, reject) => {
    less.render({
      file: context,
    }, (err, result) => {
      if (!err) {
        resolve(result);
      } else {
        reject(err);
      }
    });

    less.render(context, {})
      .then(
        (output) => {
          // output.css = string of css
          // output.map = string of sourcemap
          // output.imports = array of string filenames of the imports referenced
          if (output && output.css) {
            resolve(output.css);
          } else {
            reject({});
          }
        },
        (err) => {
          reject(err);
        },
      );
  });
};

export default (env, argus) => {
  const { platform = 'h5', environment } = env;

  if (!['weapp', 'h5'].includes(platform)) {
    throw new Error(`暂不支持 platform=${platform}，仅支持 weapp、h5。`);
  }

  const isProduction = environment === 'production';

  return {
    input: 'src/index.ts',
    output: [
      {
        dir: `./lib/${platform}`,
        format: 'cjs',
        sourcemap: !isProd,
        exports: 'auto',
      },
      {
        dir: `./es/${platform}`,
        format: 'es',
        sourcemap: !isProd,
        exports: 'auto',
      },
    ],
    external: ['react', 'weui', 'classnames', 'lodash.chunk', 'react-dom', 'is-url'],
    plugins: [
      // multiInput(),
      // commonjs(),
      // image(),
      // esbuild({
      //   include: /\.[jt]sx?$/,
      //   target: 'es2015',
      //   minify: isProd,
      //   jsx: 'transform',
      //   jsxFactory: 'React.createElement',
      //   jsxFragment: 'React.Fragment',
      //   tsconfig: 'tsconfig.json',
      // }),
      // postcss({
      //   minimize: true,
      //   extract: true,
      //   sourceMap: true,
      //   extensions: ['.sass', '.scss', '.css', '.less'],
      //   process: processLess,
      // }),
      // staticImport({
      //   include: ['src/*.css'],
      // }),

      external(),
      postcss({
        minimize: isProduction,
        extract: true,
        sourceMap: true,
        extensions: ['.sass', '.scss', '.css', '.less'],
        process: processLess,
      }),
      image(),
      resolve(),
      builtins(),
      commonjs(),
      typescript({
        tsconfig: 'tsconfig.json',
        exclude: ['*.d.ts'],
      }),
      replace({
        'process.env.TARO_ENV': JSON.stringify(platform),
        preventAssignment: true,
      }),
      isProduction && terser(),
    ],
  };
};
