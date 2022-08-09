import React, { useState } from "react";
import "../index.css";
import Footer from "./Footer";
// import logo from '../images/logo.svg'
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";

function App() {

  
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);

  // при клике на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // состояния открытия
  const handleEditProfileClick = () => {
    setEditProfilePopupOpen(true);
  };

  const handleEditAvatarClick = () => {
    setEditAvatarPopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setAddPlacePopupOpen(true);
  };

  // состояния закрытия
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="page">
      <Header />
      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      <ImagePopup
        name="big-image"
        isOpen={!!isSelectedCard} // если есть карта, то isOpen == true
        card={isSelectedCard}
        onClose={closeAllPopups}
      />
      <PopupWithForm
        title="Редактировать профиль"
        name="edit-profile"
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <fieldset className="popup__inputs">
          <input
            type="text"
            id="name-input"
            name="name"
            placeholder="Имя"
            className="popup__inputs-item popup__inputs-item_type_name"
            required
            minLength={2}
            maxLength="40"
          />
          <span className="name-input-error popup__inputs-error"></span>
          <input
            type="text"
            id="description-input"
            name="description"
            placeholder="Профессиональная деятельность"
            className="popup__inputs-item popup__inputs-item_type_description"
            required
            minLength="2"
            maxLength="200"
          />
          <span className="description-input-error popup__inputs-error"></span>
        </fieldset>
      </PopupWithForm>
      <PopupWithForm
        title="Новое место"
        name="create-card"
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
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
      <PopupWithForm
        title="Вы уверены?"
        name="delete-card"
        isOpen={false}
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      <PopupWithForm
        title="Обновить аватар"
        name="change-avatar"
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
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
