import React from "react";
import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    // const [link, setLink] = useState('');
    const avatar = React.useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateAvatar(avatar.current.value); // получаем значение из рефа
      }

    return (
        <PopupWithForm
          title="Обновить аватар"
          name="change-avatar"
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
        >
          <input
            type="url"
            id="link-input-avatar"
            name="link"
            ref={avatar}
            // onChange={handleChangevatar}
            placeholder="Ссылка на картинку"
            className="popup__inputs-item popup__inputs-item_type_link"
            required
          />
          <span className="popup__inputs-error link-input-avatar-error"></span>
        </PopupWithForm>
        )
}

export default EditAvatarPopup;