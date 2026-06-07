import { Link } from "react-router-dom";
import { useState } from "react";
import "../../blocks/login.css";
function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <div className="login">
      <h2>Entrar</h2>

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

        <button type="submit">Entrar</button>
      </form>

      <p className="login__signup">
        Ainda não é membro?{" "}
        <Link to="/signup" className="login__link">
          Inscreva-se aqui!
        </Link>
      </p>
    </div>
  );
}

export default Login;
