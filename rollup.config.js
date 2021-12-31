import commonjs from '@rollup/plugin-commonjs';
import multiInput from 'rollup-plugin-multi-input';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import image from '@rollup/plugin-image';
import staticImport from 'rollup-plugin-static-import';
import replace from '@rollup/plugin-replace';
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
const external = ['react', 'weui', 'classnames', 'lodash.chunk', 'react-dom', 'is-url', '@tarojs/components', 'omit.js'];

const basePlugins = [
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
  }),
  staticImport({
    include: ['src/*.css'],
  }),
];

const baseConfig = {
  input: inputList,
  output: [
    {
      dir: './lib',
      format: 'cjs',
      sourcemap: !isProd,
      exports: 'auto',
    },
  ],
  external,
  plugins: basePlugins
};

const H5Config = {
  input: inputList,
  output: [
    {
      dir: './h5',
      format: 'cjs',
      sourcemap: !isProd,
      exports: 'auto',
    },
  ],
  external,
  plugins: [
    ...basePlugins,
    replace({
      preventAssignment: true,
      values: {
        'process.env.TARO_ENV': JSON.stringify('h5'),
      }
    })
  ]
};

const TaroConfig = {
  input: inputList,
  output: [
    {
      dir: './taro',
      format: 'cjs',
      sourcemap: !isProd,
      exports: 'auto',
    },
  ],
  external,
  plugins: [
    ...basePlugins,
    replace({
      preventAssignment: true,
      values: {
        'process.env.TARO_ENV': JSON.stringify('weapp'),
      }
    })
  ]
};

export default [baseConfig, H5Config, TaroConfig];
