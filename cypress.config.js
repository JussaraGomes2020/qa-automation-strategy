const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

async function setupNodeEvents(on, config) {
  // Plugin do Cucumber
  await addCucumberPreprocessorPlugin(on, config);

  // Plugin do Mochawesome
  require("cypress-mochawesome-reporter/plugin")(on);

  // Pré-processador do Cucumber
  on(
    "file:preprocessor",
    createBundler({
      plugins: [createEsbuildPlugin(config)],
    })
  );

  // Configuração do navegador utilizado pelo Cypress
  on("before:browser:launch", (browser, launchOptions) => {
    if (browser.family === "chromium" && browser.name !== "electron") {
      // Define o idioma do Chrome
      launchOptions.args.push("--lang=pt-BR");

      // Define os idiomas aceitos pelo navegador
      launchOptions.preferences.default.intl = {
        accept_languages: "pt-BR,pt,en-US,en",
      };
    }

    return launchOptions;
  });

  return config;
}

module.exports = defineConfig({
  // Browser
  defaultBrowser: "chrome",

  // Reporter
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

  // Vídeos
  video: true,

  // Screenshots automáticos
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl: "https://automationexercise.com",

    specPattern: [
      "cypress/e2e/**/*.feature",
      "cypress/e2e/**/*.cy.js",
    ],

    supportFile: "cypress/support/e2e.js",

    setupNodeEvents,
  },
});