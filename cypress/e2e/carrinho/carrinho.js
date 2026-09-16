import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

import ProdutosPage from "../../pages/ProdutosPage";
import CarrinhoPage from "../../pages/CarrinhoPage";

Given("que estou na página de produtos", () => {
  ProdutosPage.acessarTelaProdutos();
});

When("adiciono o produto {string} ao carrinho", (produto) => {
  ProdutosPage.adicionarProdutoAoCarrinho(produto);
});

When("acesso o carrinho de compras", () => {
  CarrinhoPage.acessarCarrinho();
});

Then("devo visualizar o produto {string} no carrinho", (produto) => {
  CarrinhoPage.validarProduto(produto);
});

Then("o produto deve apresentar o preço correto", () => {
  CarrinhoPage.validarPrecoProduto();
});

Then("a quantidade do produto deve ser igual a {int}", (quantidade) => {
  CarrinhoPage.validarQuantidadeProduto(quantidade);
});
