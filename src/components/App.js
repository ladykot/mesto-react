import React, { useState } from "react";
import "../index.css";
import Footer from "./Footer";
// import logo from '../images/logo.svg'
import Header from "./Header";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
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

  // обработка лайка
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

  // добавление новых данных в профиле
  const handelUpdateUser = ({name, about}) => {
    api.editProfileData(name, about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // добавление нового аватара
  const handleUpdateAvatar = (avatar) => {
    console.log(avatar)
    api.changeAvatar(avatar)
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
        <AddPlacePopup
          title="Новое место"
          name="create-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
        </AddPlacePopup>
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={false}
          onClose={closeAllPopups}
        ></PopupWithForm>
        <EditAvatarPopup
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
        >
        </EditAvatarPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
