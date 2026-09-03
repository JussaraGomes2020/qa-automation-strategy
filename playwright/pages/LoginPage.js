import { expect } from '@playwright/test';

class LoginPage {

  constructor(page) {
    this.page = page;

    // Seletores
    this.campoEmail = page.locator('[data-qa="login-email"]');
    this.campoSenha = page.locator('[data-qa="login-password"]');
    this.botaoLogin = page.locator('[data-qa="login-button"]');

    this.botaoLogout = page.locator('a[href="/logout"]');
    this.botaoExcluirConta = page.locator('a[href="/delete_account"]');

    // Mensagens
    this.mensagemUsuarioLogado = page.getByText('Logged in as');
    this.mensagemLoginInvalido = page.getByText(
      'Your email or password is incorrect!'
    );
  }

  // Navegação

  async acessarTelaLogin() {
    await this.page.goto('/login');
  }

  // Ações

  async informarEmail(email) {
    await this.campoEmail.fill(email);
  }

  async informarSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  async clicarBotaoLogin() {
    await this.botaoLogin.click();
  }

  async realizarLogin(email, senha) {
    await this.informarEmail(email);
    await this.informarSenha(senha);
    await this.clicarBotaoLogin();
  }

  // Validações

  async validarLoginRealizado() {
    await expect(this.mensagemUsuarioLogado).toBeVisible();
    await expect(this.botaoLogout).toBeVisible();
    await expect(this.botaoExcluirConta).toBeVisible();
  }

  async validarMensagemLoginInvalido() {
    await expect(this.mensagemLoginInvalido).toBeVisible();
    await expect(this.page).toHaveURL(/\/login/);
  }
}

export default LoginPage;