import React from "react";

function PopupWithForm({ title, name, children, isOpen, onClose }) {
  // если переменная isOpen == true , то ставим класс 'popup_opened'
  return (
    <section
      className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}
      // закрытие по оверлею
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_${name}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close popup__button-close_type_edit hover"
        ></button>
        <form name={name} className="popup__form" noValidate>
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__inputs">{children}</fieldset>
          <button
            type="submit"
            className="popup__button-save"
            aria-label="Сохранить"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
