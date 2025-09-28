import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LanguageContext } from '../context/LanguageContext';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';
import './Header.css'; // Optional styling
import LanguageSelector from './LanguageSelector';

const Header = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useContext(LanguageContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/dashboard">E-SEHAT</Link>
      </div>

      <nav className="nav-links">
        <Link to="/consultation">{t('dashboard.consultation')}</Link>
        <Link to="/records">{t('dashboard.records')}</Link>
        <Link to="/medicine">{t('dashboard.medicine')}</Link>
        <Link to="/symptoms">{t('dashboard.symptoms')}</Link>
        <Link to="/help">{t('dashboard.help')}</Link>
      </nav>

      <div className="header-right">
        <LanguageSelector />

        {user ? (
          <button onClick={logout}>{t('logout', 'Logout')}</button>
        ) : (
          <>
            <Link to="/register" className="registerbtn">{t('register.submit', 'Register')}</Link>
            <Link to="/" className="loginbtn">{t('login.submit', 'Login')}</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;