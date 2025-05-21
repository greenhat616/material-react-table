import pkg from './package.json' with { type: 'json' };
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';
import external from 'rollup-plugin-peer-deps-external';

const externals = [
  '@mui/icons-material',
  '@mui/material',
  '@mui/x-date-pickers',
  '@tanstack/match-sorter-utils',
  '@tanstack/react-table',
  '@tanstack/react-virtual',
  'highlight-words',
  'react',
];

export default [
  {
    input: './src/index.ts',
    external: externals,
    output: [
      /* CommonJS */
      {
        dir: 'dist',
        entryFileNames: '[name].cjs', // => dist/index.cjs
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      /* ESM */
      {
        dir: 'dist',
        entryFileNames: '[name].esm.js', // => dist/index.esm.js
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      typescript({
        rootDir: './src',
        declaration: true,
        declarationDir: 'dist/types',
      }),
    ],
  },
  {
    input: './dist/types/index.d.ts',
    output: { file: pkg.typings, format: 'es' }, // => dist/index.d.ts
    plugins: [dts(), del({ hook: 'buildEnd', targets: 'dist/types' })],
  },
];
