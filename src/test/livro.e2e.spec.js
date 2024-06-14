import { describe, it, expect } from "vitest";
import { LivroController } from "../controller/livrosController";
import livros from "../model/Livro";

describe("Testes para LivroController", () => {
  
  it("Deve retornar uma lista de livros", () => {
    const resultado = LivroController.listarLivros({}, {});

    expect(resultado.status).toBe(200);
    expect(resultado.data).toHaveLength(livros.length);
  });

  it('Deve retornar o livro pelo id', () => {
    const idDoLivro = livros[0].id;
    const req = {
      params: {
        id: idDoLivro
      }
    }

    const result = LivroController.listarLivroPorId(req, {});
    
    const livroEsperado = livros.find(livro => livro.id === parseInt(idDoLivro));

    expect(result.status).toBe(200);
    expect(result.data).toEqual(livroEsperado);
    expect(result.data.id).toBeTypeOf('number');
  });

  it('Deve retornar erro se o id não existir', () => {
    const idInexistente = livros.length+1;
    const req = {
      params: {
        id: idInexistente
      }
    }

    const result = LivroController.listarLivroPorId(req, {});

    expect(result.status).toBe(404);
    expect(result.data).toBe("Livro não encontrado");
  });

  it('Deve cadastrar um novo livro', () => {
    const novoLivro = {
      titulo: 'O amor não é óbvio',
      autor: 'Elayne Baeta',
      editora: 'Galera',
      numeroPaginas: 480
    };

    const req = {
      body: {
        livro: novoLivro
      }
    }

    const result = LivroController.cadastrarLivro(req, {});

    expect(result.status).toBe(201);
    expect(result.data).toEqual(novoLivro);

    const livroRegistrado = livros.find((livro) => livro.id === result.data.id);
    expect(livroRegistrado.id).toBeGreaterThan(0)

  });

  it('Deve atualizar um livro existente', () => {
    const idDoLivro = livros[2].id;
    const req = {
      params: { id: idDoLivro },
      body: {  
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        editora: "Editora Rocco",
        numeroPaginas: 302,
      }
    };

    const result = LivroController.atualizarLivro(req, {});

    expect(result.status).toBe(200);
    expect(result.message).toBe('Livro atualizado com sucesso');

    expect(livros[2].numeroPaginas).toBe(req.body.numeroPaginas)
  });

  it('Deve retornar erro se o livro não existir ao tentar atualizar', () => {
    const idInexistente = livros.length+1;
    const req = {
      params: { id: idInexistente },
      body: {  
        titulo: "Harry Potter e a Pedra Filosofal",
        autor: "J.K. Rowling",
        editora: "Editora Rocco",
        numeroPaginas: 303,
      }
    };

    const result = LivroController.atualizarLivro(req, {});

    expect(result.status).toBe(404);
    expect(result.message).toBe('Livro não encontrado');
  });

  it('Deve excluir um livro existente', () => {
    const idDoLivro = livros[4].id;
    const req = {
      params: { id: idDoLivro }
    };

    const result = LivroController.excluirLivro(req, {});

    expect(result.status).toBe(200);
    expect(result.message).toBe('Livro removido com sucesso');

    const livroDeletado = livros.find((livro) => livro.id === idDoLivro);
    expect(livroDeletado).not.toBeDefined()
  });

  it('Deve retornar erro se o livro não existir ao tentar excluir', () => {
    const idInexistente = 20;
    const req = {
      params: { id: idInexistente }
    };

    const result = LivroController.excluirLivro(req, {});

    expect(result.status).toBe(404);
    expect(result.message).toBe('Livro não encontrado');
  });

  it('Deve listar livros por editora existente', () => {
    const editoraExistente = livros[0].editora
    const req = {
      query: { editora: editoraExistente }
    };

    const result = LivroController.listarLivroPorEditora(req, {});

    expect(result.status).toBe(200);
    expect(result.livros).toHaveLength(2)
  });

  it('Deve retornar erro 404 se não houver livros com a editora especificada', () => {
    const editoraInexistente = 'Editora Inexistente';
    const req = {
      query: { editora: editoraInexistente }
    };

    const result = LivroController.listarLivroPorEditora(req, {});

    expect(result.status).toBe(404);
    expect(result.message).toBe('Não há nenhum livro com essa editora');
  });

});
