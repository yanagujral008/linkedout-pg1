import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import logoUrl from '/LOGO.jpg'
import ThemeToggle from '@/components/ThemeToggle.jsx'
import { API_ENDPOINTS } from '@/config'
import '@/styles/lo2-linkedout.css'

export default function AuthSignup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [password, setPassword] = useState('')

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

  const validatePassword = (pwd) => {
    return {
      length: pwd.length >= 8,
      uppercase: /[A-Z]/.test(pwd),
      number: /[0-9]/.test(pwd),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
    }
  }

  const validation = validatePassword(password)

  const onSignUp = async (e) => {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    const name = fd.get('name')
    const email = fd.get('email')
    const password = fd.get('password')
    const confirmPassword = fd.get('confirmPassword')
    const dob = fd.get('dob')
    
    if (password !== confirmPassword) {
      alert('Passwords do not match')
      return
    }
    
    const isValid = validation.length && validation.uppercase && validation.number && validation.special
    if (!isValid) {
      alert('Password must meet all requirements')
      return
    }
    
    try {
      const response = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
        credentials: 'include' // Include cookies for sessions if needed
      })
      
      const data = await response.json()
      
      if (response.ok) {
        sessionStorage.setItem('lo_dob', dob || '')
        localStorage.setItem('token', data.token)
        navigate('/onboarding')
      } else {
        alert(data.error || 'Registration failed')
      }
    } catch (err) {
      alert('Connection error')
    }
  }

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
        <div style={{background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', width: '400px', backdropFilter: 'blur(10px)', border: '1px solid var(--border)'}}>
          <div style={{textAlign: 'center', marginTop: '1.5rem'}}>
            <p>Already have an account? <Link to="/login" style={{color: 'var(--primary)', fontWeight: 500}}>Log in</Link></p>
          </div>
          <h1 style={{textAlign: 'center', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text)'}}>Create account</h1>
          <form onSubmit={onSignUp} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
            <input 
              name="name" 
              type="text" 
              placeholder="Full name" 
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
              name="email" 
              type="email" 
              placeholder="Email" 
              required 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--input-bg)',
                color: 'var(--text)',
                fontSize: '1rem'
              }}
            />
            <input 
              name="dob" 
              type="date" 
              required 
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '2px solid var(--border)',
                background: 'var(--input-bg)',
                color: 'var(--text)',
                fontSize: '1rem'
              }}
            />
            <div style={{position: 'relative'}}>
              <input 
                name="password" 
                type={showPassword ? 'text' : 'password'} 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #4A5568',
                  background: 'rgba(26, 32, 44, 0.8)',
                  color: 'white',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            <div style={{position: 'relative'}}>
              <input 
                name="confirmPassword" 
                type={showConfirmPassword ? 'text' : 'password'} 
                placeholder="Re-enter password" 
                required 
                style={{
                  width: '100%',
                  padding: '0.75rem 3rem 0.75rem 1rem',
                  borderRadius: '8px',
                  border: '2px solid #4A5568',
                  background: 'rgba(26, 32, 44, 0.8)',
                  color: 'white',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
              <button 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

