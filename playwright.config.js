// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Diretório dos testes
  testDir: './playwright/tests',

  // Executa os testes em paralelo
  fullyParallel: true,

  // Impede test.only no CI
  forbidOnly: !!process.env.CI,

  // Retry apenas no CI
  retries: process.env.CI ? 1 : 0,

  // Um worker no CI; local usa o padrão
  workers: process.env.CI ? 1 : undefined,

  // Relatório HTML
  reporter: 'html',

  // Configurações compartilhadas
  use: {
    // URL base do projeto
    baseURL: 'https://automationexercise.com',

    // Deixa a execução mais lenta para acompanhamento visual
    launchOptions: {
      slowMo: 1000,
    },

    // Coleta trace quando houver retry
    trace: 'on-first-retry',

    // Browser principal
    ...devices['Desktop Chrome'],
  },

  // Browser utilizado nos testes
  projects: [
    {
      name: 'chromium',
    },
  ],
});