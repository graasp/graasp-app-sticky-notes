import { defineConfig } from 'cypress';
import vitePreprocessor from 'cypress-vite';

export default defineConfig({
  video: false,

  e2e: {
    retries: 1,
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('file:preprocessor', vitePreprocessor());
      return require('./cypress/plugins/index')(on, config);
    },
    baseUrl: `http://localhost:${process.env.VITE_PORT || 4001}`,
  },

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
  },
});
