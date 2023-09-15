import { defineConfig } from 'cypress';
import Browser = Cypress.Browser;

export default defineConfig({
  chromeWebSecurity: false,
  e2e: {
    setupNodeEvents(_on, config) {
      const chrome = config.browsers.find(({ name }) => name === 'chrome');
      if (!chrome) return config;
      return {
        ...config,
        browsers: [
          chrome,
          {
            ...chrome,
            name: 'brave',
            path: 'brave-browser',
            displayName: 'brave',
            version: 'unknown',
          } as Browser,
        ],
      };
    },
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
});
