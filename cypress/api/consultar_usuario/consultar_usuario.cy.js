describe('API - Consultar Usuário', () => {

  it('API 14 - deve consultar os detalhes de uma conta de usuário por e-mail', () => {

    const email = `qa_consulta_${Date.now()}@teste.com`;
    const senha = 'Senha@123';

    // 1. Criar usuário para realizar a consulta
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      form: true,
      body: {
        name: 'QA Automation',
        email: email,
        password: senha,
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
    }).then((createResponse) => {

      expect(createResponse.status).to.eq(200);

      const createBody = JSON.parse(createResponse.body);

      expect(createBody.responseCode).to.eq(201);
      expect(createBody.message).to.eq('User created!');


      // 2. Consultar usuário pelo e-mail
      cy.request({
        method: 'GET',
        url: 'https://automationexercise.com/api/getUserDetailByEmail',
        qs: {
          email: email
        }
      }).then((getResponse) => {

        expect(getResponse.status).to.eq(200);

        const getBody = JSON.parse(getResponse.body);

        // 3. Validar retorno da consulta
        expect(getBody.responseCode).to.eq(200);
        expect(getBody.user).to.exist;

        // 4. Validar principais atributos retornados
        expect(getBody.user.email).to.eq(email);
        expect(getBody.user.name).to.eq('QA Automation');
        expect(getBody.user.first_name).to.eq('QA');
        expect(getBody.user.last_name).to.eq('Automation');
        expect(getBody.user.company).to.eq('QA Company');
        expect(getBody.user.address1).to.eq('Rua Teste, 100');
        expect(getBody.user.city).to.eq('Sao Paulo');
        expect(getBody.user.state).to.eq('SP');
        expect(getBody.user.zipcode).to.eq('01000-000');

      });


      // 5. Limpar usuário criado para o teste
      cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        form: true,
        body: {
          email: email,
          password: senha
        }
      }).then((deleteResponse) => {

        expect(deleteResponse.status).to.eq(200);

        const deleteBody = JSON.parse(deleteResponse.body);

        expect(deleteBody.responseCode).to.eq(200);
        expect(deleteBody.message).to.eq('Account deleted!');

      });

    });

  });

});