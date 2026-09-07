import {
  Given,
  When,
  Then,
} from "@badeball/cypress-cucumber-preprocessor";

import LoginPage from "../../pages/LoginPage";

let loginData;

beforeEach(() => {
  cy.fixture("login/login").then((fixture) => {
    loginData = fixture;
  });
});


// =========================
// Given
// =========================

Given("que acesso a página de login", () => {
  LoginPage.acessarTelaLogin();
});

Given("que estou autenticado", () => {
  LoginPage.realizarLogin(
    loginData.usuarioValido.email,
    loginData.usuarioValido.senha
  );

  LoginPage.validarLoginRealizado();
});


// =========================
// When
// =========================

When("preencho o campo email com um usuário válido", () => {
  LoginPage.informarEmail(loginData.usuarioValido.email);
});

When("preencho o campo email com um e-mail não cadastrado", () => {
  LoginPage.informarEmail(loginData.emailNaoCadastrado);
});

When("preencho o campo email com um formato inválido", () => {
  LoginPage.informarEmail(loginData.emailFormatoInvalido);
});

When("preencho o campo senha com uma senha válida", () => {
  LoginPage.informarSenha(loginData.usuarioValido.senha);
});

When("preencho o campo senha com uma senha inválida", () => {
  LoginPage.informarSenha(loginData.senhaInvalida);
});

When("não preencho o campo email", () => {
  LoginPage.limparEmail();
});

When("não preencho o campo senha", () => {
  LoginPage.limparSenha();
});

When("clico em conectar-se", () => {
  LoginPage.clicarBotaoLogin();
});

When("clico em sair", () => {
  LoginPage.clicarLogout();
});


// =========================
// Then - Login
// =========================

Then("o sistema deverá autenticar o usuário", () => {
  LoginPage.validarLoginRealizado();
});

Then("deverá exibir a identificação do usuário autenticado", () => {
  LoginPage.validarUsuarioAutenticado();
});

Then("o sistema deverá impedir o acesso", () => {
  LoginPage.validarAcessoNegado();
});

Then(
  "deverá exibir a mensagem Seu e-mail ou senha estão incorretos!",
  () => {
    LoginPage.validarMensagemLoginInvalido();
  }
);


// =========================
// Then - Campos obrigatórios
// =========================

Then(
  "o sistema deverá identificar o campo email como obrigatório",
  () => {
    LoginPage.validarEmailObrigatorio();
  }
);

Then("o acesso não deverá ser realizado", () => {
  LoginPage.validarFormularioNaoEnviado();
});

Then(
  "o sistema deverá identificar o campo senha como obrigatório",
  () => {
    LoginPage.validarSenhaObrigatoria();
  }
);

Then("deverá exibir a mensagem Preencha este campo.", () => {
  LoginPage.validarMensagemCampoObrigatorio();
});


// =========================
// Then - Validação de e-mail
// =========================

Then("o sistema deverá impedir o envio do formulário", () => {
  LoginPage.validarFormularioNaoEnviado();
});

Then("o campo email deverá ser identificado como inválido", () => {
  LoginPage.validarEmailInvalido();
});

Then(
  'deverá exibir a mensagem Inclua um @ no endereço de e-mail "sara.gomes30.sggmail.com" está com um @ faltando.',
  () => {
    LoginPage.validarMensagemEmailInvalido();
  }
);


// =========================
// Then - Logout
// =========================

Then("o sistema deverá encerrar a sessão", () => {
  LoginPage.validarLogout();
});

Then("deverá retornar para a página de login", () => {
  LoginPage.validarPaginaLogin();
});

Then(
  "não deverá permitir acesso a recursos protegidos sem nova autenticação",
  () => {
    LoginPage.validarAcessoRecursoProtegido();
  }
);