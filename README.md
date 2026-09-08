QA Automation Strategy — Cypress x Playwright

Sobre o projeto

POC de estratégia de automação de testes Web e API que compara Cypress e Playwright a partir de uma implementação equivalente dos principais cenários de Login.

O projeto começou como um desafio técnico em Cypress e evoluiu para uma avaliação prática de diferentes abordagens de automação, considerando:

- Arquitetura
- Manutenção
- Execução
- Debugging
- Paralelismo
- CI/CD

Para manter a comparação controlada, os principais cenários de Login foram implementados nas duas ferramentas:

- Login realizado com sucesso
- Login inválido

A POC não busca definir uma ferramenta universalmente superior. O objetivo é produzir evidências e analisar as diferenças e vantagens de cada abordagem, apoiando uma decisão técnica baseada no contexto do projeto e do time.

Relatórios

Execução local

Playwright
- npm ci
- npx playwright test
- npx playwright show-report

Cypress
- npm ci
- npm test

Relatório:
cypress/reports/

GitHub Actions
Os relatórios e evidências das execuções de CI/CD são disponibilizados como Artifacts na execução correspondente.

Autora:
Jussara Gomes

Profissional de Qualidade de Software (QA), com experiência em testes manuais e automatizados.

Nota Ética:
Durante o desenvolvimento utilizei o ChatGPT como apoio para pesquisa, revisão de código e discussão de alternativas de implementação.

A implementação final foi revisada, adaptada e validada por mim de acordo com o comportamento esperado da aplicação.