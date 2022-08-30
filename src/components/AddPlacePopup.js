import React from "react";
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup ({isOpen, onClose}) {
    return (
        <PopupWithForm
          title="Новое место"
          name="create-card"
          isOpen={isOpen}
          onClose={onClose}
        >
          <input
            type="text"
            id="title-input"
            name="name"
            placeholder="Название"
            className="popup__inputs-item popup__inputs-item_type_title"
            required
            minLength="2"
            maxLength="30"
          />
          <span className="title-input-error popup__inputs-error"></span>
          <input
            type="url"
            id="link-input"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__inputs-item popup__inputs-item_type_link"
            required
          />
          <span className="popup__inputs-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup