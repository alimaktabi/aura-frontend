import { defineConfig } from 'cypress';
import Browser = Cypress.Browser;

export default defineConfig({
  defaultCommandTimeout: 24000, // 2x average block time
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(_on, config) {
      const chrome = config.browsers.find(({ name }) => name === 'chrome');
      if (!chrome) return config;
      return {
        ...config,
        // Only enable Chrome.
        browsers: [
          chrome,
          {
            ...chrome,
            name: 'brave',
            path: 'brave-browser',
            displayName: 'brave',
          } as Browser,
        ],
      };
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
