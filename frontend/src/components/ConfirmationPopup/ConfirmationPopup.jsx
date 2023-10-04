import { PopupWithForm } from "../PopupWithForm/PopupWithForm"

function ConfirmationPopup ({ isOpen, onClose, onConfirm, deletedCard }) {

  // отправка формы удаления карточки
  function handleSubmit (evt) {
    evt.preventDefault()
    onConfirm(deletedCard)
  }

  return (
    <PopupWithForm 
      name="delete-card" 
      title="Вы уверены?" 
      isOpen={ isOpen }
      onClose={ onClose }
      onSubmit={ handleSubmit }
    />
  )
}

export { ConfirmationPopup }