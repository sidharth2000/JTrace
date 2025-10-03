// esbuild.config.js
const esbuild = require('esbuild');

const isProd = process.argv.includes('--production');

// Bundle React frontend
esbuild.build({
  entryPoints: ['src/views/index.jsx'],
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  outfile: 'out/views/index.js',
  loader: { '.js': 'jsx', '.jsx': 'jsx' },
  platform: 'browser',
  target: 'es2020',
}).catch(() => process.exit(1));

// Bundle VS Code backend (extension.js)
esbuild.build({
  entryPoints: ['extension.js'],
  bundle: true,
  minify: isProd,
  sourcemap: !isProd,
  outfile: 'out/extension.js',
  external: ['vscode'], // don’t bundle VS Code API
  platform: 'node',
  target: 'es2020',
}).catch(() => process.exit(1));
