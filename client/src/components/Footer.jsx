import React from 'react';
import { useTranslation } from 'react-i18next';
import './Footer.css'; // Optional: for styling

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>{t('footer.copyright')} © {new Date().getFullYear()} Rural Healthcare App</p>
        <p>{t('footer.tagline')}</p>
      </div>
    </footer>
  );
};

export default Footer;