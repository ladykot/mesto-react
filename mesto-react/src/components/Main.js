import React from 'react';

const handleEditProfileClick = () => {
    // проверим, что попапы открываются
    document.querySelector('.popup_type_edit-profile').classList.add('popup_opened');
}

const handleEditAvatarClick = () => {
    document.querySelector('.popup_type_change-avatar').classList.add('popup_opened');
}

const handleAddPlaceClick = () => {
    document.querySelector('.popup_type_create-card').classList.add('popup_opened');
}

function Main(props) {
    console.log(props)
    return (
    <main className="content">
          <section className="profile">
              <div className="profile__avatar">
                <img className="profile__pic" src=" " alt="фото профиля"/>
                <img onClick={handleEditAvatarClick} className="profile__icon" src="<%=require('./images/Vector.svg')%> "/>
              </div>
              <div className="profile__info">
                <h1 className="profile__name"></h1>
                <button onClick={handleEditProfileClick} type="button" className="profile__edit-button hover" aria-label="Редактировать"></button>
                <p className="profile__description"></p>
              </div>
            <button onClick={handleAddPlaceClick} type="button" className="profile__add-button hover" aria-label="Добавить"></button>
          </section>

          <template id="template-card">
            <div className="cards__item">
              <img className="cards__item-pic hover"/>
              <button type="button" className="cards__item-delete" aria-label="корзина"></button>
              <div className="cards__item-group">
                <h2 className="cards__title"></h2>
                <button type="button" className="cards__union" aria-label="лайк"></button>
                <span className="cards__button-counter"></span>
              </div>
            </div>
          </template>

          <section className="cards">
          </section>
    </main>
    )
};

export default Main;
