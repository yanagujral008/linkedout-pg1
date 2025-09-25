import { useState, useEffect } from 'react';
import logoUrl from '/LOGO.jpg';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import { API_ENDPOINTS } from '@/config';
import '@/styles/lo2-linkedout.css';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Set body styles for LinkedOut pages
  useEffect(() => {
    document.body.style.backgroundColor = 'var(--bg)';
    document.body.style.color = 'var(--text)';
    document.body.style.fontFamily = 'var(--font-sans)';
    
    return () => {
      // Reset body styles when leaving the page
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const handleReset = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.RESET_PASSWORD(token), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
        credentials: 'include' // Include cookies for sessions if needed
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert('Password reset successful! You can now log in.');
        navigate('/login');
      } else {
        alert(data.error || 'Reset failed');
      }
    } catch (err) {
      alert('Connection error');
    }
  };

  return (
    <div className="center" style={{minHeight:'70vh', textAlign:'center'}}>
      <div style={{width:420}}>
        <h1 className="title">Reset Password</h1>
        <form onSubmit={handleReset} className="stack">
          <input 
            className="input" 
            type="password" 
            placeholder="New password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
          <input 
            className="input" 
            type="password" 
            placeholder="Confirm password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required 
          />
          <div className="row" style={{justifyContent:'center'}}>
            <button type="submit" className="btn btn-primary">Reset Password</button>
          </div>
          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <p>Remember your password? <Link to="/login" style={{color: 'var(--primary)', fontWeight: 500}}>Log in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}