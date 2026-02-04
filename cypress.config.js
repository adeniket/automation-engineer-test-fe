import { defineConfig } from "cypress";

export default defineConfig({
  //watchForFileChanges: false,
  // pageLoadTimeout: 6000,
  video: true,
  e2e: {
    watchForFileChanges: false,
    viewportWidth: 1440,
    viewportHeight: 900,
    setupNodeEvents(on, config) {
      const { allureCypress } = require("allure-cypress/reporter");
      allureCypress(on, config, {
        resultsDir: "allure-results",
      });
      return config;
    },
    baseUrl: "http://localhost:5173/login",
  },
});
