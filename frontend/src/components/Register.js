import { useState } from "react"
import { Link } from "react-router-dom"



function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onRegister(email, password);
    }


    return (
        <section className="login">
            <h2 className="login__title">Регистрация</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__form-input" name="email" type="email" placeholder="Email" value={email || ""} required onChange={handleChangeEmail} autoComplete="username"></input>
                <input className="login__form-input" name="password" type="password" placeholder="Пароль" value={password || ""} required onChange={handleChangePassword} autoComplete="current-password"></input>
                <button className="login__button" type="submit" >Зарегистрироваться</button>
                <p className="login__text">Уже зарегистрированы?   <Link className="login__link" to="/sign-in">Войти</Link></p>
            </form>
        </section>
    )
}

export default Register