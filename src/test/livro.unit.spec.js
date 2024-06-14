import { describe, it, expect, vi } from 'vitest';
import { LivroController } from '../controller/livrosController';
import livros from "../model/Livro.js";

vi.mock('./model/Livro', () => {
  const livros = vi.fn(() => ({
    findIndex: vi.fn()
  }))
  return { livros }
})

describe('LivroController - Testes Unitários', () => {

  it('deve atualizar um livro existente', () => {
   const findIndexSpy = vi.spyOn(livros, 'findIndex').mockReturnValueOnce(1)
  
    const req = {
      params: { id: '1' },
      body: { id: '1', titulo: 'Novo Título', autor: 'Novo Autor', editora: 'Editora A', numeroPaginas: 401 }
    };

    const res = LivroController.atualizarLivro(req);

    expect(res.status).toBe(200);
    expect(res.message).toBe('Livro atualizado com sucesso');
    expect(findIndexSpy).toHaveBeenCalledOnce();
    expect(findIndexSpy).toHaveReturned(1)
  });

  it('deve retornar erro se tentar atualizar um livro inexistente', () => {
    const findIndexSpy = vi.spyOn(livros, 'findIndex').mockReturnValueOnce(-1)


    const req = {
      params: { id: '7' },
      body: { titulo: 'Novo Título' }
    };

    const res = LivroController.atualizarLivro(req);

    expect(res.status).toBe(404);
    expect(res.message).toBe('Livro não encontrado');
    expect(findIndexSpy).toHaveBeenCalledOnce();
  });

  it('deve retornar a lista de livros', () => {
    const req = {};
    const res = LivroController.listarLivros(req);

    expect(res.status).toBe(200);
    expect(res.data).toHaveLength(livros.length);
  });
});


