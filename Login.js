import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    setMsg(''); setError('');
    try {
      const res = await axios.post('http://localhost:5000/auth', { email, otp });
      const { token, user } = res.data;
      onLogin(user, token);
      setMsg('Logged in');
      navigate(user.role === 'admin' ? '/admin' : '/elections');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  const requestOtp = async () => {
    setMsg(''); setError('');
    try {
      await axios.post('http://localhost:5000/request-otp', { email });
      setMsg('OTP sent. Check Flask terminal.');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to request OTP');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={styles.input}/>
      <input type="text" placeholder="One-Time Password" value={otp} onChange={e => setOtp(e.target.value)} style={styles.input}/>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={handleLogin} style={styles.buttonPrimary}>Login</button>
        <button onClick={requestOtp} type="button" style={styles.buttonSecondary}>Request OTP</button>
      </div>
      {msg && <p style={styles.success}>{msg}</p>}
      {error && <p style={styles.error}>{error}</p>}
    </div>
  );
}

const styles = {
  container: { background: 'rgba(255,255,255,0.9)', color: '#333', padding: '2rem', borderRadius: '12px', maxWidth: '420px', margin: '0 auto' },
  input: { width: '100%', padding: '0.8rem', marginBottom: '0.8rem', borderRadius: '8px', border: '1px solid #ccc', fontSize: '1rem' },
  buttonPrimary: { flex: 1, padding: '0.8rem', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  buttonSecondary: { flex: 1, padding: '0.8rem', background: '#f1f3f5', color: '#333', border: '1px solid #ccd', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 },
  success: { color: '#27ae60', marginTop: '0.6rem' },
  error: { color: '#e74c3c', marginTop: '0.6rem' },
};

export default Login;
