describe('API - Remover Usuário', () => {

  it('API 9 - deve rejeitar método DELETE no endpoint de verificação de login', () => {

    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/verifyLogin',
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(200);

      const body = JSON.parse(response.body);

      expect(body.responseCode).to.eq(405);
      expect(body.message).to.eq('This request method is not supported.');

    });

  });


  it('API 12 - deve excluir uma conta de usuário', () => {

    const email = `qa_delete_${Date.now()}@gmail.com`;
    const senha = 'Senha@123';

    // Preparação da massa: cria uma conta temporária
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'QA Delete',
        email: email,
        password: senha,
        title: 'Sr.',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1990',
        firstname: 'QA',
        lastname: 'Delete',
        company: 'QA Company',
        address1: 'Rua Teste, 100',
        address2: '',
        country: 'Canada',
        zipcode: '01000-000',
        state: 'SP',
        city: 'Sao Paulo',
        mobile_number: '11999999999'
      }
    }).then((createResponse) => {

      expect(createResponse.status).to.eq(200);

      const createBody = JSON.parse(createResponse.body);

      expect(createBody.responseCode).to.eq(201);
      expect(createBody.message).to.eq('User created!');

      // Execução: exclui a conta criada
      cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        form: true,
        body: {
          email: email,
          password: senha
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

        const body = JSON.parse(response.body);

        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('Account deleted!');

      });

    });

  });

});