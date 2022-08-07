import React from "react";

function Card({card}) {
    return (
        <div className="cards__item">
          <img className="cards__item-pic hover" src={card.link}/>
          <button
            type="button"
            className="cards__item-delete"
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