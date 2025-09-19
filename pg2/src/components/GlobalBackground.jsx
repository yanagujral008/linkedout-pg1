import { useEffect, useRef } from 'react';

// Animated particle system background
export default function GlobalBackground() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const tRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const PARTICLE_COUNT = 25; // fewer particles, less distracting

    function resize() {
      const { innerWidth: w, innerHeight: h } = window;
      canvas.width = Math.floor(w * DPR);
      canvas.height = Math.floor(h * DPR);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }

    function initParticles() {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }).map(() => {
        const size = 8 + Math.random() * 16; // much bigger particles
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size,
          hue: 45 + Math.random() * 30, // yellow-orange range
          alpha: 0.1 + Math.random() * 0.2, // much softer alpha for subtle effect
          vx: (Math.random() - 0.5) * 0.8, // slower movement
          vy: (Math.random() - 0.5) * 0.8,
          phase: Math.random() * Math.PI * 2,
          twinkle: Math.random() * 0.01 + 0.005, // gentler twinkling
        };
      });
    }

    function step() {
      tRef.current += 0.016;
      const { innerWidth: W, innerHeight: H } = window;
      ctx.clearRect(0, 0, W, H);

      // subtle parallax based on scroll
      const sy = window.scrollY || 0;
      const parallax = sy * 0.03;

      // Ambient background glow
      const bgGlow = ctx.createRadialGradient(W * 0.5, H * 0.4 - parallax, 0, W * 0.5, H * 0.4 - parallax, Math.max(W, H) * 0.8);
      bgGlow.addColorStop(0, 'rgba(250, 204, 21, 0.05)');
      bgGlow.addColorStop(0.6, 'rgba(250, 204, 21, 0.02)');
      bgGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bgGlow;
      ctx.fillRect(0, 0, W, H);

      // Animated particles
      for (const p of particlesRef.current) {
        // Update position with slight randomness
        p.x += p.vx + Math.sin(tRef.current + p.phase) * 0.2;
        p.y += p.vy + Math.cos(tRef.current * 0.8 + p.phase) * 0.15;
        
        // Wrap around screen
        if (p.x < -50) p.x = W + 50;
        if (p.x > W + 50) p.x = -50;
        if (p.y < -50) p.y = H + 50;
        if (p.y > H + 50) p.y = -50;

        // Twinkling effect
        const twinkle = Math.sin(tRef.current * 3 + p.phase) * p.twinkle;
        const currentAlpha = Math.max(0.1, p.alpha + twinkle);
        const currentSize = p.size + Math.sin(tRef.current * 2 + p.phase) * 0.5;

        // Render particle with massive, heavily blurred glow
        const particleGlow = ctx.createRadialGradient(p.x, p.y - parallax, 0, p.x, p.y - parallax, currentSize * 8);
        particleGlow.addColorStop(0, `hsla(${p.hue}, 90%, 70%, ${currentAlpha * 0.4})`);
        particleGlow.addColorStop(0.1, `hsla(${p.hue}, 90%, 70%, ${currentAlpha * 0.3})`);
        particleGlow.addColorStop(0.3, `hsla(${p.hue}, 90%, 70%, ${currentAlpha * 0.15})`);
        particleGlow.addColorStop(0.7, `hsla(${p.hue}, 90%, 70%, ${currentAlpha * 0.05})`);
        particleGlow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = particleGlow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 8, 0, Math.PI * 2);
        ctx.fill();

        // Very soft core particle
        ctx.fillStyle = `hsla(${p.hue}, 95%, 80%, ${currentAlpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(step);
    }

    function handleResize() {
      resize();
      initParticles();
    }

    resize();
    initParticles();
    step();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none mix-blend-screen"
      aria-hidden="true"
    />
  );
}
