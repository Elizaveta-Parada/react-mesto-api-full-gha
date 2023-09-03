import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import logoHeader from '../images/logo_header.svg'

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={logoHeader} alt="Логотип место Россия" />
      <Routes>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link">Войти</Link>} />
        <Route path="/" element={
          <div className="header__user-info">
            <p className="header__user-email">{email}</p>
            <Link to="/sign-in" className="header__link" onClick={onSignOut}>Выйти</Link>
          </div>
        } />
      </Routes>
    </header>
  );
}

export default Header;