import React, { useState } from "react";
import api from "../utils/Api";
import Card from "./Card";
import profileIcon from "../images/Vector.svg"
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  // пропсы не должны меняться в компоненте, для изменений используются переменные состояния
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  // const [userName, setUserName] = useState('');
  // const [userAvatar, setUserAvatar] = useState('');
  // const [userDescription, setUserDescription] = useState('');
  const [cards, setCards] = useState([]);

  const currentUser = React.useContext(CurrentUserContext);


  React.useEffect(() => {
    api.getInitialCards().then(
      (cards) => {
        // setUserName(data.name);
        // setUserAvatar(data.avatar);
        // setUserDescription(data.about);
        setCards(cards);
      }
    ).catch((err) => console.log(err));
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__pic" src={currentUser.avatar} alt="фото профиля" />
          <img
            onClick={onEditAvatar}
            className="profile__icon"
            src={profileIcon}
            alt=""
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button hover"
            aria-label="Редактировать"
          ></button>
          <p className="profile__description">{currentUser.description}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button hover"
          aria-label="Добавить"
        ></button>
      </section>

      <section className="cards">
        {cards.map((card) => (
          <Card card={card} onCardClick={onCardClick} key={card._id}/>
        ))}
      </section>
    </main>
  );
}

export default Main;
