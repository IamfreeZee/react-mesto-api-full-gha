
function ImagePopup ({ name, card, isOpen, onClose }) {
  return (
    <div className={`popup popup-zoom-image popup_type_${ name } ${ isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container popup__container_zoomed">
        <button className="popup__button-close" type="button" onClick={ onClose }/>
        <figure className="popup-zoom-image__image-container">
          <img className="popup-zoom-image__image" src={ card.link } alt={ card.name } />
          <figcaption className="popup-zoom-image__image-caption">{ card.name }</figcaption>
        </figure>
      </div>
    </div>
  )
}

export { ImagePopup }