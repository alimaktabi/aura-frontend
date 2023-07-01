import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/brightid': {
        target: 'https://recovery.brightid.org',
        changeOrigin: true,
        rewrite: (path) => path.slice('/brightid'.length),
      },
    },
  },
  plugins: [tsconfigPaths(), VitePWA({ registerType: 'autoUpdate' })],
});
