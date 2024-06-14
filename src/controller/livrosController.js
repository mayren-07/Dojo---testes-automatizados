import livros from "../model/Livro.js";

export class LivroController {
  static listarLivros = (req, res) => {
    return {
      status: 200,
      data: livros,
    };
  };

  static listarLivroPorId = (req, res) => {
    const id = parseInt(req.params.id);
    const livroEncontrado = livros.find((livro) => livro.id === id);

    if (livroEncontrado) {
      return {
        status: 200,
        data: livroEncontrado,
      };
    }

    return {
      status: 404,
      data: "Livro não encontrado",
    };
  };

  static cadastrarLivro = (req, res) => {
    const novoLivro = req.body.livro;
    novoLivro.id = livros.length + 1;
    livros.push(novoLivro);

    return {
      status: 201,
      data: novoLivro,
    };
  };

  static atualizarLivro = (req, res) => {
    const id = parseInt(req.params.id);
    const livroAtualizado = req.body;
    livroAtualizado.id = id
    const livroIndex = livros.findIndex((livro) => livro.id === id);

    if (livroIndex !== -1) {
      livros[livroIndex] = livroAtualizado;
      return {
        status: 200,
        message: "Livro atualizado com sucesso",
      };
    }

    return {
      status: 404,
      message: "Livro não encontrado",
    };
  };

  static excluirLivro = (req, res) => {
    const id = parseInt(req.params.id);
    const livroIndex = livros.findIndex((livro) => livro.id === id);

    if (livroIndex !== -1) {
      livros.splice(livroIndex, 1);
      return {
        status: 200,
        message: "Livro removido com sucesso",
      };
    }

    return {
      status: 404,
      message: "Livro não encontrado",
    };
  };

  static listarLivroPorEditora = (req, res) => {
    const editora = req.query.editora;
    const livrosPorEditora = livros.filter((livro) => livro.editora === editora);

    if (livrosPorEditora.length > 0) {
      return {
        status: 200,
        livros: livrosPorEditora,
      };
    }

    return {
      status: 404,
      message: "Não há nenhum livro com essa editora",
    };
  };
}
