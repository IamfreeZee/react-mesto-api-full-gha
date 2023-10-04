import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";
import { PopupWithForm } from "../PopupWithForm/PopupWithForm.jsx";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  
  // подписка на контекст текущего пользователя
  const currentUser = useContext(CurrentUserContext);

  // стейт значений инпутов
  const [inputsValues, setInputsValues] = useState({});

  // установка значений в инпуты формы
  useEffect(() => {
    setInputsValues({
      userName: currentUser.name,
      userCaption: currentUser.about,
    });
  }, [currentUser, isOpen]);

  // обработчик значений инпутов
  function handleInputChange(evt) {
    setInputsValues({ ...inputsValues, [evt.target.name]: evt.target.value });
  }

  // отправка формы с инфой юзера
  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(inputsValues);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_user_name"
        placeholder="Ваше имя"
        type="text"
        name="userName"
        id="userName"
        minLength={2}
        maxLength={40}
        required
        value={inputsValues.userName || ""}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="userName-error" />
      <input
        className="popup__input popup__input_user_caption"
        placeholder="О себе"
        type="text"
        name="userCaption"
        id="userCaption"
        minLength={2}
        maxLength={200}
        required
        value={inputsValues.userCaption || ""}
        onChange={handleInputChange}
      />
      <span className="popup__error" id="userCaption-error" />
    </PopupWithForm>
  );
}

export { EditProfilePopup };
