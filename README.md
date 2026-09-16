# QA Automation Strategy — Cypress, Playwright e Selenium

## 1. Objetivo

Esta POC apresenta uma estratégia de automação de testes Web e API utilizando:

- Cypress
- Playwright
- Selenium + Java

O objetivo é avaliar, por meio de uma implementação prática, diferentes abordagens de automação considerando aspectos técnicos e de manutenção.

A análise considera:

- Arquitetura
- Page Object Model (POM)
- Organização e reutilização de código
- Dados e fixtures
- Testes Web e API
- Legibilidade
- Manutenção
- Execução
- Paralelismo
- Debugging
- Evidências e relatórios
- CI/CD
- Dependências do ambiente de execução

A POC não tem como objetivo definir uma ferramenta universalmente superior. A proposta é produzir evidências que apoiem uma decisão técnica considerando o contexto do projeto, a arquitetura e o perfil do time.

---

## 2. Frameworks e tecnologias

| Tecnologia | Linguagem | Aplicação |
|---|---|---|
| Cypress | JavaScript | Testes Web e API |
| Playwright | TypeScript / JavaScript | Testes Web e API |
| Selenium | Java | Testes Web |
| TestNG | Java | Execução dos testes Selenium |
| Maven | Java | Build e gerenciamento de dependências |
| Cucumber | Gherkin / JavaScript | BDD no Cypress |
| GitHub Actions | YAML | CI/CD |
| Prettier | JavaScript / TypeScript / JSON | Padronização de código |
| Spotless | Java | Padronização de código |

---

## 3. Arquitetura

A POC utiliza separação entre testes, páginas, dados e configurações.

```text
qa-automation-strategy/
│
├── cypress/
│   ├── api/
│   ├── e2e/
│   ├── fixtures/
│   ├── pages/
│   ├── support/
│   └── utils/
│
├── playwright/
│   ├── api/
│   ├── e2e/
│   ├── fixtures/
│   └── pages/
│
├── selenium-java/
│   ├── src/test/java/
│   │   ├── fixtures/
│   │   ├── login/
│   │   └── pages/
│   └── pom.xml
│
├── .github/
│   └── workflows/
│
├── playwright.config.ts
├── package.json
├── .prettierrc
└── README.md

Padrões utilizados
Page Object Model
Separação entre teste e implementação da página
Fixtures para dados de teste
Dados sensíveis desacoplados do código
Configurações centralizadas
Evidências de execução
Formatação automatizada

4. Cobertura da POC

A implementação contempla cenários de:

Testes Web
Login
Cadastro de usuário
Carrinho
Checkout
Testes de API
Login
Cadastro de usuário
Consulta de usuário
Atualização de usuário
Operações de exclusão

A implementação contempla diferentes níveis de cobertura entre os frameworks. Cypress e Playwright possuem cenários Web e API, enquanto Selenium + Java está concentrado na automação Web. A comparação considera as características observadas nas implementações realizadas.

5. Execução local
Cypress

Instalar dependências:

npm ci

Executar todos os testes Cypress:

npm run test:cypress

Executar testes Web:

npm run test:web

Executar testes de API:

npm run test:api

Abrir a interface do Cypress:

npm run cy:open

Executar e visualizar o relatório:

npm run test:cypress:report

Relatórios e evidências:

cypress/reports/
Playwright

Instalar dependências:

npm ci

Executar todos os testes:

npm run test:playwright

Visualizar o relatório:

npm run report:playwright

Os testes utilizam configuração centralizada no:

playwright.config.ts
Selenium + Java

Requisitos:

Java 21
Maven
Google Chrome

Executar os testes:

mvn -f .\selenium-java\pom.xml test

Aplicar a padronização do código Java:

mvn -f .\selenium-java\pom.xml spotless:apply

O projeto utiliza:

Selenium WebDriver
TestNG
Maven
Page Object Model
6. Padronização de código
JavaScript / TypeScript / JSON

A POC utiliza Prettier.

Formatar os arquivos Cypress e Playwright:

npm run format

Configuração:

.prettierrc
Java

A POC utiliza Spotless com Google Java Format.

Formatar o projeto Selenium:

mvn -f .\selenium-java\pom.xml spotless:apply

A formatação é integrada ao ciclo Maven do projeto.

Credenciais

As credenciais utilizadas pelos testes são fornecidas por variáveis de ambiente e não devem ser versionadas.

Copie o arquivo de exemplo:

copy .env.example .env

TEST_EMAIL=
TEST_PASSWORD=

7. CI/CD

A POC utiliza GitHub Actions para execução automatizada.

Os workflows permitem executar os testes no ambiente de CI e disponibilizar os resultados e evidências como Artifacts da execução correspondente.

As credenciais utilizadas pelos testes não devem permanecer no código-fonte.

Os dados sensíveis são fornecidos por:

variáveis de ambiente;
GitHub Secrets.
8. Observações obtidas durante a construção da POC

A implementação permitiu observar aspectos que não ficam evidentes apenas pela documentação das ferramentas.

8.1 Manutenção depende também do ambiente

Durante a execução da pipeline foram identificados problemas relacionados à configuração do ambiente, incluindo comportamento relacionado ao idioma.

A experiência mostrou que a manutenção da automação não está limitada ao código dos testes.

Também é necessário considerar:

sistema operacional;
navegador;
versões das dependências;
configurações do CI;
variáveis de ambiente;
infraestrutura de execução.
8.2 Selenium: dependência entre navegador, driver e ambiente

Durante uma execução do Selenium no CI ocorreu:

SessionNotCreatedException:
Could not start a new session.
Chrome instance exited.

O problema estava relacionado à criação da sessão do navegador no ambiente de execução.

Após ajustes na configuração de execução do Chrome, incluindo execução em modo headless e parâmetros adequados ao ambiente, os testes passaram localmente.

A principal observação foi:

A execução do Selenium exige atenção à compatibilidade e à configuração do navegador, driver e ambiente de execução, principalmente em ambientes de CI.

Observação — Selenium e CDP

Durante a execução do Selenium foi apresentada uma advertência relacionada à
compatibilidade da implementação CDP com a versão do Chrome utilizada:

"Unable to find CDP implementation matching 152"

A advertência não impediu a execução dos testes, que foram concluídos com sucesso.

8.3 Playwright: experimentação com paralelismo

Durante a avaliação do Playwright foram realizados experimentos com a configuração de workers.

Em determinado momento foi observado um comportamento de timeout após alteração da configuração.

A POC não permite afirmar que o aumento de workers tenha sido a causa do timeout.

A observação relevante foi:

A configuração de paralelismo deve ser avaliada considerando o ambiente de execução, a capacidade disponível, o comportamento da aplicação e a sincronização dos testes.

8.4 Legibilidade depende do público consumidor

A implementação também evidenciou uma diferença importante na forma de leitura dos testes.

No Cucumber, por exemplo:

Given que o usuário está autenticado
When acessa o checkout
Then devo visualizar os dados de entrega

A especificação utiliza uma linguagem mais próxima do negócio.

Essa abordagem pode facilitar a leitura por pessoas que não possuem conhecimento profundo de programação.

Já testes escritos diretamente em JavaScript, TypeScript ou Java exigem maior conhecimento técnico para interpretação e manutenção.

A observação foi:

A forma de especificação dos testes deve considerar quem irá ler, manter e utilizar essas informações.

8.5 Arquitetura influencia a manutenção

Durante a construção da POC, a separação entre:

testes;
Page Objects;
fixtures;
dados;
configurações;
utilitários;

permitiu reduzir o acoplamento entre a implementação do teste e os detalhes da aplicação.

A organização arquitetural deve ser considerada juntamente com a escolha do framework.

8.6 Segurança dos dados de teste

Durante a construção da POC foi identificada a necessidade de desacoplar credenciais do código versionado.

A estratégia adotada utiliza:

Variáveis de ambiente
GitHub Secrets

Os dados utilizados pelos testes que não são sensíveis permanecem nos fixtures.

A observação foi:

Dados sensíveis devem ser tratados como configuração de ambiente e não como parte do código-fonte dos testes.

8.7 Diagnóstico é parte da estratégia de automação

As experiências de falha durante a construção da POC demonstraram que uma automação não deve ser avaliada somente pela capacidade de executar um teste.

Também é necessário considerar:

facilidade de identificação da falha;
mensagens de erro;
evidências;
relatórios;
rastreabilidade;
reprodução local;
comportamento no CI.
9. Critérios de análise

Os frameworks foram avaliados considerando:

Critério	             Cypress	Playwright	Selenium + Java
Testes Web	              ✓	           ✓	        ✓
Testes API	              ✓	           ✓	        ✓
Page Object Model	      ✓	           ✓	        ✓
Fixtures / dados	      ✓      	   ✓	        ✓
BDD / Gherkin	          ✓      	   —	        —
Paralelismo	              ✓            ✓	        ✓
Relatórios / evidências	  ✓	           ✓	        ✓
CI/CD	                  ✓            ✓	        ✓
Padronização de código	  ✓	           ✓	        ✓

A análise deve ser interpretada considerando o contexto de utilização e as características observadas durante a implementação.

10. Conclusão

A construção da POC demonstrou que a escolha de uma solução de automação não depende exclusivamente das funcionalidades oferecidas pelo framework.

Também devem ser considerados:

perfil técnico do time;
público consumidor dos testes;
arquitetura;
facilidade de manutenção;
estratégia de dados;
infraestrutura;
navegadores e drivers;
CI/CD;
paralelismo;
evidências;
requisitos do projeto.

A POC utiliza uma abordagem baseada em evidências práticas para apoiar futuras decisões de estratégia de automação.

11. Uso de IA

Durante o desenvolvimento da POC, o ChatGPT foi utilizado como apoio para:

pesquisa;
revisão de código;
discussão de alternativas;
investigação de erros;
apoio à implementação.

As decisões de implementação foram revisadas, adaptadas e validadas pela autora de acordo com o comportamento esperado da aplicação e os objetivos da POC.

Autora

Jussara Gomes

Profissional de Qualidade de Software (QA), com experiência em testes manuais e automatizados.

