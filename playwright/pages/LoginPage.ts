import { expect, Locator, Page } from '@playwright/test';

class LoginPage {
  readonly page: Page;

  // =========================
  // Seletores
  // =========================

  readonly campoEmail: Locator;
  readonly campoSenha: Locator;

  readonly botaoLogin: Locator;
  readonly botaoLogout: Locator;
  readonly botaoExcluirConta: Locator;

  // =========================
  // Mensagens
  // =========================

  readonly mensagemUsuarioLogado: Locator;
  readonly mensagemLoginInvalido: Locator;

  constructor(page: Page) {
    this.page = page;

    this.campoEmail = page.locator('[data-qa="login-email"]');
    this.campoSenha = page.locator('[data-qa="login-password"]');

    this.botaoLogin = page.locator('[data-qa="login-button"]');
    this.botaoLogout = page.locator('a[href="/logout"]');
    this.botaoExcluirConta = page.locator(
      'a[href="/delete_account"]'
    );

    this.mensagemUsuarioLogado = page.getByText('Logged in as');

    this.mensagemLoginInvalido = page.getByText(
      'Your email or password is incorrect!'
    );
  }

  // =========================
  // Navegação
  // =========================

  async acessarTelaLogin(): Promise<void> {
    await this.page.goto('/login');
  }

  // =========================
  // Ações
  // =========================

  async informarEmail(email: string): Promise<void> {
    await this.campoEmail.fill(email);
  }

  async informarSenha(senha: string): Promise<void> {
    await this.campoSenha.fill(senha);
  }

  async limparEmail(): Promise<void> {
    await this.campoEmail.clear();
  }

  async limparSenha(): Promise<void> {
    await this.campoSenha.clear();
  }

  async clicarBotaoLogin(): Promise<void> {
    await this.botaoLogin.click();
  }

  async clicarLogout(): Promise<void> {
    await this.botaoLogout.click();
  }

  async realizarLogin(
    email: string,
    senha: string
  ): Promise<void> {
    await this.acessarTelaLogin();
    await this.informarEmail(email);
    await this.informarSenha(senha);
    await this.clicarBotaoLogin();
  }

  // =========================
  // Validações - Login
  // =========================

  async validarLoginRealizado(): Promise<void> {
    await expect(this.botaoLogout).toBeVisible();
    await expect(this.botaoExcluirConta).toBeVisible();
  }

  async validarUsuarioAutenticado(): Promise<void> {
    await expect(this.mensagemUsuarioLogado).toBeVisible();
  }

  async validarAcessoNegado(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.botaoLogin).toBeVisible();
  }

  async validarMensagemLoginInvalido(): Promise<void> {
    await expect(
      this.mensagemLoginInvalido
    ).toBeVisible();
  }

  // =========================
  // Validações - Campos obrigatórios
  // =========================

  async validarEmailObrigatorio(): Promise<void> {
    await expect(this.campoEmail)
      .toHaveAttribute('required', '');
  }

  async validarSenhaObrigatoria(): Promise<void> {
    await expect(this.campoSenha)
      .toHaveAttribute('required', '');
  }

  async validarMensagemCampoObrigatorio(): Promise<void> {
    const mensagem = await this.campoSenha.evaluate(
      (campo: HTMLInputElement) => campo.validationMessage
    );

    expect(mensagem).toBeTruthy();
  }

  async validarFormularioNaoEnviado(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
  }

  // =========================
  // Validações - E-mail
  // =========================

  async validarEmailInvalido(): Promise<void> {
    const emailValido = await this.campoEmail.evaluate(
      (campo: HTMLInputElement) => campo.validity.valid
    );

    expect(emailValido).toBe(false);
  }

  async validarMensagemEmailInvalido(): Promise<void> {
    const mensagemAtual = await this.campoEmail.evaluate(
      (campo: HTMLInputElement) => campo.validationMessage
    );

    expect(mensagemAtual).toBeTruthy();

    expect(mensagemAtual).toContain(
      'jagqualityassurancegmail.com'
    );
  }

  // =========================
  // Validações - Logout
  // =========================

  async validarLogout(): Promise<void> {
    await expect(this.botaoLogout).not.toBeVisible();
    await expect(this.botaoExcluirConta).not.toBeVisible();
  }

  async validarPaginaLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/\/login/);
    await expect(this.botaoLogin).toBeVisible();
  }
}

export default LoginPage;