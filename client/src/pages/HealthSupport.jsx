import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { OfflineContext } from '../context/OfflineContext';
import './HealthSupport.css';

const HealthSupport = () => {
  const { t } = useTranslation();
  const { isOnline } = useContext(OfflineContext);

  const emergencyContacts = [
    { label: t('support.ambulance'), number: '108' },
    { label: t('support.womenHelpline'), number: '1091' },
    { label: t('support.childHelpline'), number: '1098' },
    { label: t('support.healthMinistry'), number: '1075' }
  ];

  const faqs = [
    { q: t('support.faq1.q'), a: t('support.faq1.a') },
    { q: t('support.faq2.q'), a: t('support.faq2.a') },
    { q: t('support.faq3.q'), a: t('support.faq3.a') }
  ];

  return (
    <div className="health-support-page">
      <h2>{t('support.title')}</h2>

      {!isOnline && (
        <p className="offline-banner">{t('support.offlineMessage')}</p>
      )}

      <section className="emergency-section">
        <h3>{t('support.emergencyTitle')}</h3>
        <ul>
          {emergencyContacts.map((contact, index) => (
            <li key={index}>
              <strong>{contact.label}:</strong> {contact.number}
            </li>
          ))}
        </ul>
      </section>

      <section className="faq-section">
        <h3>{t('support.faqTitle')}</h3>
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <p className="faq-question">{faq.q}</p>
            <p className="faq-answer">{faq.a}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default HealthSupport;