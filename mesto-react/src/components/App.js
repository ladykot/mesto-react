import React from 'react';
import '../index.css';
import Footer from './Footer';
// import logo from '../images/logo.svg'
import Header from './Header';

function App() {
  return (
    <div className="App">
      <div className="page">
        <Header />
        
        <main className="content">
          <section className="profile">
              <div className="profile__avatar">
                <img className="profile__pic" src=" " alt="фото профиля"/>
                <img className="profile__icon" src="<%=require('./images/Vector.svg')%>"/>
              </div>
              <div className="profile__info">
                <h1 className="profile__name"></h1>
                <button type="button" className="profile__edit-button hover" aria-label="Редактировать"></button>
                <p className="profile__description"></p>
              </div>
            <button type="button" className="profile__add-button hover" aria-label="Добавить"></button>
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

        <section className="popup popup_type_edit-profile">
          <div className="popup__container popup__container_edit-profile">
            <button type="button" className="popup__button-close popup__button-close_type_edit hover"></button>
            <form name="edit-profile" className="popup__form" novalidate>
              <h3 className="popup__title">Редактировать профиль</h3>
              <fieldset className="popup__inputs">
                <input type="text" id="name-input" name="name" placeholder="Имя" className="popup__inputs-item popup__inputs-item_type_name" 
                  required 
                  minlength="2" maxlength="40"/>
                <span className="name-input-error popup__inputs-error"></span>
                <input type="text" id="description-input" name="description" placeholder="Профессиональная деятельность" className="popup__inputs-item popup__inputs-item_type_description" required minlength="2" maxlength="200"/>
                <span className="description-input-error popup__inputs-error"></span>
              </fieldset>
              <button type="submit" className="popup__button-save" aria-label="Сохранить">Сохранить</button>
            </form>
          </div>
        </section>

        <section className="popup popup_type_create-card">
          <div className="popup__container popup__container_create-card">
            <button type="button" className="popup__button-close popup__button-close_type_create hover"></button>
            <form name="create-card" className="popup__form" novalidate>
              <h3 className="popup__title">Новое место</h3>
              <fieldset className="popup__inputs">
                <input type="text" id="title-input" name="name" placeholder="Название" className="popup__inputs-item popup__inputs-item_type_title" required minlength="2" maxlength="30"/>
                <span className="title-input-error popup__inputs-error"></span>
                <input type="url" id="link-input" name="link" placeholder="Ссылка на картинку" className="popup__inputs-item popup__inputs-item_type_link" required/>
                <span className="popup__inputs-error link-input-error"></span>
              </fieldset>
              <button type="submit" className="popup__button-save" aria-label="Создать">Создать</button>
            </form>
          </div>
        </section>

        <section className="popup popup_type_big-image popup_dark ">
          <div className="popup__container popup__container_big-image">
            <button type="button" className="popup__button-close popup__button-close_type_big-foto hover"></button>
            <img className="popup__big-foto" src="https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg" alt="случайное фото"/>
            <p className="popup__title-big-image">Новое место</p>
          </div>
        </section>

        <section className="popup popup_type_delete-card">
          <div className="popup__container">
            <button type="button" className="popup__button-close hover"></button>
              <form name="delete-card" className="popup__form" >
                <h3 className="popup__title"> Вы уверены?</h3>
                <fieldset className="popup__inputs">
                </fieldset>
                <button type="submit" className="popup__button-save" aria-label="Удалить">Да</button>
              </form>
          </div>
        </section>
        
        <section className="popup popup_type_change-avatar">
          <div className="popup__container">
            <button type="button" className="popup__button-close hover"></button>
              <form name="change-avatar" className="popup__form" >
                <h3 className="popup__title"> Обновить аватар</h3>
                <fieldset className="popup__inputs">
                  <input type="url" id="link-input-avatar" name="link" placeholder="Ссылка на картинку" className="popup__inputs-item popup__inputs-item_type_link" required/>
                  <span className="popup__inputs-error link-input-avatar-error"></span>
                </fieldset>
                <button type="submit" className="popup__button-save" aria-label="Удалить">Сохранить</button>
              </form>
          </div>
        </section>

      <Footer />
      </div>
    </div>
  );
};

export default App;
