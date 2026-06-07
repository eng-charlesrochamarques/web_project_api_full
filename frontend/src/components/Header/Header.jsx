import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../../images/logo.svg";

export default function Header({ loggedIn, userEmail, onLogout }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      {loggedIn && (
        <div
          className={`header__mobile-menu ${
            isMenuOpen ? "header__mobile-menu_opened" : ""
          }`}
        >
          <p className="header__email">{userEmail}</p>

          <button className="header__logout" type="button" onClick={onLogout}>
            Sair
          </button>
        </div>
      )}

      <header className="header page__section">
        <img
          alt="Logotipo Around The U.S."
          className="logo header__logo"
          src={logo}
        />

        {loggedIn ? (
          <>
            <div className="header__desktop-user">
              <p className="header__email">{userEmail}</p>

              <button
                className="header__logout"
                type="button"
                onClick={onLogout}
              >
                Sair
              </button>
            </div>

            <button
              className={`header__menu-button ${
                isMenuOpen ? "header__menu-button_close" : ""
              }`}
              type="button"
              onClick={toggleMenu}
            />
          </>
        ) : (
          <Link
            to={location.pathname === "/signup" ? "/signin" : "/signup"}
            className="header__link"
          >
            {location.pathname === "/signup" ? "Faça o login" : "Entrar"}
          </Link>
        )}
      </header>
    </>
  );
}
