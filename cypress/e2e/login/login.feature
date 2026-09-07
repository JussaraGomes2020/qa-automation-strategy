Feature: Login

  Background:
    Given que acesso a página de login

  Scenario: Login realizado com sucesso
    When preencho o campo email com um usuário válido
    And preencho o campo senha com uma senha válida
    And clico em conectar-se
    Then o sistema deverá autenticar o usuário
    And deverá exibir a identificação do usuário autenticado

  Scenario: Login com senha inválida
    When preencho o campo email com um usuário válido
    And preencho o campo senha com uma senha inválida
    And clico em conectar-se
    Then o sistema deverá impedir o acesso
    And deverá exibir a mensagem Seu e-mail ou senha estão incorretos! 

  Scenario: Login com e-mail não cadastrado
    When preencho o campo email com um e-mail não cadastrado
    And preencho o campo senha com uma senha válida
    And clico em conectar-se
    Then o sistema deverá impedir o acesso
    And deverá exibir a mensagem Seu e-mail ou senha estão incorretos!

  Scenario: Login sem informar o e-mail
    When não preencho o campo email
    And preencho o campo senha com uma senha válida
    And clico em conectar-se
    Then o sistema deverá identificar o campo email como obrigatório
    And o acesso não deverá ser realizado

  Scenario: Login sem informar a senha
    When preencho o campo email com um usuário válido
    And não preencho o campo senha
    And clico em conectar-se
    Then o sistema deverá identificar o campo senha como obrigatório
    And deverá exibir a mensagem Preencha este campo.
    And o acesso não deverá ser realizado

  Scenario: Login com e-mail em formato inválido
    When preencho o campo email com um formato inválido
    And preencho o campo senha com uma senha válida
    And clico em conectar-se
    Then o sistema deverá impedir o envio do formulário
    And o campo email deverá ser identificado como inválido
    And deverá exibir a mensagem Inclua um @ no endereço de e-mail "sara.gomes30.sggmail.com" está com um @ faltando.

Scenario: Logout do usuário autenticado
    Given que estou autenticado
    When clico em sair
    Then o sistema deverá encerrar a sessão
    And deverá retornar para a página de login