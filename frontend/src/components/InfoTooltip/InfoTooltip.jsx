import successIcon from "../../assets/success.png";
import failIcon from "../../assets/fail.png";
import "../../blocks/info-tooltip.css";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  return (
    <div className={`info-tooltip ${isOpen ? "info-tooltip_opened" : ""}`}>
      <div className="info-tooltip__container">
        <button
          className="info-tooltip__close"
          type="button"
          onClick={onClose}
        />

        <img
          className="info-tooltip__icon"
          src={isSuccess ? successIcon : failIcon}
          alt={isSuccess ? "Sucesso" : "Erro"}
        />

        <h2 className="info-tooltip__title">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
