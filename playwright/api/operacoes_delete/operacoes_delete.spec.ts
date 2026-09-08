import { test, expect } from '@playwright/test';
import { gerarEmail } from '../../fixtures/data/UsuarioFactory';

test.describe('API - Operações de DELETE', () => {

  test('DELETE-01 - API 9 - deve rejeitar método DELETE no endpoint de verificação de login', async ({ request }) => {

    const response = await request.delete(
      'https://automationexercise.com/api/verifyLogin'
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(405);
    expect(body.message).toBe('This request method is not supported.');
  });


  test('DELETE-02 - API 12 - deve excluir uma conta de usuário', async ({ request }) => {

    const email = gerarEmail();
    const senha = 'Senha@123';

    try {

      // 1. Criar usuário para pré-condição
      const createResponse = await request.post(
        'https://automationexercise.com/api/createAccount',
        {
          form: {
            name: 'QA Delete',
            email,
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
        }
      );

      expect(createResponse.status()).toBe(200);

      const createBody = await createResponse.json();

      expect(createBody.responseCode).toBe(201);
      expect(createBody.message).toBe('User created!');


      // 2. Excluir usuário
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

    } finally {

      // A conta já deve ter sido excluída.
      // O bloco permanece apenas como proteção caso a execução
      // falhe antes da operação de DELETE.
    }

  });

});