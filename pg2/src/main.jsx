import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import PastEventsPage from './pages/PastEventsPage.jsx'

function ScrollToTop() {
  const { pathname } = useLocation();
  // Disable browser scroll restoration for SPA navigation
  useEffect(() => {
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      try { window.history.scrollRestoration = prev; } catch {}
    };
  }, []);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/past-events" element={<PastEventsPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
