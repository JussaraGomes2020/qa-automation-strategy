import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Diretório dos testes
  testDir: './playwright/',

  // Execução em paralelo
  fullyParallel: true,

  // Impede test.only no CI
  forbidOnly: !!process.env.CI,

  // Retry apenas no CI
  retries: process.env.CI ? 1 : 0,

  // 1 worker no CI; 3 workers localmente
  workers: process.env.CI ? 1 : 1,

  // Diretório das evidências
  outputDir: './evidencias/playwright',

  // Relatório HTML
  reporter: 'html',

  // Configurações compartilhadas
  use: {
    // URL base
    baseURL: 'https://automationexercise.com',

    // Localização do navegador
    locale: 'pt-BR',

    // Screenshot de cada teste
    screenshot: 'on',

    // Vídeo somente em caso de falha
    video: 'retain-on-failure',

    // Trace somente em caso de falha
    trace: 'retain-on-failure',

    // Browser
    ...devices['Desktop Chrome'],
  },

  // Browser utilizado
  projects: [
    {
      name: 'chromium',
    },
  ],
});