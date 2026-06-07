import { useState } from "react";
export default function NewCard({ onAddPlaceSubmit, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameError, setNameError] = useState("");
  const [linkError, setLinkError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  console.log("isLoading NewCard:", isLoading);
  function handleSubmit(e) {
    e.preventDefault();

    onAddPlaceSubmit({
      name,
      link,
    });
  }
  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
    setLinkError(e.target.validationMessage);
    setIsFormValid(e.target.closest("form").checkValidity());
  }

  return (
    <form
      className="popup__form"
      name="card-form"
      id="new-card-form"
      noValidate
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          className="popup__input popup__input_type_card-name"
          id="place-name"
          name="name"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <span className="popup__input-error">{nameError}</span>
      </label>

      <label className="popup__field">
        <input
          className="popup__input popup__input_type_url"
          id="link"
          name="link"
          placeholder="Link de Imagem"
          required
          type="url"
          value={link}
          onChange={handleLinkChange}
        />
        <span className="popup__input-error">{linkError}</span>
      </label>

      <button
        className={`button popup__button ${!isFormValid ? "popup__button_disabled" : ""}`}
        type="submit"
        disabled={!isFormValid}
      >
        {isLoading ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
