import { useEffect, useState } from "react"
import { PopupWithForm } from "../PopupWithForm/PopupWithForm"

function AddPlacePopup ({ isOpen, onClose, onAddCard }) {

  // стейт значений инпутов
  const [inputsValues, setInputsValues] = useState({})

  // обработчик значений инпутов
  function handleInputChange (evt) {
    setInputsValues({...inputsValues, [evt.target.name]: evt.target.value})
  }

  // установка значений в инпуты формы
  useEffect(() => {
    setInputsValues({})
  }, [isOpen]);

  // отправка формы добавления новой карточки
  function handleSubmit (evt) {
    evt.preventDefault()
    onAddCard(inputsValues)
  }

  return (
    <PopupWithForm 
      name="add-new-card" 
      title="Новое место"
      isOpen={ isOpen }
      onClose={ onClose } 
      onSubmit={ handleSubmit }
    >
      <input
        className="popup__input popup__input_card_name"
        placeholder="Название места"
        type="text"
        name="cardName"
        id="cardName"
        minLength={2}
        maxLength={30}
        required
        value={ inputsValues.cardName || '' }
        onChange={ handleInputChange }
      />
      <span className="popup__error" id="cardName-error" />
      <input
        className="popup__input popup__input_card_link"
        placeholder="Ссылка на изображение"
        type="url"
        name="cardLink"
        id="cardLink"
        required
        value={ inputsValues.cardLink || '' }
        onChange={ handleInputChange }
      />
      <span className="popup__error" id="cardLink-error" />
    </PopupWithForm>
  )
}

export { AddPlacePopup }