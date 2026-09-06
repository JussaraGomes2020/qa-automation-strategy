import { expect } from '@playwright/test';

class CadastroUsuarioPage {

  constructor(page) {
    this.page = page;

    // Seletores

    this.menuLogin = page.locator('a[href="/login"]');

    this.campoNomeCadastro = page.locator('[data-qa="signup-name"]');
    this.campoEmailCadastro = page.locator('[data-qa="signup-email"]');
    this.botaoSignup = page.locator('[data-qa="signup-button"]');

    this.radioMr = page.locator('#id_gender1');
    this.radioMrs = page.locator('#id_gender2');

    this.campoNome = page.locator('[data-qa="name"]');
    this.campoEmail = page.locator('[data-qa="email"]');
    this.campoSenha = page.locator('[data-qa="password"]');

    this.comboDia = page.locator('[data-qa="days"]');
    this.comboMes = page.locator('[data-qa="months"]');
    this.comboAno = page.locator('[data-qa="years"]');

    this.checkNewsletter = page.locator('#newsletter');
    this.checkOfertas = page.locator('#optin');

    this.campoPrimeiroNome = page.locator('[data-qa="first_name"]');
    this.campoUltimoNome = page.locator('[data-qa="last_name"]');
    this.campoEmpresa = page.locator('[data-qa="company"]');

    this.campoEndereco = page.locator('[data-qa="address"]');
    this.comboPais = page.locator('[data-qa="country"]');
    this.campoEstado = page.locator('[data-qa="state"]');
    this.campoCidade = page.locator('[data-qa="city"]');
    this.campoCep = page.locator('[data-qa="zipcode"]');
    this.campoTelefone = page.locator('[data-qa="mobile_number"]');

    this.botaoCreateAccount = page.locator('[data-qa="create-account"]');
    this.botaoContinue = page.locator('[data-qa="continue-button"]');

    // Mensagens

    this.tituloTelaCadastro = page.getByText('Enter Account Information');

    this.mensagemContaCriada = page.getByText('Account Created!');

    this.mensagemSucessoCadastro = page.getByText(
      'Congratulations! Your new account has been successfully created!'
    );
  }

  // Navegação

  async acessarTelaCadastro() {
    await this.page.goto('/login');
  }

  async clicarMenuLogin() {
    await this.menuLogin.click();
  }

  // Cadastro inicial

  async informarNomeCadastro(nome) {
    await this.campoNomeCadastro.fill(nome);
  }

  async informarEmailCadastro(email) {
    await this.campoEmailCadastro.fill(email);
  }

  async clicarBotaoSignup() {
    await this.botaoSignup.click();
  }

  async iniciarCadastro(nome, email) {
    await this.informarNomeCadastro(nome);
    await this.informarEmailCadastro(email);
  }

  // Dados da conta

  async selecionarTratamento(tratamento) {

    const tratamentos = {
      Mr: this.radioMr,
      Mrs: this.radioMrs
    };

    await tratamentos[tratamento].check();
  }

  async validarNome(nome) {
    await expect(this.campoNome).toHaveValue(nome);
  }

  async validarEmail(email) {
    await expect(this.campoEmail).toHaveValue(email);
  }

  async informarSenha(senha) {
    await this.campoSenha.fill(senha);
  }

  async informarDataNascimento(data) {

    const [dia, mes, ano] = data.split('/');

    await this.comboDia.selectOption(dia);
    await this.comboMes.selectOption(String(Number(mes) - 1));
    await this.comboAno.selectOption(ano);
  }

  async marcarNewsletter(receberNewsletter) {

    if (receberNewsletter) {
      await this.checkNewsletter.check();
    }
  }

  async marcarOfertasEspeciais(receberOfertas) {

    if (receberOfertas) {
      await this.checkOfertas.check();
    }
  }

  async informarDadosPessoais(dados) {

    await this.campoPrimeiroNome.fill(dados.primeiroNome);

    await this.campoUltimoNome.fill(dados.ultimoNome);

    await this.campoEmpresa.fill(dados.empresa);
  }

  async informarEndereco(endereco) {

    await this.campoEndereco.fill(endereco.logradouro);

    await this.comboPais.selectOption(endereco.pais);

    await this.campoEstado.fill(endereco.estado);

    await this.campoCidade.fill(endereco.cidade);

    await this.campoCep.fill(endereco.cep);
  }

  async informarTelefone(telefone) {
    await this.campoTelefone.fill(telefone);
  }

  async clicarCreateAccount() {
    await this.botaoCreateAccount.click();
  }

  // Validações

  async validarTelaLoginCadastro() {

    await expect(this.page).toHaveURL(/\/login/);

    await expect(this.page.locator('.login-form')).toBeVisible();
    await expect(this.page.locator('.signup-form')).toBeVisible();
    await expect(this.campoNomeCadastro).toBeVisible();
    await expect(this.campoEmailCadastro).toBeVisible();
  }

  async validarTelaCriacaoConta() {

    await expect(this.page).toHaveURL(/\/signup/);

    await expect(this.tituloTelaCadastro).toBeVisible();
    await expect(this.campoSenha).toBeVisible();
  }

  async validarContaCriada() {

    await expect(this.page).toHaveURL(/\/account_created/);

    await expect(this.mensagemContaCriada).toBeVisible();
    await expect(this.mensagemSucessoCadastro).toBeVisible();
    await expect(this.botaoContinue).toBeVisible();
  }
}

export default CadastroUsuarioPage;