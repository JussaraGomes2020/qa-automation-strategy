class CheckoutPage {
  // Seletores

  enderecoEntrega = "#address_delivery";

  itensEnderecoEntrega = "#address_delivery li";

  descricaoProduto = ".cart_description";

  precoProduto = ".cart_price";

  quantidadeProduto = ".cart_quantity";

  totalCompra = ".cart_total";

  // Validações

  validarAcessoCheckout() {
    cy.url().should("include", "/checkout");

    cy.get(this.enderecoEntrega).should("be.visible");
  }

  prosseguirPagamento() {
    cy.get(this.enderecoEntrega).should("be.visible");
  }

  validarDadosEntrega() {
    cy.get(this.enderecoEntrega).should("be.visible");

    cy.get(this.itensEnderecoEntrega).should("have.length.greaterThan", 5);

    cy.get(this.enderecoEntrega).should("contain.text", "Mrs.");
  }

  validarProdutoCarrinho(produto) {
    cy.get(this.descricaoProduto).should("contain.text", produto);

    cy.get(`${this.descricaoProduto} a`).should("not.be.empty");
  }

  validarResumoCompra(preco, quantidade, total) {
    cy.get(this.precoProduto).should("be.visible").and("contain.text", preco);

    cy.get(this.quantidadeProduto)
      .should("be.visible")
      .and("contain.text", quantidade);

    cy.get(this.totalCompra).should("be.visible").and("contain.text", total);
  }
}

export default new CheckoutPage();
