import { test } from '@playwright/test';
import CadastroUsuarioPage from '../pages/CadastroUsuarioPage';
import { gerarEmail } from '../fixtures/data/UsuarioFactory';

const cadastroData = require('../fixtures/cadastro_usuario/cadastro_usuario.json');

test.describe('Cadastro de usuário', () => {

  test.beforeEach(async ({ page }) => {
    const cadastroUsuarioPage = new CadastroUsuarioPage(page);

    await cadastroUsuarioPage.acessarTelaCadastro();
  });

  test('Acessar a tela de Login e Cadastro', async ({ page }) => {
    const cadastroUsuarioPage = new CadastroUsuarioPage(page);

    await cadastroUsuarioPage.validarTelaLoginCadastro();
  });

  test('Iniciar o cadastro de um novo usuário', async ({ page }) => {
    const cadastroUsuarioPage = new CadastroUsuarioPage(page);

    const usuario = {
      ...cadastroData.usuario,
      email: gerarEmail()
    };

    await cadastroUsuarioPage.iniciarCadastro(
      usuario.nome,
      usuario.email
    );

    await cadastroUsuarioPage.clicarBotaoSignup();

    await cadastroUsuarioPage.validarTelaCriacaoConta();
  });

  test('Cadastrar um novo usuário com sucesso', async ({ page }) => {
    const cadastroUsuarioPage = new CadastroUsuarioPage(page);

    const usuario = {
      ...cadastroData.usuario,
      email: gerarEmail()
    };

    await cadastroUsuarioPage.iniciarCadastro(
      usuario.nome,
      usuario.email
    );

    await cadastroUsuarioPage.clicarBotaoSignup();

    await cadastroUsuarioPage.validarTelaCriacaoConta();

    await cadastroUsuarioPage.selecionarTratamento(
      usuario.tratamento
    );

    await cadastroUsuarioPage.validarNome(
      usuario.nome
    );

    await cadastroUsuarioPage.validarEmail(
      usuario.email
    );

    await cadastroUsuarioPage.informarSenha(
      usuario.senha
    );

    await cadastroUsuarioPage.informarDataNascimento(
      `${usuario.dataNascimento.dia}/${usuario.dataNascimento.mes}/${usuario.dataNascimento.ano}`
    );

    await cadastroUsuarioPage.marcarNewsletter(
      usuario.newsletter
    );

    await cadastroUsuarioPage.marcarOfertasEspeciais(
      usuario.ofertasEspeciais
    );

    await cadastroUsuarioPage.informarDadosPessoais(
      usuario.dadosPessoais
    );

    await cadastroUsuarioPage.informarEndereco(
      usuario.endereco
    );

    await cadastroUsuarioPage.informarTelefone(
      usuario.telefone
    );

    await cadastroUsuarioPage.clicarCreateAccount();

    await cadastroUsuarioPage.validarContaCriada();
  });

});