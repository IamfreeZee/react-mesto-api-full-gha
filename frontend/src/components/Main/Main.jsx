import { useContext } from "react"
import { Card } from "../Card/Card.jsx";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.jsx";

function Main ({ onEditProfile, onAddNewCard, onEditAvatar, onCardClick, onDeleteCard, onCardLike, cards, setDeletedCard }) {

  // подписка на контекст текущего пользователя
  const currentUser = useContext(CurrentUserContext)

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar" type="button" onClick={ onEditAvatar } style={{backgroundImage: `url(${ currentUser.avatar })`}}/>
        <div className="profile__info">
          <div className="profile__text-area">
            <h1 className="profile__user-name">{ currentUser.name }</h1>
            <p className="profile__user-caption">{ currentUser.about }</p>
          </div>
          <button className="profile__button-edit" type="button" onClick={ onEditProfile }/>
        </div>
        <button className="profile__button-add" type="button" onClick={ onAddNewCard }/>
      </section>
      <section className="cards" aria-label="Карточки">
        <ul className="cards__list">
          {cards.map((cardData) => {return (
            <Card 
              key={ cardData._id } 
              cardData={ cardData } 
              onCardClick={ onCardClick } 
              onDeleteCard={ onDeleteCard } 
              onCardLike={ onCardLike }
              setDeletedCard={ setDeletedCard }
            />)})}
        </ul>
      </section>
    </main>
  )
}

export { Main }
