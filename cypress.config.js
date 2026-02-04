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
      // implement node event listeners here
    },
    baseUrl: "http://localhost:5173/login",
  },
});
