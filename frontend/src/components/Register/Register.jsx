import { useState } from "react";
import { Link } from "react-router-dom";

function Register ({ onRegistration }) {

  // стейт значений инпутов
  const [inputsValues, setInputsValues] = useState({});

  // обработчик значений инпутов
  function handleInputChange(evt) {
    setInputsValues({ ...inputsValues, [evt.target.name]: evt.target.value });
  }

  // отправка формы регистрации
  function handleSubmit(evt) {
    evt.preventDefault()
    onRegistration(inputsValues)
  } 

  return (
    <section className="content">
      <h2 className="authorization__title">Регистрация</h2>
      <form className="authorization__form" onSubmit={ handleSubmit }>
        <input
          className="authorization__input"
          placeholder="Email"
          type="email"
          name="email"
          id="email"
          required
          value={inputsValues.email || ""}
          onChange={handleInputChange}
        />
        <span className="authorization__error" id="email-error" />
        <input
          className="authorization__input"
          placeholder="Пароль"
          type="password"
          name="password"
          id="password"
          minLength={2}
          maxLength={40}
          required
          value={inputsValues.password || ""}
          onChange={handleInputChange}
        />
        <span className="authorization__error" id="password-error" />
        <button className="authorization__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <p className="authorization__text">
        Уже зарегистрированы?{" "}
        <Link className="authorization__link" to="/sign-in">
          Войти
        </Link>
      </p>
    </section>
  );
}

export { Register };
