describe('API - Login', () => {

  it('API 7 - deve verificar login com dados válidos', () => {

    cy.fixture('login/login').then((loginData) => {

      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/verifyLogin',
        form: true,
        body: {
          email: loginData.usuarioValido.email,
          password: loginData.usuarioValido.senha
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

        const body = JSON.parse(response.body);

        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('User exists!');

      });

    });

  });


  it('API 10 - deve impedir login com usuário não cadastrado', () => {

    cy.fixture('login/login').then((loginData) => {

      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/verifyLogin',
        form: true,
        failOnStatusCode: false,
        body: {
          email: loginData.emailNaoCadastrado,
          password: loginData.usuarioValido.senha
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

        const body = JSON.parse(response.body);

        expect(body.responseCode).to.eq(404);
        expect(body.message).to.eq('User not found!');

      });

    });

  });


  it('API 8 - Deve impedir login sem informar o e-mail', () => {

    cy.fixture('login/login').then((loginData) => {

      cy.request({
        method: 'POST',
        url: 'https://automationexercise.com/api/verifyLogin',
        form: true,
        failOnStatusCode: false,
        body: {
          password: loginData.usuarioValido.senha
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

        const body = JSON.parse(response.body);

        expect(body.responseCode).to.eq(400);

        expect(body.message).to.eq(
          'Bad request, email or password parameter is missing in POST request.'
        );

      });

    });

  });


 
});