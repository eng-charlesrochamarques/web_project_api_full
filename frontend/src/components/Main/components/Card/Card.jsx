export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { name, link } = card;
  const isLiked = card.isLiked;
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card);
  }
  return (
    <li className="card">
      <img
        className="card__image"
        src={link}
        alt={name}
        onClick={() => onCardClick(card)}
      />

      <button
        className="card__delete-button"
        type="button"
        onClick={handleDeleteClick}
      ></button>

      <div className="card__description">
        <h2 className="card__title">{name}</h2>

        <button
          type="button"
          className={`card__like-button ${
            isLiked ? "card__like-button_is-active" : ""
          }`}
          onClick={handleLikeClick}
        ></button>
      </div>
    </li>
  );
}
