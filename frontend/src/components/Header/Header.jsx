import { Link } from 'react-router-dom'
import { useState } from 'react';
import logo from '../../images/logo.svg'

function Header ({ loggedIn, userEmail, onLogout }) {

  // стейт для переключения логин/разлогин
  const [isSignUp, setIsSignUp] = useState(false)
  
  // обработчик логин/разлогин
  function handleAuthClick () {
    setIsSignUp(!isSignUp)
  }

  return (
    <header className="header page__header">
      <div className="header__container">
        <img src={ logo } alt="Логотип" className="header__logo" />
        <div className="header__user-info">
          {loggedIn && <div className="header__email">{ userEmail }</div>}
          {loggedIn ? (
            <Link className="header__link" onClick={ onLogout } to="/sign-in">Выйти</Link>
          ) : (
            <>
              {isSignUp ? (
                <Link className="header__link" to="/sign-in" onClick={ handleAuthClick }>Войти</Link>
              ) : (
                <Link className="header__link" to="/sign-up" onClick={ handleAuthClick }>Регистрация</Link>
              )}
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export { Header }