import React, { useState } from "react";
import "../index.css";
import Footer from "./Footer";
// import logo from '../images/logo.svg'
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [removedCard, setRemovedCard] = useState([]);

  const [currentUser, setCurrentUser] = useState({}); // текущий пользователь
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([api.getInitialCards(), api.getProfileData()])
      .then(([cards, data]) => {
        setCards(cards);
        setCurrentUser(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // при клике на карточку
  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // удаление карточки и обновление блока с карточками
  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => console.log(err));
  }

  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards(cards.map((c) => (c._id === res._id ? res : c)));
    })
    .catch((err) => console.log(err));
  }

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

  const handelUpdateUser = ({name, about}) => {
    api.editProfileData(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        />
        <Footer />
        <ImagePopup
          name="big-image"
          isOpen={!!isSelectedCard} // если есть карта, то isOpen == true
          card={isSelectedCard}
          onClose={closeAllPopups}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handelUpdateUser}
        >
        </EditProfilePopup>
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
        ></PopupWithForm>
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
    </CurrentUserContext.Provider>
  );
}

export default App;
