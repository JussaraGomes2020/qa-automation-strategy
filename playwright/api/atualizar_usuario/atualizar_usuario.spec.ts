import { test, expect } from '@playwright/test';
import { gerarEmail } from '../../fixtures/data/UsuarioFactory';

test.describe('API - Atualizar Usuário', () => {

  test('API 13 - deve atualizar os dados de uma conta de usuário', async ({ request }) => {

    const email = gerarEmail();
    const senha = 'Senha@123';

    try {

      // 1. Criar usuário para pré-condição
      const createResponse = await request.post(
        'https://automationexercise.com/api/createAccount',
        {
          form: {
            name: 'QA Automation',
            email,
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
        }
      );

      expect(createResponse.status()).toBe(200);

      const createBody = await createResponse.json();

      expect(createBody.responseCode).toBe(201);
      expect(createBody.message).toBe('User created!');


      // 2. Atualizar usuário
      const updateResponse = await request.put(
        'https://automationexercise.com/api/updateAccount',
        {
          form: {
            name: 'QA Automation Atualizado',
            email,
            password: senha,
            title: 'Sr.',
            birth_date: '02',
            birth_month: '02',
            birth_year: '1991',
            firstname: 'QA Atualizado',
            lastname: 'Automation',
            company: 'QA Company Updated',
            address1: 'Rua Atualizada, 200',
            address2: '',
            country: 'Canada',
            zipcode: '02000-000',
            state: 'SP',
            city: 'Sao Paulo',
            mobile_number: '11888888888'
          }
        }
      );

      expect(updateResponse.status()).toBe(200);

      const updateBody = await updateResponse.json();

      expect(updateBody.responseCode).toBe(200);
      expect(updateBody.message).toBe('User updated!');


      // 3. Consultar usuário e validar a persistência da atualização
      const getResponse = await request.get(
        'https://automationexercise.com/api/getUserDetailByEmail',
        {
          params: {
            email
          }
        }
      );

      expect(getResponse.status()).toBe(200);

      const getBody = await getResponse.json();

      expect(getBody.responseCode).toBe(200);

      expect(getBody.user.name).toBe('QA Automation Atualizado');
      expect(getBody.user.email).toBe(email);
      expect(getBody.user.first_name).toBe('QA Atualizado');
      expect(getBody.user.last_name).toBe('Automation');
      expect(getBody.user.company).toBe('QA Company Updated');
      expect(getBody.user.address1).toBe('Rua Atualizada, 200');
      expect(getBody.user.zipcode).toBe('02000-000');


    } finally {

      // 4. Excluir usuário criado para o teste
      const deleteResponse = await request.delete(
        'https://automationexercise.com/api/deleteAccount',
        {
          form: {
            email,
            password: senha
          }
        }
      );

      expect(deleteResponse.status()).toBe(200);

      const deleteBody = await deleteResponse.json();

      expect(deleteBody.responseCode).toBe(200);
      expect(deleteBody.message).toBe('Account deleted!');
    }

  });

});