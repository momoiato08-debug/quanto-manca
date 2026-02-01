import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        accedi: resolve(__dirname, 'accedi.html'),
        crea: resolve(__dirname, 'crea.html'),
        sostienici: resolve(__dirname, 'sostienici.html'),
        natale: resolve(__dirname, 'quanto-manca-a-natale.html'),
        pasqua: resolve(__dirname, 'quanto-manca-a-pasqua.html'),
        halloween: resolve(__dirname, 'quanto-manca-ad-halloween.html'),
        vacanze: resolve(__dirname, 'quanto-manca-alle-vacanze.html'),
        capodanno: resolve(__dirname, 'quanto-manca-a-capodanno.html'),
      },
    },
  },
});
