import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 3000,
    proxy: {
      '/brightid': {
        target: 'https://recovery.brightid.org',
        changeOrigin: true,
        rewrite: (path) => path.slice('/brightid'.length),
        secure: mode !== 'development',
      },
    },
  },
  plugins: [tsconfigPaths(), VitePWA({ registerType: 'autoUpdate' })],
}));
