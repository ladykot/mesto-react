import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((like) => like._id === currentUser._id);


  // обработчик клика по карточке для просмотра изображения
  function handleImageClick() {
    onCardClick(card);
  }

  // обработчик клика на Сердечко
  function handleLikeClick() {
    onCardLike(card);
  }

  // обработчик клика на Корзину
  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <div className="cards__item">
      <img
        className="cards__item-pic hover"
        src={card.link}
        onClick={handleImageClick}
      />
      {isOwn && (
        <button
          type="button"
          className="cards__item-delete"
          aria-label="корзина"
          onClick={handleDeleteClick}
        ></button>
      )}

      <div className="cards__item-group">
        <h2 className="cards__title">{card.name}</h2>
        <button
          type="button"
          className={`cards__union ${isLiked && "cards__union_active"}`}
          aria-label="лайк"
          onClick={() => {
            handleLikeClick();
          }}
        ></button>
        <span className="cards__button-counter">{card.likes.length}</span>
      </div>
    </div>
  );
}

export default Card;
