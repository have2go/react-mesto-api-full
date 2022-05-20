import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password);
    }


    return (
        <section className="auth">
            <h2 className="auth__title">Регистрация</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input
                    className="auth__input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={email}
                    onChange={handleEmailChange}
                ></input>
                <input
                    className="auth__input"
                    type="password"
                    placeholder="Пароль"
                    name="password"
                    value={password}
                    onChange={handlePasswordChange}
                ></input>
                <button className="auth__submit-btn" type="submit">
                    Зарегистрироваться
                </button>
                <div className="auth__registered">
                    <p className="auth__question">Уже зарегистрированы?</p>
                    <Link to="./sign-in" className="auth__link">
                        Войти
                    </Link>
                </div>
            </form>
        </section>
    );
}

export default Register;
