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
  const [isPopupWithSubmitOpen, setPopupWithSubmitOpen] = useState(false);
  const [isSelectedCard, setSelectedCard] = useState(null);
  const [removedCard, setRemovedCard] = useState({});

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
  function handleCardDelete(e) {
    e.preventDefault();
    api
      .deleteCard(removedCard._id)
      .then((res) => {
        setCards((state) => state.filter((item) => item._id !== removedCard._id));
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // обработка лайка
  function handleCardLike(card, isLiked) {
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((res) => {
        setCards(state => state.map(c => (c._id === res._id ? res : c)));
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

  const handleCardDeleteClick = (card) => {
    setRemovedCard(card);
    setPopupWithSubmitOpen(true);
  }

  // состояния закрытия
  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard(null);
    setPopupWithSubmitOpen(false);
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
    api.changeAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  // добавление новой карточки на сервер
  const handleAddPlaceSubmit = ({name, link}) => {
    api.addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
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
          onCardDelete={handleCardDelete}
          onCardLike={handleCardLike}
          onCardDeleteClick={handleCardDeleteClick} // открыли попап подтверждения
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
          title="Редактировать профиль"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handelUpdateUser}
          buttonText="Сохранить"
        >
        </EditProfilePopup>
        <AddPlacePopup
          title="Новое место"
          name="create-card"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          buttonText="Сохранить"
        >
        </AddPlacePopup>
        <PopupWithForm
          title="Вы уверены?"
          name="delete-card"
          isOpen={isPopupWithSubmitOpen}
          onClose={closeAllPopups}
          buttonText="Да"
          onSubmit={handleCardDelete}
        ></PopupWithForm>
        <EditAvatarPopup
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isEditAvatarPopupOpen}
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          buttonText="Сохранить"
        >
        </EditAvatarPopup>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
