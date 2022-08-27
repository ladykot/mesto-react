import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({card, onCardClick}) {
  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner._id === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'card__delete-button_visible' : 'card__delete-button_hidden'}`
  ); 

    // обработчик клика по карточке для просмотра изображения
    function handleImageClick() {
        onCardClick(card);
      }  

    return (
        <div className="cards__item" onClick={handleImageClick}>
          <img className="cards__item-pic hover" src={card.link}/>
          <button
            type="button"
            className={cardDeleteButtonClassName}
            aria-label="корзина"
          ></button>
          <div className="cards__item-group">
            <h2 className="cards__title">{card.name}</h2>
            <button
              type="button"
              className="cards__union"
              aria-label="лайк"
            ></button>
            <span className="cards__button-counter">{card.likes.length}</span>
          </div>
        </div>
    )
}

export default Card;