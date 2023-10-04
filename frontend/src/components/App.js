import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx'
import { api } from '../utils/api.js';
import { Header } from "./Header/Header.jsx";
import { Footer } from "./Footer/Footer.jsx";
import { Main } from "./Main/Main.jsx";
import { ImagePopup } from "./ImagePopup/ImagePopup.jsx";
import { EditProfilePopup } from './EditProfilePopup/EditProfilePopup.jsx';
import { EditAvatarPopup } from './EditAvatarPopup/EditAvatarPopup.jsx';
import { AddPlacePopup } from './AddPlacePopup/AddPlacePopup.jsx';
import { ConfirmationPopup } from './ConfirmationPopup/ConfirmationPopup.jsx';
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Login } from './Login/Login.jsx';
import { Register } from './Register/Register.jsx';
import { InfoTooltip } from './InfoTooltip/InfoTooltip.jsx';
import { ProtectedRoute } from './ProtectedRoute/ProtectedRoute.jsx'
import { authorization } from '../utils/authorization.js';

function App() {

  // стейты Popup'ов 
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddNewCardPopupOpen, setIsAddNewCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);

  // навигация
  const navigate = useNavigate();
  
  // стейт текущего пользователя для контекста
  const [currentUser, setCurrentUser] = useState({})
  
  // стейт изначальных карточек
  const [cards, setCards] = useState([])

  // стейт кликнутой карточки
  const [selectedCard, setSelectedCard] = useState({})

  // стейт для удаления карточки
  const [deletedCard, setDeletedCard] = useState({})

  // стейт авторизации
  const [isSuccessAuthorization, setIsSuccessAuthorization] = useState(false)
  
  // стейт Email
  const [userEmail, setUserEmail] = useState('')
  
  // стейт залогиненого юзера
  const [loggedIn, setLoggedIn] = useState(undefined)

  // клик по иконке редактирования профиля
  function handleEditProfileClick () {
    setIsEditProfilePopupOpen(true)
  }

  // клик по иконке добавления новой карточки
  function handleAddNewCardClick () {
    setIsAddNewCardPopupOpen(true)
  }

  // клик по иконке аватара
  function handleEditAvatarClick () {
    setIsEditAvatarPopupOpen(true)
  }

  // клик по карточке
  function handleCardClick (card) {
    setSelectedCard(card)
    setIsImagePopupOpen(true)
  } 

  // клик по иконке удаления карточки
  function handleDeleteCardClick () {
    setIsDeleteCardPopupOpen(true)
  }

  // закрытие всех попапов
  function closeAllPopups () {
    setIsEditProfilePopupOpen(false)
    setIsAddNewCardPopupOpen(false)
    setIsEditAvatarPopupOpen(false)
    setIsImagePopupOpen(false)
    setIsDeleteCardPopupOpen(false)
    setIsInfoTooltipPopupOpen(false)
  }

  // задание значений стейтам текущего пользователя и изначальных карточек
  useEffect(() => {
    loggedIn && api.getData(localStorage.jwt)
      .then(([userData, cardsData]) => {
        setCurrentUser(userData)
        setCards(cardsData.reverse())
      })
      .catch((err) => {
        console.error(`Ошибка получения карточек и инфы юзера после логина: ${err} `)
      })
  }, [loggedIn])
  
  // обновление данных о текущем пользователе
  function handleUpdateUser (userData) {
    api.setUserInfo(userData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Ошибка обновления данных юзера: ${err}`)
      })
  }
  
  // обновление аватара текущего пользователя
  function handleUpdateAvatar (avatarData) {
    api.setUserAvatar(avatarData, localStorage.jwt)
      .then((res) => {
        setCurrentUser(res)
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Ошибка обновления аватара: ${err}`)
      })
  }
  
  // добавление новой карточки
  function handleAddCard (cardData) {
    api.addNewCard(cardData, localStorage.jwt)
      .then((res) => {
        setCards([res, ...cards])
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Ошибка добавления новой карточки: ${err}`)
      })
  }

  // удаление карточки
  function handleDeleteCard (cardData) {
    api.deleteCard(cardData._id, localStorage.jwt)
      .then((res) => {
        setCards((cards) => cards.filter((item) => item._id !== cardData._id))
        closeAllPopups()
      })
      .catch((err) => {
        console.error(`Ошибка удаления карточки: ${err}`)
      })
  }

  // поставить||снять лайк
  function handleCardLike (cardData) {
    // проверка ставил ли текущий юзер лайк на этой карточке
    const isLiked = cardData.likes.some((item) => {return (item === currentUser._id)})

    if (isLiked === true) {
      api.deleteLike(cardData._id, localStorage.jwt)
        .then((res) => {
          setCards((state) => state.map((item) => (item._id === cardData._id) ? res : item))
        })
        .catch((err) => {
          console.error(`Ошибка лайка: ${err}`)
        })
      } else {
      api.putLike(cardData._id, localStorage.jwt)
        .then((res) => {
          setCards((state) => state.map((item) => (item._id === cardData._id) ? res : item))
        })
        .catch((err) => {
          console.error(`Ошибка дизлайка: ${err}`)
        })
      }
  }

  // регистрация
  function handleRegistration (values) {
    const { email, password } = values
    authorization.registration(email, password)
      .then((res) => {
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessAuthorization(true)
        navigate('/sign-in')
      })
      .catch((err) => {
        console.error(`Ошибка при регистрации: ${err}`)
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessAuthorization(false)
      })
  }

  // логин
  function handleLogin (values) {
    const { email, password } = values
    authorization.login(email, password)
      .then((res) => {
        setUserEmail(email)
        setLoggedIn(true)
        navigate('/')
      })
      .catch((err) => {
        console.error(`Ошибка при логине: ${err}`)
        setIsInfoTooltipPopupOpen(true)
        setIsSuccessAuthorization(false)
      })
  }

  // взять токен из локал стораджа
  useEffect(() => {
    function checkToken() {
      const token = localStorage.getItem('jwt')
      if (token) {
        authorization.getToken(token)
          .then((res) => {
            if (res) {
              setLoggedIn(true)
              navigate("/")
              setUserEmail(res.email)
            }
          })
          .catch((err) => console.error(err))
      }
    }
    checkToken()
  }, [navigate])

  // разлогин
  function handleLogout () {
    localStorage.removeItem('jwt')
    setUserEmail('')
    setLoggedIn(undefined)
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header 
          loggedIn={ loggedIn }
          userEmail={ userEmail }
          onLogout={ handleLogout }
        />

        <Routes>
          <Route path="/" element={
            <ProtectedRoute
              element={ Main }
              loggedIn={ loggedIn }
              onEditProfile={ handleEditProfileClick }
              onAddNewCard={ handleAddNewCardClick }
              onEditAvatar={ handleEditAvatarClick }
              onCardClick={ handleCardClick }
              onDeleteCard={ handleDeleteCardClick }
              onCardLike={ handleCardLike }
              cards={ cards }
              setDeletedCard={ setDeletedCard }
            />
          }/>
          <Route path="/sign-up" element={<Register onRegistration={ handleRegistration } />} />
          <Route path="/sign-in" element={<Login onLogin={ handleLogin } />} />
          <Route path="*" element={<Navigate to="/"/>} />
        </Routes>

        <Footer />
        
        <EditProfilePopup
          isOpen={ isEditProfilePopupOpen }
          onClose={ closeAllPopups }
          onUpdateUser={ handleUpdateUser }
        >

        </EditProfilePopup>

        <EditAvatarPopup
          isOpen={ isEditAvatarPopupOpen }
          onClose={ closeAllPopups }
          onUpdateAvatar={ handleUpdateAvatar }
        >

        </EditAvatarPopup>

        <AddPlacePopup
          isOpen={ isAddNewCardPopupOpen }
          onClose={ closeAllPopups }
          onAddCard={ handleAddCard }
        >

        </AddPlacePopup>

        <ImagePopup
          name="zoom-image"
          card={ selectedCard }
          isOpen={ isImagePopupOpen }
          onClose={ closeAllPopups }
        >

        </ImagePopup>

        <ConfirmationPopup
          isOpen={ isDeleteCardPopupOpen }
          onClose={ closeAllPopups }
          onConfirm={ handleDeleteCard }
          deletedCard={ deletedCard }
        >

        </ConfirmationPopup>

        <InfoTooltip
        name='infoTooltip'
        isOpen={ isInfoTooltipPopupOpen }
        onClose={ closeAllPopups }
        isSuccess={ isSuccessAuthorization }
        >

        </InfoTooltip>

      </div>
    </CurrentUserContext.Provider>
  )
}

export default App;
