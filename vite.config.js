import { defineConfig } from 'vite';
import { resolve } from 'path';
import { glob } from 'glob';

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync('*.html').map(file => [
          file.replace('.html', ''),
          resolve(__dirname, file)
        ])
      ),
    },
  },
});
