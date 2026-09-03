import { test } from '@playwright/test';
import LoginPage from '../pages/LoginPage';

const loginData = require('../fixtures/login/login.json');

test.describe('Login', () => {

  test('Login realizado com sucesso', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessarTelaLogin();

    await loginPage.realizarLogin(
      loginData.usuarioValido.email,
      loginData.usuarioValido.senha
    );

    await loginPage.validarLoginRealizado();
  });

  test('Login inválido', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.acessarTelaLogin();

    await loginPage.realizarLogin(
      loginData.usuarioInvalido.email,
      loginData.usuarioInvalido.senha
    );

    await loginPage.validarMensagemLoginInvalido();
  });

});