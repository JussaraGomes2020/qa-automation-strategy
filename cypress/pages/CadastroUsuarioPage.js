import BasePage from "./BasePage";

class CadastroUsuarioPage extends BasePage {
  // Seletores

  menuLogin = 'a[href="/login"]';

  campoNomeCadastro = '[data-qa="signup-name"]';
  campoEmailCadastro = '[data-qa="signup-email"]';
  botaoSignup = '[data-qa="signup-button"]';

  radioMr = "#id_gender1";
  radioMrs = "#id_gender2";

  campoNome = '[data-qa="name"]';
  campoEmail = '[data-qa="email"]';
  campoSenha = '[data-qa="password"]';

  comboDia = '[data-qa="days"]';
  comboMes = '[data-qa="months"]';
  comboAno = '[data-qa="years"]';

  checkNewsletter = "#newsletter";
  checkOfertas = "#optin";

  campoPrimeiroNome = '[data-qa="first_name"]';
  campoUltimoNome = '[data-qa="last_name"]';
  campoEmpresa = '[data-qa="company"]';

  campoEndereco = '[data-qa="address"]';
  comboPais = '[data-qa="country"]';
  campoEstado = '[data-qa="state"]';
  campoCidade = '[data-qa="city"]';
  campoCep = '[data-qa="zipcode"]';
  campoTelefone = '[data-qa="mobile_number"]';

  botaoCreateAccount = '[data-qa="create-account"]';
  botaoContinue = '[data-qa="continue-button"]';

  // Mensagens

  tituloTelaCadastro = "Enter Account Information";
  mensagemContaCriada = "Account Created!";
  mensagemSucessoCadastro =
    "Congratulations! Your new account has been successfully created!";

  // Navegação

  acessarTelaCadastro() {
    this.acessarPagina("/login");
  }

  clicarMenuLogin() {
    this.clicar(this.menuLogin);
  }

  // Cadastro inicial

  informarNomeCadastro(nome) {
    this.preencherCampo(this.campoNomeCadastro, nome);
  }

  informarEmailCadastro(email) {
    this.preencherCampo(this.campoEmailCadastro, email);
  }

  clicarBotaoSignup() {
    this.clicar(this.botaoSignup);
  }

  iniciarCadastro(nome, email) {
    this.informarNomeCadastro(nome);
    this.informarEmailCadastro(email);
  }

  // Dados da conta

  selecionarTratamento(tratamento) {
    const tratamentos = {
      Mr: this.radioMr,
      Mrs: this.radioMrs,
    };

    cy.get(tratamentos[tratamento]).check();
  }

  validarNome(nome) {
    cy.get(this.campoNome).should("have.value", nome);
  }

  validarEmail(email) {
    cy.get(this.campoEmail).should("have.value", email);
  }

  informarSenha(senha) {
    this.preencherCampo(this.campoSenha, senha);
  }

  informarDataNascimento(data) {
    const [dia, mes, ano] = data.split("/");

    cy.get(this.comboDia).select(dia);
    cy.get(this.comboMes).select(Number(mes) - 1);
    cy.get(this.comboAno).select(ano);
  }

  marcarNewsletter(receberNewsletter) {
    if (receberNewsletter) {
      cy.get(this.checkNewsletter).check();
    }
  }

  marcarOfertasEspeciais(receberOfertas) {
    if (receberOfertas) {
      cy.get(this.checkOfertas).check();
    }
  }

  informarDadosPessoais(dados) {
    this.preencherCampo(this.campoPrimeiroNome, dados.primeiroNome);

    this.preencherCampo(this.campoUltimoNome, dados.ultimoNome);

    this.preencherCampo(this.campoEmpresa, dados.empresa);
  }

  informarEndereco(endereco) {
    this.preencherCampo(this.campoEndereco, endereco.logradouro);

    cy.get(this.comboPais).select(endereco.pais);

    this.preencherCampo(this.campoEstado, endereco.estado);

    this.preencherCampo(this.campoCidade, endereco.cidade);

    this.preencherCampo(this.campoCep, endereco.cep);
  }

  informarTelefone(telefone) {
    this.preencherCampo(this.campoTelefone, telefone);
  }

  clicarCreateAccount() {
    this.clicar(this.botaoCreateAccount);
  }

  // Validações

  validarTelaLoginCadastro() {
    cy.url().should("include", "/login");

    this.validarElementoVisivel(".login-form");
    this.validarElementoVisivel(".signup-form");
    this.validarElementoVisivel(this.campoNomeCadastro);
    this.validarElementoVisivel(this.campoEmailCadastro);
  }

  validarTelaCriacaoConta() {
    cy.url().should("include", "/signup");

    this.validarTextoVisivel(this.tituloTelaCadastro);

    this.validarElementoVisivel(this.campoSenha);
  }

  validarContaCriada() {
    cy.url().should("include", "/account_created");

    this.validarTextoVisivel(this.mensagemContaCriada);

    this.validarTextoVisivel(this.mensagemSucessoCadastro);

    this.validarElementoVisivel(this.botaoContinue);
  }
}

export default new CadastroUsuarioPage();
