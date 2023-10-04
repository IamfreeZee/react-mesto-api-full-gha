import success from '../../images/succes.svg'
import error from '../../images/error.svg'

function InfoTooltip ({ name, isOpen, onClose, isSuccess }) {

  return (
    <div className={`popup popup_type_${ name } ${ isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button className="popup__button-close" type="button" onClick={ onClose } />
        <img className="popup__image" src={(isSuccess===true) ? success : error} alt="#" />
        <h2 className="popup__title">{(isSuccess===true) ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так! Попробуйте ещё раз.'}</h2>
      </div>
    </div>
  )
}

export { InfoTooltip }