import less from 'less';
import path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import staticImport from 'rollup-plugin-static-import';
// ​import nodeResolve from '@rollup/plugin-node-resolve';

const inputList = [
  'src/**/*.ts',
  'src/**/*.jsx',
  'src/**/*.tsx',
  '!src/**/_example',
  '!src/**/*.d.ts',
  '!src/**/__tests__',
];

const isProd = process.env.NODE_ENV === 'production';

const resolveFile = function (filePath) {
  return path.join(__dirname, '..', filePath);
};

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

export default {
  input: inputList,
  output: {
    dir: './lib',
    format: 'cjs',
    sourcemap: !isProd,
    exports: 'auto',
  },
  external: ['react', 'weui', 'classnames', 'lodash.chunk'],
  plugins: [
    multiInput(),
    commonjs(),
    image(),
    esbuild({
      include: /\.[jt]sx?$/,
      target: 'es2015',
      minify: isProd,
      jsx: 'transform',
      jsxFactory: 'React.createElement',
      jsxFragment: 'React.Fragment',
      tsconfig: 'tsconfig.json',
    }),
    postcss({
      minimize: true,
      extract: true,
      sourceMap: true,
      extensions: ['.sass', '.scss', '.css', '.less'],
      process: processLess,
    }),
    staticImport({
      include: ['src/*.css'],
    }),
  ],
};
