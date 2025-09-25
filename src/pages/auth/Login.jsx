import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logoUrl from '/LOGO.jpg';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import { API_ENDPOINTS } from '@/config';
import '@/styles/lo2-linkedout.css';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const signInWithGoogle = () => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Replace with your Google Client ID
        callback: handleGoogleResponse
      });
      
      window.google.accounts.id.prompt();
    } else {
      alert('Google Sign-In not loaded. Please try again.');
    }
  };
  
  const handleGoogleResponse = async (response) => {
    try {
      const googleResponse = await fetch(API_ENDPOINTS.GOOGLE_LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
        credentials: 'include' // Include cookies for sessions if needed
      });
      
      const data = await googleResponse.json();
      
      if (googleResponse.ok) {
        localStorage.setItem('lo_token', data.token);
        localStorage.setItem('lo_user_id', data.user.id);
        localStorage.setItem('lo_user_name', data.user.name);
        navigate('/create');
      } else {
        alert(data.error || 'Google login failed');
      }
    } catch (err) {
      alert('Google login error');
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Attempting login...');
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include' // Include cookies for sessions if needed
      });
      
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (response.ok) {
        localStorage.setItem('lo_token', data.token);
        localStorage.setItem('lo_user_id', data.user.id);
        localStorage.setItem('lo_user_name', data.user.name);
        navigate('/create');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Connection error: ' + err.message);
    }
  };

  return (
    <div className="linkedout-page" style={{minHeight: '100vh', position: 'relative', overflow: 'hidden'}}>
      {/* Header */}
      <div style={{position: 'absolute', top: '2rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', zIndex: 10}}>
        <img src={logoUrl} alt="LinkedOut" style={{width: '32px', height: '32px'}} />
        <span style={{fontSize: '1.5rem', fontWeight: 'bold'}}>LinkedOut</span>
      </div>
      
      {/* Theme Toggle */}
      <div style={{position: 'absolute', top: '2rem', right: '2rem', zIndex: 10}}>
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
      </div>

      {/* Background Circles */}
      <div style={{position: 'absolute', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.1)', top: '10%', left: '10%'}} />
      <div style={{position: 'absolute', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.05)', top: '20%', right: '15%'}} />
      <div style={{position: 'absolute', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.08)', bottom: '15%', left: '5%'}} />
      <div style={{position: 'absolute', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(255, 193, 7, 0.06)', bottom: '10%', right: '20%'}} />

      {/* Main Content */}
      <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '2rem'}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center'}}>
          {/* Login Form */}
          <div style={{background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '400px', backdropFilter: 'blur(10px)', border: '1px solid var(--border)'}}>
            <form onSubmit={handleEmailLogin} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid var(--primary)',
                  background: 'var(--bg-card)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid var(--border)',
                  background: 'var(--bg-card)',
                  color: 'var(--text)',
                  fontSize: '1rem'
                }}
              />
              <button 
                type="submit" 
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#FFC107',
                  color: 'black',
                  fontSize: '1rem',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '0.5rem'
                }}
              >
                Log In
              </button>
            </form>
            <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.9rem'}}>
              <span 
                style={{color: '#FFC107', cursor: 'pointer'}} 
                onClick={() => {
                  const email = prompt('Enter your email:');
                  if (email) {
                    fetch(API_ENDPOINTS.FORGOT_PASSWORD, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email })
                    })
                    .then(res => res.json())
                    .then(data => alert(data.message || data.error))
                    .catch(() => alert('Connection error'));
                  }
                }}
              >
                Forgot password?
              </span>
              <Link to="/signup" style={{color: 'var(--text-muted)', textDecoration: 'none'}}>Sign up</Link>
            </div>
          </div>

          {/* Google Auth */}
          <div style={{background: 'var(--bg-card)', padding: '1rem', borderRadius: '12px', width: '400px', backdropFilter: 'blur(10px)', border: '1px solid var(--border)'}}>
            <button 
              onClick={signInWithGoogle} 
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid var(--border)',
                background: 'var(--bg-card)',
                color: 'var(--text)',
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'var(--bg-hover)'
                }
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              <span>Sign in with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


