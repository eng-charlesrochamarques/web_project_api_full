import { useState, useContext, useEffect } from "react";
import CurrentUserContext from "../../../../../../contexts/CurrentUserContext";
export default function EditProfile() {
  const { currentUser, handleUpdateUser, isSavingProfile } =
    useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
    setNameError("");
    setDescriptionError("");
    setIsFormValid(true);
  }, [currentUser]);

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
    setDescriptionError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }
  function handleSubmit(e) {
    e.preventDefault();

    handleUpdateUser({
      name: name,
      about: description,
    });
  }
  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <input
        className="popup__input"
        placeholder="Nome"
        type="text"
        required
        minLength="2"
        maxLength="40"
        value={name}
        onChange={handleNameChange}
      />
      <span className="popup__input-error">{nameError}</span>

      <input
        className="popup__input"
        placeholder="Sobre mim"
        type="text"
        required
        minLength="2"
        maxLength="200"
        value={description}
        onChange={handleDescriptionChange}
      />
      <span className="popup__input-error">{descriptionError}</span>

      <button
        className={`button popup__button ${!isFormValid ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={!isFormValid}
      >
        {isSavingProfile ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
