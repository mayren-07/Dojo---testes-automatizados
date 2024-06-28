# **Teste de Software com Express e CRUD de Livros**

Este projeto demonstra um sistema simples de gerenciamento de livros usando Express.js, com operações CRUD (Create, Read, Update, Delete). O banco de dados é simulado usando um array de livros.

## Funcionalidades Implementadas

- **Listar Livros**: Retorna todos os livros cadastrados.
- **Buscar Livro por ID**: Retorna um livro específico com base no ID fornecido.
- **Cadastrar Livro**: Adiciona um novo livro à lista.
- **Atualizar Livro**: Atualiza os dados de um livro existente com base no ID.
- **Excluir Livro**: Remove um livro da lista com base no ID.
- **Listar Livros por Editora**: Retorna todos os livros de uma editora específica.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **Modelo de Dados**: O arquivo `Livro.js` define a estrutura dos livros e contém o array que simula o banco de dados.
- **Controladores**: `LivroController.js` define os métodos para cada operação CRUD e utiliza o array de livros para realizar as operações.
- **Rotas**: As rotas estão definidas no arquivo `routes.js`, utilizando o Express Router para mapear as URLs para os métodos correspondentes no `LivroController`.
- **Testes**
  - **Testes Unitários**: Verificam o comportamento dos métodos do controlador isoladamente usando mocks para simular o comportamento do banco de dados.
  - **Testes End-to-End (E2E)**: Testam a API como um todo, simulando requisições HTTP e verificando as respostas.

## Ferramentas e Tecnologias Utilizadas

- **Express.js**: Framework web para Node.js usado para construir a API RESTful.
- **Vitest**: Framework de testes utilizada para criar e executar testes unitários e E2E.

## Conclusão

Este projeto não só exemplifica a implementação de um CRUD simples com Express, mas também destaca a importância dos testes de software para garantir a qualidade e confiabilidade de sistemas complexos. Investir em um processo de teste adequado desde as fases iniciais do desenvolvimento é crucial para o sucesso a longo prazo de qualquer projeto de software.

Para se aprofundar mais acesse: [Teoria dos Testes de Software](./conteudo.md).
