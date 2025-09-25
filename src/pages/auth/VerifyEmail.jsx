import { useEffect } from 'react';
import logoUrl from '/LOGO.jpg';
import ThemeToggle from '@/components/ThemeToggle.jsx';
import '@/styles/lo2-linkedout.css';
import { useNavigate } from 'react-router-dom'

export default function VerifyEmail() {
  const navigate = useNavigate();

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

  return (
    <div className="center" style={{minHeight:'60vh'}}>
      <div className="card" style={{maxWidth:560}}>
        <h1 className="title">Verify your email</h1>
        <div className="theme-toggle-container">
          <ThemeToggle />
        </div>
        <p className="subtitle">We sent a verification link to your inbox.</p>
        <div className="row" style={{marginTop:16}}>
          <button className="cta secondary" onClick={()=>navigate('/onboarding')}>Continue</button>
        </div>
      </div>
    </div>
  )
}
