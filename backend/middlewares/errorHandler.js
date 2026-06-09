module.exports = (err, req, res, next) => {
  let { statusCode = 500 } = err;
  let { message } = err;

  if (err.name === "ValidationError") {
    statusCode = 400;
    message = "Dados inválidos";
  }

  if (err.name === "CastError") {
    statusCode = 400;
    message = "ID inválido";
  }

  if (err.name === "DocumentNotFoundError") {
    statusCode = 404;
    message = "Recurso não encontrado";
  }

  if (err.code === 11000) {
    statusCode = 409;
    message = "Este e-mail já está cadastrado";
  }

  res.status(statusCode).send({
    message: statusCode === 500 ? "Ocorreu um erro no servidor" : message,
  });
};
