const { defineConfig } = require("cypress");

module.exports = defineConfig({
  env: {
    baseUrl : "http://localhost:5173",
    baseUrlBackoffice : "http://localhost:5174",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
  reporter: "cypress-mochawesome-reporter", 
  reporterOptions: {
    // reportFilename: "cypress-report.html",
    reportPageTitle: "Cat's lovers' report",
    // reportDir: "mochawesome-report/",
    saveAllAttempts: true,
    overwrite: false,
    // embeddedScreenshots: true,
    // inlineAssets: true,
    // charts: true,
    // screenshotsFolder: "mochawesome-report/assets"
  },
});
