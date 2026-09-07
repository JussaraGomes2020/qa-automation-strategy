import BasePage from "./BasePage";

class LoginPage extends BasePage {

    // =========================
    // Seletores
    // =========================

    campoEmail = '[data-qa="login-email"]';
    campoSenha = '[data-qa="login-password"]';

    botaoLogin = '[data-qa="login-button"]';
    botaoLogout = 'a[href="/logout"]';
    botaoExcluirConta = 'a[href="/delete_account"]';


    // =========================
    // Mensagens
    // =========================

    mensagemUsuarioLogado = "Logged in as";
    mensagemLoginInvalido = "Your email or password is incorrect!";
    mensagemCampoObrigatorio = "Preencha este campo.";


    // =========================
    // Navegação
    // =========================

    acessarTelaLogin() {
        this.acessarPagina("/login");
    }


    // =========================
    // Ações
    // =========================

    informarEmail(email) {
        this.preencherCampo(this.campoEmail, email);
    }

    informarSenha(senha) {
        this.preencherCampo(this.campoSenha, senha);
    }

    limparEmail() {
        cy.get(this.campoEmail)
            .clear();
    }

    limparSenha() {
        cy.get(this.campoSenha)
            .clear();
    }

    clicarBotaoLogin() {
        this.clicar(this.botaoLogin);
    }

    clicarLogout() {
        this.clicar(this.botaoLogout);
    }

    realizarLogin(email, senha) {
        this.acessarTelaLogin();
        this.informarEmail(email);
        this.informarSenha(senha);
        this.clicarBotaoLogin();
    }


    // =========================
    // Validações - Login
    // =========================

    validarLoginRealizado() {
        this.validarElementoVisivel(this.botaoLogout);
        this.validarElementoVisivel(this.botaoExcluirConta);
    }

    validarUsuarioAutenticado() {
        this.validarTextoVisivel(this.mensagemUsuarioLogado);
    }

    validarAcessoNegado() {
        cy.url()
            .should("include", "/login");

        cy.get(this.botaoLogin)
            .should("be.visible");
    }

    validarMensagemLoginInvalido() {
        cy.contains(this.mensagemLoginInvalido)
            .should("be.visible");
    }


    // =========================
    // Validações - Campos obrigatórios
    // =========================

    validarEmailObrigatorio() {
        cy.get(this.campoEmail)
            .should("have.attr", "required");
    }

    validarSenhaObrigatoria() {
        cy.get(this.campoSenha)
            .should("have.attr", "required");
    }

    validarMensagemCampoObrigatorio() {
        cy.get(this.campoSenha)
            .then(($campo) => {
                expect($campo[0].validationMessage)
                    .to.equal(this.mensagemCampoObrigatorio);
            });
    }

    validarFormularioNaoEnviado() {
        cy.url()
            .should("include", "/login");
    }


    // =========================
    // Validações - E-mail
    // =========================

    validarEmailInvalido() {
        cy.get(this.campoEmail)
            .then(($campo) => {
                expect($campo[0].validity.valid)
                    .to.be.false;
            });
    }

    validarMensagemEmailInvalido() {
        cy.get(this.campoEmail)
            .then(($campo) => {
                const mensagemAtual = $campo[0].validationMessage;

                expect(mensagemAtual)
                    .to.contain('Inclua um "@" no endereço de e-mail.');

                expect(mensagemAtual)
                    .to.contain("jagqualityassurancegmail.com");

                expect(mensagemAtual)
                    .to.contain('está com um "@" faltando.');
            });
    }


    // =========================
    // Validações - Logout
    // =========================

    validarLogout() {
        cy.get(this.botaoLogout)
            .should("not.exist");

        cy.get(this.botaoExcluirConta)
            .should("not.exist");
    }

    validarPaginaLogin() {
        cy.url()
            .should("include", "/login");

        cy.get(this.botaoLogin)
            .should("be.visible");
    }
}

export default new LoginPage();