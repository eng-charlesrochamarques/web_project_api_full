require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const usersRouter = require("./routes/users");
const cardsRouter = require("./routes/cards");
const auth = require("./middlewares/auth");
const errorHandler = require("./middlewares/errorHandler");
const { login, createUser } = require("./controllers/users");
const { errors } = require("celebrate");
const expressWinston = require("express-winston");
const winston = require("winston");
const app = express();
const { PORT = 3000 } = process.env;

const {
  validateCreateUser,
  validateLogin,
} = require("./middlewares/validation");

mongoose
  .connect("mongodb://localhost:27017/aroundb")
  .then(() => {
    console.log("Conectado ao MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
app.use(
  expressWinston.logger({
    transports: [
      new winston.transports.File({
        filename: "logs/request.log",
      }),
    ],
    format: winston.format.json(),
  }),
);
app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("O servidor travará agora");
  }, 0);
});
app.post("/signin", validateLogin, login);
app.post("/signup", validateCreateUser, createUser);

app.use(auth);

app.use("/users", usersRouter);
app.use("/cards", cardsRouter);

app.use((req, res, next) => {
  const error = new Error("A solicitação não foi encontrada");
  error.statusCode = 404;
  next(error);
});
app.use(
  expressWinston.errorLogger({
    transports: [
      new winston.transports.File({
        filename: "logs/error.log",
      }),
    ],
    format: winston.format.json(),
  }),
);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
