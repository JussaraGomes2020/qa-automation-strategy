describe('API - Atualizar Usuário', () => {

  it('API 13 - deve atualizar uma conta de usuário', () => {

    const email = `qa_update_${Date.now()}@gmail.com`;
    const senha = 'Senha@123';

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'QA Update',
        email: email,
        password: senha,
        title: 'Sr.',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1990',
        firstname: 'QA',
        lastname: 'Update',
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

      cy.request({
        method: 'PUT',
        url: 'https://automationexercise.com/api/updateAccount',
        form: true,
        failOnStatusCode: false,
        body: {
          name: 'QA Updated',
          email: email,
          password: senha,
          title: 'Sr.',
          birth_date: '02',
          birth_month: '02',
          birth_year: '1991',
          firstname: 'QA Updated',
          lastname: 'Automation',
          company: 'Updated Company',
          address1: 'Rua Atualizada, 200',
          address2: '',
          country: 'Canada',
          zipcode: '02000-000',
          state: 'SP',
          city: 'Sao Paulo',
          mobile_number: '11888888888'
        }
      }).then((response) => {

        expect(response.status).to.eq(200);

        const body = JSON.parse(response.body);

        expect(body.responseCode).to.eq(200);
        expect(body.message).to.eq('User updated!');

      });

    });

  });

});