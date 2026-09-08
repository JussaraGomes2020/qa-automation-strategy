import { test } from '@playwright/test';
import LoginPage from '../../pages/LoginPage';
import loginData from '../../fixtures/login/login.json';

test.describe('Login', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);

    await loginPage.acessarTelaLogin();
  });

  // =========================
  // Login realizado com sucesso
  // =========================

  test('Login realizado com sucesso', async () => {

    await loginPage.informarEmail(
      loginData.usuarioValido.email
    );

    await loginPage.informarSenha(
      loginData.usuarioValido.senha
    );

    await loginPage.clicarBotaoLogin();

    await loginPage.validarLoginRealizado();

    await loginPage.validarUsuarioAutenticado();
  });

  // =========================
  // Login com senha inválida
  // =========================

  test('Login com senha inválida', async () => {

    await loginPage.informarEmail(
      loginData.usuarioValido.email
    );

    await loginPage.informarSenha(
      loginData.senhaInvalida
    );

    await loginPage.clicarBotaoLogin();

    await loginPage.validarAcessoNegado();

    await loginPage.validarMensagemLoginInvalido();
  });

  // =========================
  // Login com e-mail não cadastrado
  // =========================

  test('Login com e-mail não cadastrado', async () => {

    await loginPage.informarEmail(
      loginData.emailNaoCadastrado
    );

    await loginPage.informarSenha(
      loginData.usuarioValido.senha
    );

    await loginPage.clicarBotaoLogin();

    await loginPage.validarAcessoNegado();

    await loginPage.validarMensagemLoginInvalido();
  });

  // =========================
  // Login sem informar o e-mail
  // =========================

  test('Login sem informar o e-mail', async () => {

    await loginPage.limparEmail();

    await loginPage.informarSenha(
      loginData.usuarioValido.senha
    );

    await loginPage.clicarBotaoLogin();

    await loginPage.validarEmailObrigatorio();

    await loginPage.validarFormularioNaoEnviado();
  });

  // =========================
  // Login sem informar a senha
  // =========================

  test('Login sem informar a senha', async () => {

    await loginPage.informarEmail(
      loginData.usuarioValido.email
    );

    await loginPage.limparSenha();

    await loginPage.clicarBotaoLogin();

    await loginPage.validarSenhaObrigatoria();

    await loginPage.validarMensagemCampoObrigatorio();

    await loginPage.validarFormularioNaoEnviado();
  });

  // =========================
  // Login com e-mail em formato inválido
  // =========================

  test('Login com e-mail em formato inválido', async () => {

    await loginPage.informarEmail(
      loginData.emailFormatoInvalido
    );

    await loginPage.informarSenha(
      loginData.usuarioValido.senha
    );

    await loginPage.clicarBotaoLogin();

    await loginPage.validarFormularioNaoEnviado();

    await loginPage.validarEmailInvalido();

    await loginPage.validarMensagemEmailInvalido();
  });

  // =========================
  // Logout do usuário autenticado
  // =========================

  test('Logout do usuário autenticado', async () => {

    await loginPage.realizarLogin(
      loginData.usuarioValido.email,
      loginData.usuarioValido.senha
    );

    await loginPage.validarLoginRealizado();

    await loginPage.clicarLogout();

    await loginPage.validarLogout();

    await loginPage.validarPaginaLogin();
  });

});