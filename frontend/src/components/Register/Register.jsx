import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/register.css";

function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    onRegister(email, password);
  }

  return (
    <div className="register">
      <h2>Cadastrar</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Inscrever-se</button>
      </form>

      <p className="register__signin">
        Já é um membro?{" "}
        <Link to="/signin" className="register__link">
          Faça o login aqui
        </Link>
      </p>
    </div>
  );
}

export default Register;
