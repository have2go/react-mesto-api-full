import React, { useState } from 'react';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }
    function handlePasswordChange(e) {
        setpassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onLogin(email, password);
    }

    return (
        <section className="auth">
            <h2 className="auth__title">Вход</h2>
            <form className="auth__form" onSubmit={handleSubmit}>
                <div className="auth__input-container">
                    <input
                        className="auth__input"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                    ></input>
                    <input
                        className="auth__input"
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                    ></input>
                </div>    
                <button className="auth__submit-btn" type="submit">
                    Войти
                </button>
            </form>
        </section>
    );
}

export default Login;
