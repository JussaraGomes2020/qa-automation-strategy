import { test, expect } from '@playwright/test';
import { gerarEmail } from '../../fixtures/data/UsuarioFactory';

test.describe('API - Cadastrar Usuário', () => {

  test('API 11 - deve criar uma conta de usuário', async ({ request }) => {

    const email = gerarEmail();

    const response = await request.post(
      'https://automationexercise.com/api/createAccount',
      {
        form: {
          name: 'QA Automation',
          email,
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
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(201);
    expect(body.message).toBe('User created!');
  });

});