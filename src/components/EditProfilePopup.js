import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function EditProfilePopup({ title, nameBlok, isOpen, onClose }) {
  
    const [nameUser, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDescription =(e) => {
        setDescription(e.target.value);
    }

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]); 


  return (
    <section
      className={`popup popup_type_${nameBlok} ${isOpen ? "popup_opened" : ""}`}
      // закрытие по оверлею
      onClick={onClose}
    >
      <div
        className={`popup__container popup__container_${nameBlok}`}
        onClick={(e) => {
          e.stopPropagation(); // Прекращает дальнейшую передачу текущего события.
        }}
      >
        <button
          onClick={onClose}
          type="button"
          className="popup__button-close popup__button-close_type_edit hover"
        ></button>
        <form name={nameBlok} className="popup__form" noValidate>
          <h3 className="popup__title">{title}</h3>
          <fieldset className="popup__inputs">
            <input
              type="text"
              id="name-input"
              name="name"
              onChange={handleChangeName}
              value={nameUser}
              placeholder="Имя"
              className="popup__inputs-item popup__inputs-item_type_name"
              required
              minLength={2}
              maxLength="40"
            />
            <span className="name-input-error popup__inputs-error"></span>
            <input
              type="text"
              id="description-input"
              name="description"
              onChange={handleChangeDescription}
              value={description}
              placeholder="Профессиональная деятельность"
              className="popup__inputs-item popup__inputs-item_type_description"
              required
              minLength="2"
              maxLength="200"
            />
            <span className="description-input-error popup__inputs-error"></span>
          </fieldset>
          <button
            type="submit"
            className="popup__button-save"
            aria-label="Сохранить"
          >
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}



export default EditProfilePopup;
