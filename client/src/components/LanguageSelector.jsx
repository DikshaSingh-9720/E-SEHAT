import React, { useContext } from 'react';
import { LanguageContext } from '../context/LanguageContext';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const LanguageSelector = () => {
  const { language, setLanguage } = useContext(LanguageContext);
  const { i18n } = useTranslation();

  const handleChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="language-selector">
      <select
        id="language-dropdown"
        value={language}
        onChange={handleChange}
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
        <option value="pa">ਪੰਜਾਬੀ</option>
      </select>
    </div>
  );
};

export default LanguageSelector;