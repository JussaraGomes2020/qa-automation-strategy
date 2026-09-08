import { test, expect } from '@playwright/test';
import loginData from '../../fixtures/login/login.json';

test.describe('API - Login', () => {

  test('API 7 - deve verificar login com dados válidos', async ({ request }) => {

    const response = await request.post(
      'https://automationexercise.com/api/verifyLogin',
      {
        form: {
          email: loginData.usuarioValido.email,
          password: loginData.usuarioValido.senha,
        },
      }
    );

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe('User exists!');
  });

  test('API 8 - deve impedir login sem informar o e-mail', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/verifyLogin',
    {
      form: {
        password: loginData.usuarioValido.senha,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(400);
  expect(body.message).toBe(
    'Bad request, email or password parameter is missing in POST request.'
  );
});

test('API 10 - deve impedir login com usuário não cadastrado', async ({ request }) => {

  const response = await request.post(
    'https://automationexercise.com/api/verifyLogin',
    {
      form: {
        email: loginData.emailNaoCadastrado,
        password: loginData.usuarioValido.senha,
      },
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(404);
  expect(body.message).toBe('User not found!');
});

});