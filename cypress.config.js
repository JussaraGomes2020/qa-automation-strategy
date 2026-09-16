const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  require("cypress-mochawesome-reporter/plugin")(on);

  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Padroniza o idioma do navegador para as execuções.
  on("before:browser:launch", (browser, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      launchOptions.args.push("--lang=pt-BR");

      launchOptions.preferences.default.intl = {
        accept_languages: "pt-BR,pt,en-US,en",
      };
    }

    return launchOptions;
  });

  return config;
}

module.exports = defineConfig({
  defaultBrowser: "chrome",

  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    reportDir: "cypress/reports",
    overwrite: true,
    charts: true,
    reportPageTitle: "Relatório de Automação",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://automationexercise.com",

    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.js",
      "cypress/api/**/*.cy.js",
    ],

    supportFile: "cypress/support/e2e.js",

    setupNodeEvents,
  },
});