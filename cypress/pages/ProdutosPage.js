import { URLS } from "../utils/constantes";

class ProdutosPage {
  acessarTelaProdutos() {
    cy.visit(URLS.PRODUTOS);
  }

  adicionarProdutoAoCarrinho(produto) {
    cy.contains(".productinfo p", produto)
      .parents(".product-image-wrapper")
      .trigger("mouseover");

    cy.contains(".productinfo p", produto)
      .parents(".product-image-wrapper")
      .contains("Add to cart")
      .click();

    cy.contains("Continue Shopping").click();
  }
}

export default new ProdutosPage();
