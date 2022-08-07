import React, { useState } from "react";
import api from "../utils/Api";

function Main({
  // пропсы не должны менятся в компоненте, для изменений используются переменные состояния
  onEditProfile,
  onAddPlace,
  onEditAvatar,
}) {
  const [userName, setUserName] = useState(null);
  const [userAvatar, setUserAvatar] = useState(null);
  const [userDescription, setUserDescription] = useState(null);

  api.getProfileData().then((data) => {
    console.log(data)
    setUserName(data.name);
    setUserAvatar(data.avatar);
    setUserDescription(data.about);
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

      <template id="template-card">
        <div className="cards__item">
          <img className="cards__item-pic hover" />
          <button
            type="button"
            className="cards__item-delete"
            aria-label="корзина"
          ></button>
          <div className="cards__item-group">
            <h2 className="cards__title"></h2>
            <button
              type="button"
              className="cards__union"
              aria-label="лайк"
            ></button>
            <span className="cards__button-counter"></span>
          </div>
        </div>
      </template>

      <section className="cards"></section>
    </main>
  );
}

export default Main;
