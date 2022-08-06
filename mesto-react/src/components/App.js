import React, { useState } from "react";
import "../index.css";
import Footer from "./Footer";
// import logo from '../images/logo.svg'
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";


function App() {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  // меняем состояние
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
      />
      <Footer />
      <ImagePopup />
      <PopupWithForm title="Редактировать профиль" name="edit-profile" isOpen={isEditProfilePopupOpen}>
        <fieldset className="popup__inputs">
          <input
            type="text"
            id="name-input"
            name="name"
            placeholder="Имя"
            className="popup__inputs-item popup__inputs-item_type_name"
            required
            minlength="2"
            maxlength="40"
          />
          <span className="name-input-error popup__inputs-error"></span>
          <input
            type="text"
            id="description-input"
            name="description"
            placeholder="Профессиональная деятельность"
            className="popup__inputs-item popup__inputs-item_type_description"
            required
            minlength="2"
            maxlength="200"
          />
          <span className="description-input-error popup__inputs-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="create-card" isOpen={isAddPlacePopupOpen}>
        {/* <fieldset className="popup__inputs"> */}
          <input
            type="text"
            id="title-input"
            name="name"
            placeholder="Название"
            className="popup__inputs-item popup__inputs-item_type_title"
            required
            minlength="2"
            maxlength="30"
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
        {/* </fieldset> */}
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="delete-card" isOpen={false}>
        {/* <fieldset className="popup__inputs"></fieldset> */}
      </PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="change-avatar" isOpen={isEditAvatarPopupOpen}>
        {/* <fieldset className="popup__inputs"> */}
          <input
            type="url"
            id="link-input-avatar"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__inputs-item popup__inputs-item_type_link"
            required
          />
          <span className="popup__inputs-error link-input-avatar-error"></span>
        {/* </fieldset> */}
      </PopupWithForm>
    </div>
  );
}

export default App;
