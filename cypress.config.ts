import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    specPattern: './test/playwright',
    setupNodeEvents(on, config) {
      return config
    },
  },
});
