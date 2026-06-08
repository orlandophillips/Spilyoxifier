import fs from 'fs';
import path from 'path';

const result = await Bun.build({
  entrypoints: ['./src/app.tsx'],
  outdir: './builds',
  naming: 'spicy-lyrics.mjs',
  bundle: true,
  format: 'esm',
  external: ['spicetify'],
  // This loader overrides the CSS engine completely and reads them as raw text strings
  plugins: [{
    name: 'css-text-injection-bypass',
    setup(build) {
      build.onResolve({ filter: /\.css$/ }, args => {
        const importerDir = path.dirname(args.importer);
        return { path: path.resolve(importerDir, args.path), namespace: 'raw-css' };
      });
      build.onLoad({ filter: /.*/, namespace: 'raw-css' }, args => {
        const cssContent = fs.readFileSync(args.path, 'utf8');
        return {
          contents: `const css = ${JSON.stringify(cssContent)};
const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);
export default css;`,
          loader: 'js'
        };
      });
    }
  }]
});

if (result.success) {
  console.log('Success!');
} else {
  console.error('Build failed:', result.logs);
}
