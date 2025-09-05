import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SpeakerSessions from './components/SpeakerSessions.jsx';
import VirtualSessions from './components/VirtualSessions.jsx';
import Community from './components/Community.jsx';
import Footer from './components/Footer.jsx';
import octopusImage from './assets/octopus.png';
import './components/animations.css';

function App() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Create smooth spring animation for scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 15,
    stiffness: 30
  });

  // Create a horizontal wave motion
  const x = useTransform(smoothProgress, value => {
    // Move from left to right in a sine wave pattern
    const amplitude = 40; // Percentage of screen width
    const frequency = 2; // Number of complete waves
    const basePosition = 50; // Center position
    return `${basePosition - Math.sin(value * Math.PI * frequency) * amplitude}%`;
  });

  return (
    <div ref={containerRef} className="bg-black min-h-screen">
      <motion.img 
        src={octopusImage} 
        alt="Floating Octopus" 
        className="floating-octopus"
        style={{
          left: x,
          top: useTransform(
            smoothProgress,
            [0, 1],
            ["20%", "80%"]
          )
        }}
        animate={{
          rotate: [-8, 8],
          y: ["-20px", "20px"]
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            repeatType: "reverse"
          },
          y: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
            repeatType: "reverse"
          }
        }}
      />
      <Header />
      <Hero />
      <SpeakerSessions />
      <VirtualSessions />
      <Community />
      <Footer />
    </div>
  );
}

export default App;