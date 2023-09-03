import React, { useEffect, useState } from "react";

function Login({ onLogin }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function resetForm() {
        setEmail("");
        setPassword("")
    }

    function handleSubmit(e) {
        e.preventDefault();
        onLogin(email, password)
    }

    useEffect(() => {
        resetForm()
   }, []);

    return (
        <section className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input className="login__form-input" name="email" type="email" placeholder="Email" value={email || ""} required onChange={handleChangeEmail} autoComplete="username"></input>
                <input className="login__form-input" name="password" type="password" placeholder="Пароль" value={password || ""} required onChange={handleChangePassword} autoComplete="curren-password"></input>
                <button className="login__button" type="submit" >Войти</button>
            </form>
        </section>
    )
}

export default Login