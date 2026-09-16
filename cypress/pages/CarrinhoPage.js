import { URLS } from "../utils/constantes";

class CarrinhoPage {
  // Seletores

  botaoCheckout = "a.check_out";

  tabelaCarrinho = ".cart_info";

  descricaoProduto = ".cart_description";

  precoProduto = ".cart_price";

  quantidadeProduto = ".cart_quantity button";

  botaoRemoverProduto = ".cart_quantity_delete";

  // Navegação

  acessarCarrinho() {
    cy.visit(URLS.CARRINHO);
  }

  // Ações

  clicarEmProceedToCheckout() {
    cy.get(this.botaoCheckout).should("be.visible").click();
  }

  limparCarrinho() {
    this.acessarCarrinho();

    cy.get("body").then(($body) => {
      if ($body.find(this.botaoRemoverProduto).length > 0) {
        cy.get(this.botaoRemoverProduto).each(($botao) => {
          cy.wrap($botao).click();
        });
      }
    });
  }

  // Validações

  validarCarrinho() {
    cy.get(this.tabelaCarrinho).should("be.visible");
  }

  validarProduto(produto) {
    cy.get(this.descricaoProduto).should("contain.text", produto);
  }

  validarPrecoProduto() {
    cy.get(this.precoProduto)
      .should("be.visible")
      .invoke("text")
      .should("not.be.empty");
  }

  validarQuantidadeProduto(quantidade) {
    cy.get(this.quantidadeProduto).should("have.text", quantidade);
  }
}

export default new CarrinhoPage();
