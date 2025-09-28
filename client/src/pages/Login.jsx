import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const { t } = useTranslation();
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
    setError('');

    try {
      // Call your backend login API
      const res = await axios.post('http://localhost:5000/api/auth/login', credentials);

      const { token, role } = res.data;

      // Save token for authenticated requests
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'doctor') {
        navigate('/doctor-dashboard');
      } else if (role === 'patient') {
        navigate('/patient-dashboard');
      } else {
        navigate('/dashboard'); // fallback
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || t('login.invalidCredentials'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <h2>{t('login.title')}</h2>

      {!isOnline && <p className="offline-banner">{t('login.offlineWarning')}</p>}

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
