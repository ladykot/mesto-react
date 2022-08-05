import React from "react";

function ImagePopup() {
  return (
    <section className="popup popup_type_big-image popup_dark ">
      <div className="popup__container popup__container_big-image">
        <button
          type="button"
          className="popup__button-close popup__button-close_type_big-foto hover"
        ></button>
        <img
          className="popup__big-foto"
          src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
          alt="случайное фото"
        />
        <p className="popup__title-big-image">Новое место</p>
      </div>
    </section>
  );
}

export default ImagePopup;
