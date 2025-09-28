import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../context/AuthContext';
import { OfflineContext } from '../context/OfflineContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const { isOnline } = useContext(OfflineContext);
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnline) {
      setError(t('login.offlineError'));
      return;
    }

    setLoading(true);
    const result = await login(credentials);
    setLoading(false);

    if (result.success) {
      navigate(`/${result.role}-dashboard`);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="login-page">
      <h2>{t('login.title')}</h2>

      {!isOnline && (
        <p className="offline-banner">{t('login.offlineWarning')}</p>
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">{t('login.email')}</label>
        <input
          type="email"
          name="email"
          id="email"
          value={credentials.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">{t('login.password')}</label>
        <input
          type="password"
          name="password"
          id="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? t('login.loading') : t('login.submit')}
        </button>
      </form>
    </div>
  );
};

export default Login;