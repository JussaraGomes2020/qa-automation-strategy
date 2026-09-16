import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import CadastroUsuarioPage from "../../pages/CadastroUsuarioPage";
import { gerarEmail } from "../../fixtures/data/UsuarioFactory";

let usuario;

beforeEach(() => {
  cy.fixture("cadastro_usuario/cadastro_usuario").then((fixture) => {
    usuario = {
      ...fixture.usuario,
      email: gerarEmail(),
    };
  });
});

//
// Background
//

Given("que acesso a página de Login e Cadastro", () => {
  CadastroUsuarioPage.acessarTelaCadastro();
});

//
// Cenário 1
//

Then("devo visualizar a tela de Login e Cadastro", () => {
  CadastroUsuarioPage.validarTelaLoginCadastro();
});

//
// Cenário 2
//

When("informo os dados iniciais do cadastro", () => {
  CadastroUsuarioPage.iniciarCadastro(usuario.nome, usuario.email);
});

When("clico no botão Signup", () => {
  CadastroUsuarioPage.clicarBotaoSignup();
});

Then("devo visualizar a tela de criação da conta", () => {
  CadastroUsuarioPage.validarTelaCriacaoConta();
});

//
// Cenário 3
//

When("inicio um novo cadastro", () => {
  CadastroUsuarioPage.iniciarCadastro(usuario.nome, usuario.email);

  CadastroUsuarioPage.clicarBotaoSignup();
});

When("preencho os dados da conta", () => {
  CadastroUsuarioPage.selecionarTratamento(usuario.tratamento);

  CadastroUsuarioPage.validarNome(usuario.nome);

  CadastroUsuarioPage.validarEmail(usuario.email);

  CadastroUsuarioPage.informarSenha(usuario.senha);

  CadastroUsuarioPage.informarDataNascimento(
    `${usuario.dataNascimento.dia}/${usuario.dataNascimento.mes}/${usuario.dataNascimento.ano}`
  );

  CadastroUsuarioPage.marcarNewsletter(usuario.newsletter);

  CadastroUsuarioPage.marcarOfertasEspeciais(usuario.ofertasEspeciais);

  CadastroUsuarioPage.informarDadosPessoais(usuario.dadosPessoais);

  CadastroUsuarioPage.informarEndereco(usuario.endereco);

  CadastroUsuarioPage.informarTelefone(usuario.telefone);
});

When("clico em Create Account", () => {
  CadastroUsuarioPage.clicarCreateAccount();
});

Then("a conta deverá ser criada com sucesso", () => {
  CadastroUsuarioPage.validarContaCriada();
});
