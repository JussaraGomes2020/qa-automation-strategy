describe('API - Cadastrar Usuário', () => {

  it('API 11 - deve criar uma conta de usuário', () => {

    const email = `qa_${Date.now()}@gmail.com`;

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'QA Automation',
        email: email,
        password: 'Senha@123',
        title: 'Sr.',
        birth_date: '01',
        birth_month: '01',
        birth_year: '1990',
        firstname: 'QA',
        lastname: 'Automation',
        company: 'QA Company',
        address1: 'Rua Teste, 100',
        address2: '',
        country: 'Canada',
        zipcode: '01000-000',
        state: 'SP',
        city: 'Sao Paulo',
        mobile_number: '11999999999'
      }
    }).then((response) => {

      expect(response.status).to.eq(200);

      const body = JSON.parse(response.body);

      expect(body.responseCode).to.eq(201);
      expect(body.message).to.eq('User created!');

    });

  });

});