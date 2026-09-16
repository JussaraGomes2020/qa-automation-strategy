import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";



import LoginPage from "../../pages/LoginPage";
import ProdutosPage from "../../pages/ProdutosPage";
import CarrinhoPage from "../../pages/CarrinhoPage";
import CheckoutPage from "../../pages/CheckoutPage";

Given("que o usuário está autenticado", () => {
  LoginPage.realizarLogin(
    Cypress.env("TEST_EMAIL"),
    Cypress.env("TEST_PASSWORD")
  );
});

Given("que possui o produto {string} no carrinho", (produto) => {
  CarrinhoPage.limparCarrinho();

  ProdutosPage.acessarTelaProdutos();

  ProdutosPage.adicionarProdutoAoCarrinho(produto);

  CarrinhoPage.acessarCarrinho();

  CarrinhoPage.validarCarrinho();
});

Given("acessa a tela de Checkout", () => {
  CarrinhoPage.clicarEmProceedToCheckout();

  CheckoutPage.validarAcessoCheckout();
});

When("prossegue para o pagamento", () => {
  CheckoutPage.prosseguirPagamento();
});

Then("devo visualizar os dados de entrega cadastrados", () => {
  CheckoutPage.validarDadosEntrega();
});

Then("devo visualizar o produto {string} adicionado ao carrinho", (produto) => {
  CheckoutPage.validarProdutoCarrinho(produto);
});

Then(
  "devo visualizar o resumo da compra com preço {string}, quantidade {int} e total {string}",
  (preco, quantidade, total) => {
    CheckoutPage.validarResumoCompra(preco, quantidade, total);
  }
);
