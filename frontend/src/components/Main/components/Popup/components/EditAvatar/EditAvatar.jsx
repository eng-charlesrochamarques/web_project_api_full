import { useContext, useState } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";
export default function EditAvatar() {
  const { handleUpdateAvatar, isSavingAvatar } = useContext(CurrentUserContext);
  const [avatar, setAvatar] = useState("");
  const [avatarError, setAvatarError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateAvatar({
      avatar,
    });
  }
  function handleAvatarChange(e) {
    setAvatar(e.target.value);
    setAvatarError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }
  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        type="url"
        className="popup__input"
        placeholder="Link da imagem"
        required
        value={avatar}
        onChange={handleAvatarChange}
      />

      <span className="popup__input-error">{avatarError}</span>

      <button
        type="submit"
        className={`button popup__button ${!isFormValid ? "popup__button_disabled" : ""}`}
        disabled={!isFormValid}
      >
        {isSavingAvatar ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
