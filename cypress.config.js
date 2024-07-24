const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl : "http://localhost:5173",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  reporter: "cypress-mochawesome-reporter", 
  reporterOptions: {
    reportFilename: "cypress-report.html",
    reportPageTitle: "Cat's lovers' report",
    saveAllAttempts: false,
  },
});
