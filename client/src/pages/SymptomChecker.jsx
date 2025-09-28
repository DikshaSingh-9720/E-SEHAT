import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import symptomService from '../services/symptomService';
import './SymptomChecker.css';

const SymptomChecker = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isOnline) {
      setResult(t('symptoms.offlineMessage'));
      return;
    }

    setLoading(true);
    try {
      const response = await symptomService.checkSymptoms(input);
      setResult(response.advice || t('symptoms.noAdvice'));
    } catch (error) {
      console.error('Symptom check failed:', error);
      setResult(t('symptoms.error'));
    }
    setLoading(false);
  };

  return (
    <div className="symptom-checker-page">
      <h2>{t('symptoms.title')}</h2>

      <form className="symptom-form" onSubmit={handleSubmit}>
        <label htmlFor="symptom-input">{t('symptoms.label')}</label>
        <textarea
          id="symptom-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('symptoms.placeholder')}
          rows={4}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? t('symptoms.loading') : t('symptoms.submit')}
        </button>
      </form>

      {result && <div className="symptom-result">{result}</div>}
    </div>
  );
};

export default SymptomChecker;