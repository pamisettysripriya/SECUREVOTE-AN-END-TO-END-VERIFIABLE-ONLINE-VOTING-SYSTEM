import React from 'react';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <nav style={styles.nav}>
        <div style={styles.logo}>SecureVote</div>
        <button onClick={() => navigate('/login')} style={styles.loginButton}>
          Login
        </button>
      </nav>

      <div style={styles.hero}>
        <h1 style={styles.title}>SecureVote</h1>
        <p style={styles.subtitle}>Decentralized, Transparent, and Secure Voting System</p>
        <p style={styles.description}>
          Powered by Paillier homomorphic encryption and distributed threshold cryptography
        </p>
        <button onClick={() => navigate('/login')} style={styles.ctaButton}>
          Get Started →
        </button>
      </div>

      <div style={styles.features}>
        <div style={styles.featureCard}>
          <div style={styles.icon}>🔒</div>
          <h3 style={styles.featureTitle}>End-to-End Encryption</h3>
          <p style={styles.featureText}>
            Votes are encrypted using Paillier cryptography, ensuring complete privacy and tamper-proof ballots.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.icon}>🗳️</div>
          <h3 style={styles.featureTitle}>Verifiable Results</h3>
          <p style={styles.featureText}>
            Homomorphic tallying allows votes to be counted without decryption, maintaining anonymity throughout.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.icon}>👥</div>
          <h3 style={styles.featureTitle}>Distributed Trust</h3>
          <p style={styles.featureText}>
            Threshold cryptography splits keys among trustees, preventing single points of failure or manipulation.
          </p>
        </div>

        <div style={styles.featureCard}>
          <div style={styles.icon}>📊</div>
          <h3 style={styles.featureTitle}>Public Bulletin Board</h3>
          <p style={styles.featureText}>
            All encrypted votes are publicly visible for independent verification while preserving voter anonymity.
          </p>
        </div>
      </div>

      <div style={styles.footer}>
        <p style={styles.footerText}>Built with React, Flask, and python-paillier</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nav: {
    width: '100%',
    padding: '1.5rem 3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  logo: {
    fontSize: '1.8rem',
    fontWeight: 800,
    textShadow: '0 2px 4px rgba(0,0,0,0.3)'
  },
  loginButton: {
    color: '#fff',
    fontSize: '1rem',
    fontWeight: 600,
    padding: '0.6rem 1.5rem',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  hero: {
    textAlign: 'center',
    maxWidth: '800px',
    marginTop: '3rem',
    marginBottom: '4rem',
    padding: '0 2rem'
  },
  title: {
    fontSize: '4rem',
    fontWeight: 800,
    margin: '0 0 1rem 0',
    textShadow: '0 4px 6px rgba(0,0,0,0.3)'
  },
  subtitle: {
    fontSize: '1.5rem',
    fontWeight: 300,
    margin: '0 0 1rem 0',
    opacity: 0.95
  },
  description: {
    fontSize: '1.1rem',
    opacity: 0.85,
    marginBottom: '2rem'
  },
  ctaButton: {
    padding: '1rem 3rem',
    fontSize: '1.2rem',
    fontWeight: 700,
    background: '#fff',
    color: '#667eea',
    border: 'none',
    borderRadius: '50px',
    cursor: 'pointer',
    boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
    transition: 'transform 0.2s, box-shadow 0.2s'
  },
  features: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    maxWidth: '1200px',
    width: '100%',
    padding: '0 2rem',
    marginBottom: '3rem'
  },
  featureCard: {
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    padding: '2rem',
    borderRadius: '16px',
    textAlign: 'center',
    border: '1px solid rgba(255,255,255,0.2)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
  },
  icon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  featureTitle: {
    fontSize: '1.3rem',
    fontWeight: 600,
    marginBottom: '0.8rem'
  },
  featureText: {
    fontSize: '0.95rem',
    opacity: 0.9,
    lineHeight: '1.6'
  },
  footer: {
    marginTop: 'auto',
    padding: '2rem'
  },
  footerText: {
    opacity: 0.7,
    fontSize: '0.9rem'
  }
};

export default LandingPage;
