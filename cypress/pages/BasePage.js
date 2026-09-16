class BasePage {
  acessarPagina(path = "") {
    cy.visit(path);
  }

  clicar(seletor) {
    cy.get(seletor).should("be.visible").click();
  }

  preencherCampo(seletor, valor) {
    cy.get(seletor).should("be.visible").clear().type(valor);
  }

  validarElementoVisivel(seletor) {
    cy.get(seletor).should("be.visible");
  }

  validarTextoVisivel(texto) {
    cy.contains(texto).should("be.visible");
  }
}

export default BasePage;
