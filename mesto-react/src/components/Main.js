import React, { useState } from "react";
import api from "../utils/Api";
import Card from "./Card";

function Main({
  // пропсы не должны меняться в компоненте, для изменений используются переменные состояния
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
}) {
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userDescription, setUserDescription] = useState(null);
  const [cards, setCards] = useState([]);

  // получаем данные с сервера и ставим в профиль
  api.getProfileData().then((data) => {
    setUserName(data.name);
    setUserAvatar(data.avatar);
    setUserDescription(data.about);
  });

  api.getInitialCards().then((data) => {
    setCards(data);
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__avatar">
          <img className="profile__pic" src={userAvatar} alt="фото профиля" />
          <img
            onClick={onEditAvatar}
            className="profile__icon"
            src="<%=require('./images/Vector.svg')%> "
            alt=""
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button hover"
            aria-label="Редактировать"
          ></button>
          <p className="profile__description">{userDescription}</p>
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
          <Card card={card} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
