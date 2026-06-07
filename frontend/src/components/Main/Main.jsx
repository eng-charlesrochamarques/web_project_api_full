import { useContext } from "react";
import ConfirmDelete from "./components/Popup/components/ConfirmDelete/ConfirmDelete";
import Card from "./components/Card/Card";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import avatar from "../../images/avatar.jpg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
export default function Main({
  popup,
  onOpenPopup,
  onClosePopup,
  cards,
  onCardLike,
  onCardDelete,
  onAddPlaceSubmit,
  isAddingCard,
  onConfirmDelete,
  isDeletingCard,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  // 🔹 DEFINIÇÕES DOS POPUPS
  const newCardPopup = {
    type: "new-card",
    title: "Novo local",
  };

  const editProfilePopup = {
    type: "edit-profile",
    title: "Editar perfil",
  };

  const editAvatarPopup = {
    type: "edit-avatar",
    title: "Alterar foto",
  };

  const confirmDeletePopup = {
    type: "confirm-delete",
    title: "Tem certeza?",
  };
  function handleImageClick(card) {
    onOpenPopup({
      type: "image",
      title: null,
      card,
    });
  }

  return (
    <main className="content">
      <section className="profile page__section">
        <div className="profile__image-container">
          <img
            className="profile__image"
            src={currentUser?.avatar || avatar}
            alt={currentUser?.name || "Avatar"}
          />
          <button
            className="profile__image-edit"
            type="button"
            onClick={() => onOpenPopup(editAvatarPopup)}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__title">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            onClick={() => onOpenPopup(editProfilePopup)}
          ></button>
          <p className="profile__description">{currentUser.about}</p>
        </div>

        <button
          className="profile__add-button"
          type="button"
          onClick={() => onOpenPopup(newCardPopup)}
        ></button>
      </section>

      <section className="cards page__section">
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleImageClick}
              onCardLike={onCardLike}
              onCardDelete={(card) => {
                onCardDelete(card);
                onOpenPopup(confirmDeletePopup);
              }}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={onClosePopup} title={popup.title}>
          {popup.type === "new-card" && (
            <NewCard
              onAddPlaceSubmit={onAddPlaceSubmit}
              isLoading={isAddingCard}
            />
          )}

          {popup.type === "edit-profile" && <EditProfile />}

          {popup.type === "edit-avatar" && <EditAvatar />}

          {popup.type === "image" && <ImagePopup card={popup.card} />}

          {popup.type === "confirm-delete" && (
            <ConfirmDelete
              onConfirm={onConfirmDelete}
              isLoading={isDeletingCard}
            />
          )}
        </Popup>
      )}
    </main>
  );
}
