import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/footer";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import * as auth from "../utils/auth";
import InfoTooltip from "./InfoTooltip/InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [popup, setPopup] = useState(null);
  const [cards, setCards] = useState([]);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingAvatar, setIsSavingAvatar] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [isDeletingCard, setIsDeletingCard] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const [infoTooltip, setInfoTooltip] = useState({
    isOpen: false,
    isSuccess: false,
    message: "",
  });
  useEffect(() => {
    if (!loggedIn) return;

    api
      .getUserInfo()
      .then((data) => {
        console.log("dados vindos da API:", data);
        setCurrentUser(data);
      })
      .catch((error) => console.error(error));

    api
      .getCardList()
      .then((data) => {
        setCards(data);
      })
      .catch((error) => console.error(error));
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) return;

    auth
      .checkToken(token)
      .then((res) => {
        setLoggedIn(true);
        setUserEmail(res.email);
        navigate("/");
      })
      .catch((err) => {
        console.error("Token inválido:", err);
        localStorage.removeItem("jwt");
        setLoggedIn(false);
      });
  }, []);
  function handleOpenPopup(popupData) {
    setPopup(popupData);
  }

  function handleClosePopup() {
    setPopup(null);
  }
  function handleUpdateUser(data) {
    console.log("[PROFILE 3] handleUpdateUser chamado", data);
    setIsSavingProfile(true);

    api
      .setUserInfo(data)
      .then((newData) => {
        console.log("[PROFILE 6] atualização concluída", newData);
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) =>
        console.error("[PROFILE ERRO] falha ao atualizar usuário", error),
      )
      .finally(() => {
        console.log("[PROFILE 7] fluxo finalizado");
        setIsSavingProfile(false);
      });
  }
  function handleUpdateAvatar(data) {
    setIsSavingAvatar(true);

    api
      .setUserAvatar(data)
      .then((newData) => {
        setCurrentUser(newData);
        handleClosePopup();
      })
      .catch((error) => console.error("erro ao atualizar avatar:", error))
      .finally(() => setIsSavingAvatar(false));
  }
  function handleCardLike(card) {
    const isLiked = card.likes.some((userId) => userId === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard,
          ),
        );
      })
      .catch((error) => console.error("erro no like:", error));
  }

  function handleCardDelete(card) {
    setCardToDelete(card);
  }
  function handleConfirmDelete() {
    if (!cardToDelete) return;

    setIsDeletingCard(true);

    api
      .deleteCard(cardToDelete._id)
      .then(() => {
        setCards((state) =>
          state.filter((currentCard) => currentCard._id !== cardToDelete._id),
        );
        setCardToDelete(null);
        handleClosePopup();
      })
      .catch((error) => console.error("erro ao deletar:", error))
      .finally(() => setIsDeletingCard(false));
  }
  function handleAddPlaceSubmit(data) {
    console.log("[CARD 3] handleAddPlaceSubmit chamado", data);
    setIsAddingCard(true);

    api
      .addCard(data)
      .then((newCard) => {
        console.log("[CARD 6] criação concluída", newCard);
        setCards((state) => [newCard, ...state]);
        handleClosePopup();
      })
      .catch((error) =>
        console.error("[CARD ERRO] falha ao adicionar card", error),
      )
      .finally(() => {
        console.log("[CARD 7] fluxo finalizado");
        setIsAddingCard(false);
      });
  }

  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);

        setLoggedIn(true);
        setUserEmail(email);

        const redirectPath = location.state?.from?.pathname || "/";
        navigate(redirectPath);
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);

        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Email ou senha incorretos.",
        });
      });
  }

  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setInfoTooltip({
          isOpen: true,
          isSuccess: true,
          message: "Vitória! Você se registrou com sucesso.",
        });

        navigate("/signin");
      })
      .catch((err) => {
        console.error("Erro ao cadastrar:", err);

        setInfoTooltip({
          isOpen: true,
          isSuccess: false,
          message: "Ops! Algo saiu errado. Tente novamente.",
        });
      });
  }
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/signin");
  }
  function handleCloseInfoTooltip() {
    setInfoTooltip({
      isOpen: false,
      isSuccess: false,
      message: "",
    });
  }
  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        isSavingProfile,
        isSavingAvatar,
      }}
    >
      <div className="page">
        <Header
          loggedIn={loggedIn}
          userEmail={userEmail}
          onLogout={handleLogout}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  popup={popup}
                  onOpenPopup={handleOpenPopup}
                  onClosePopup={handleClosePopup}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  onAddPlaceSubmit={handleAddPlaceSubmit}
                  isAddingCard={isAddingCard}
                  onConfirmDelete={handleConfirmDelete}
                  isDeletingCard={isDeletingCard}
                />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signin"
            element={
              <ProtectedRoute loggedIn={loggedIn} anonymous>
                <Login onLogin={handleLogin} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/signup"
            element={
              <ProtectedRoute loggedIn={loggedIn} anonymous>
                <Register onRegister={handleRegister} />
              </ProtectedRoute>
            }
          />

          <Route
            path="*"
            element={<Navigate to={loggedIn ? "/" : "/signin"} replace />}
          />
        </Routes>
        <InfoTooltip
          isOpen={infoTooltip.isOpen}
          isSuccess={infoTooltip.isSuccess}
          message={infoTooltip.message}
          onClose={handleCloseInfoTooltip}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
