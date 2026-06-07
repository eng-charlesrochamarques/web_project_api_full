export default function ConfirmDelete({ onConfirm, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onConfirm();
  }

  return (
    <form className="popup__form" noValidate onSubmit={handleSubmit}>
      <button className="button popup__button" type="submit">
        {isLoading ? "Excluindo..." : "Sim"}
      </button>
    </form>
  );
}
