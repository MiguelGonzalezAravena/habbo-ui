import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'node:path';
export default defineConfig({
  plugins: [react(), dts({ include: ['src/index.ts'], exclude: ['**/*.test.ts', '**/*.test.tsx', '**/test-setup.ts'], tsconfigPath: './tsconfig.build.json' })],
  build: { lib: { entry: resolve(__dirname, 'src/index.ts'), formats: ['es'], fileName: 'index', cssFileName: 'style' }, rollupOptions: { external: ['react', 'react-dom', 'react/jsx-runtime'] } },
  test: { environment: 'jsdom', setupFiles: ['./src/test-setup.ts'] }
});
