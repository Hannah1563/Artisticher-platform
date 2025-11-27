import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'; // <-- Add this import

const Home = () => {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: 'linear-gradient(135deg, #7b5cff 0%, #4e8cff 100%)',
          color: '#fff',
          padding: '80px 0',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        {/* Update your image here */}
        <img
          src="/rwanda-art.jpg"
          alt="Rwandan Art"
          style={{
            position: 'absolute',
            right: 60,      // move more left
            top: 120,       // move lower
            width: 300,     // make bigger
            maxWidth: '40vw',
            borderRadius: '16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            opacity: 0.95,
            zIndex: 1
          }}
        />
        <h1 style={{ fontSize: '3rem', fontWeight: 700, marginBottom: '1rem', position: 'relative', zIndex: 2 }}>
          {t('home.hero.title')}
        </h1>
        <p style={{ fontSize: '1.25rem', marginBottom: '2rem', position: 'relative', zIndex: 2 }}>
          {t('home.hero.subtitle')}
        </p>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Link
            to="/gallery"
            style={{
              background: '#fff',
              color: '#7b5cff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 28px',
              fontWeight: 600,
              fontSize: '1rem',
              marginRight: '16px',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e0e0e0'
            }}
          >
            {t('home.hero.browseGallery')}
          </Link>
          <Link
            to="/register"
            style={{
              background: '#2d2dff',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 28px',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              textDecoration: 'none',
              boxShadow: '0 2px 8px #e0e0e0'
            }}
          >
            {t('home.hero.registerArtist')}
          </Link>
        </div>
      </section>

      {/* Why Choose Section */}
      <section style={{ background: '#f8f9fb', padding: '60px 0' }}>
        <h2 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '2rem', color: '#222' }}>
          {t('home.whyChoose')}
        </h2>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap'
          }}
        >
          {/* Feature 1 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 16px #e0e0e0',
              padding: '32px',
              width: '320px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '2.5rem' }} role="img" aria-label="palette">🎨</span>
            <h3 style={{ fontWeight: 600, margin: '16px 0 8px 0' }}>
              {t('home.features.discover.title')}
            </h3>
            <p style={{ color: '#555' }}>{t('home.features.discover.desc')}</p>
          </div>
          {/* Feature 2 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 16px #e0e0e0',
              padding: '32px',
              width: '320px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '2.5rem' }} role="img" aria-label="sparkles">✨</span>
            <h3 style={{ fontWeight: 600, margin: '16px 0 8px 0' }}>
              {t('home.features.unique.title')}
            </h3>
            <p style={{ color: '#555' }}>{t('home.features.unique.desc')}</p>
          </div>
          {/* Feature 3 */}
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              boxShadow: '0 2px 16px #e0e0e0',
              padding: '32px',
              width: '320px',
              textAlign: 'center'
            }}
          >
            <span style={{ fontSize: '2.5rem' }} role="img" aria-label="calendar">📅</span>
            <h3 style={{ fontWeight: 600, margin: '16px 0 8px 0' }}>
              {t('home.features.events.title')}
            </h3>
            <p style={{ color: '#555' }}>{t('home.features.events.desc')}</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        style={{
          background: 'linear-gradient(120deg, #a259cf 0%, #f7b801 100%)',
          color: '#fff',
          padding: '60px 0',
          textAlign: 'center'
        }}
      >
        <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}>
          {t('home.cta.title')}
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          {t('home.cta.subtitle')}
        </p>
        <button
          style={{
            background: '#fff',
            color: '#a259cf',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontWeight: 600,
            fontSize: '1rem',
            marginRight: '16px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #e0e0e0'
          }}
        >
          {t('home.cta.registerArtist')}
        </button>
        <button
          style={{
            background: '#a259cf',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '12px 28px',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px #e0e0e0'
          }}
        >
          {t('home.cta.exploreGallery')}
        </button>
      </section>
    </div>
  );
};

export default Home;