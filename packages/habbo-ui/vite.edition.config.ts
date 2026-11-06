import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
export default defineConfig(({ mode: rawMode }) => {
  const mode = String(rawMode);
 if (!['2003', '2006', '2008'].includes(mode)) throw new Error('Edition must be 2003, 2006 or 2008');
 return {
  plugins: [react(), dts({ include: [`src/${mode}`, "src/vite-env.d.ts"], exclude: ['**/*.test.ts', '**/*.test.tsx'], entryRoot: `src/${mode}`, outDir: `dist/${mode}`, tsconfigPath: './tsconfig.build.json' })],
  build: { outDir: `dist/${mode}`, emptyOutDir: false, lib: { entry: resolve(__dirname, `src/${mode}/index.${mode === '2006' ? 'ts' : 'tsx'}`), formats: ['es'], fileName: 'index', cssFileName: 'style' }, rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] } },
 };
});
