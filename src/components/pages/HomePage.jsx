import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import React, { Suspense, useEffect, useMemo, useRef, useState } from 'react';
// No backend: use local data for testimonials
import TESTIMONIALS from '@/sections/home/Community/testimonials.data.js';
import ThreeBackground from '../ui/ThreeBackground';
import CardsSection from '@/sections/home/Cards/CardsSection';
import useMounted from '@/hooks/useMounted';
import HeroHeadline from '@/sections/home/Hero/HeroHeadline';

const FeatureBoxes = React.lazy(() => import('../ui/feature-boxes'));
// Heavy UI components are lazy-loaded in their respective sections/components

// Positioned above standing people's heads to avoid hiding faces
const silhouettes = [
  { id: 1, x: 12, y: 15, name: "Alex Chen" },
  { id: 2, x: 22, y: 18, name: "Sarah Johnson" },
  { id: 3, x: 35, y: 12, name: "Marcus Williams" },
  { id: 4, x: 48, y: 16, name: "Elena Rodriguez" },
  { id: 5, x: 62, y: 14, name: "David Kim" },
  { id: 6, x: 75, y: 19, name: "Maya Patel" },
  { id: 7, x: 85, y: 17, name: "Jordan Taylor" }
];


export default function HomePage() {
  const [testimonials, setTestimonials] = useState([]);
  const [hoveredSilhouette, setHoveredSilhouette] = useState(null);
  const headlineRef = useRef(null);
  const mounted = useMounted();

  useEffect(() => {
    // For landing page without backend, hydrate from local static data
    setTestimonials(TESTIMONIALS);
  }, []);

  // mounted is handled by useMounted() hook for hydration-safe refs

  
  const handleSilhouetteClick = (silhouetteId) => {
    const testimonial = testimonials.find(t => t.silhouetteId === silhouetteId);
    // Reserved for future use if selection detail panel is added
  };

  const handleKeyDown = (event, silhouetteId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSilhouetteClick(silhouetteId);
    }
  };

  const phrases = useMemo(() => [
    'Post smarter, faster',
    'Own your golden voice',
    'Create. Ship. Shine.'
  ], []);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [imageIndex, setImageIndex] = useState(0);
  const scrollPhrases = useMemo(() => [
    'Stop struggling with generic tools — create what sounds like you.',
    'AI‑powered content in seconds — tailored to your voice.',
    'Write less, ship faster — keep your golden tone.',
  ], []);
  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const { scrollYProgress } = useScroll({ target: mounted ? headlineRef : undefined, offset: ["start end", "end start"] });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(0.999, v));
      const idx = Math.floor(clamped * scrollPhrases.length);
      if (idx !== activePhraseIndex) setActivePhraseIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, activePhraseIndex]);
  
  // Images for carousel - using the 4 images you provided
  const carouselImages = useMemo(() => [
    '/first.png', // Community team image
    '/second.png', // Community member image  
    '/third.png', // Logo image
    '/fourth.png' // Additional logo for variety
  ], []);
  
  useEffect(() => {
    const id = window.setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);
  
  useEffect(() => {
    const id = window.setInterval(() => {
      setImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  // removed typewriter effect

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      {/* Section 1: LinkedOut Header - Modern Nuraform-inspired Design */}
      <section className="min-h-screen flex flex-col relative z-10 px-4 py-8 overflow-hidden">
        {/* Floating geometric elements */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 border-2 border-primary rounded-lg"
          animate={{
            rotate: [0, 360],
            y: [-10, 10, -10],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-32 right-20 w-12 h-12 bg-primary/20 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            x: [-5, 5, -5],
            opacity: [0.4, 0.8, 0.4]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.div
          className="absolute bottom-32 left-20 w-8 h-20 border border-primary/50"
          animate={{
            rotate: [0, 180, 360],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <div className="w-full">
          {/* Hero Content - Nuraform Style */}
          <div className="relative z-10 pt-24 md:pt-32 pb-16 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <HeroHeadline />
            
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ perspective: 900 }}
                  whileHover={{ rotateX: -8, rotateY: 8, translateZ: 8 }}
                  whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
                >
                  <motion.div
                    layout
                    transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                    className="group flex items-center gap-2"
                  >
                    <motion.button
                      layout
                      transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="order-1 group-hover:order-2 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transition-colors relative grid place-items-center h-11 w-11 rounded-full bg-yellow-400 text-black border border-yellow-300 shadow-[0_8px_24px_rgba(0,0,0,0.45)] group-hover:bg-black group-hover:text-white group-hover:border-white/25 group-hover:-translate-x-1.5 will-change-transform"
                      aria-label="Go"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        className="h-5 w-5"
                      >
                        <path d="M5 12h14" />
                        <path d="M13 5l7 7-7 7" />
                      </svg>
                    </motion.button>

                    <motion.a
                      layout
                      transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
                      href="#get-started"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="order-2 group-hover:order-1 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] transition-colors relative overflow-hidden rounded-full bg-yellow-400 text-black px-5 py-2.5 md:px-6 md:py-3 font-semibold tracking-wide border border-yellow-300 shadow-[0_8px_24px_rgba(0,0,0,0.45)] group-hover:bg-black group-hover:text-white group-hover:border-white/25 group-hover:translate-x-1.5 will-change-transform"
                    >
                      <span className="relative z-10">Test the Vibes</span>
                      <span
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                        style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(250,204,21,0.12))' }}
                      />
                    </motion.a>
                  </motion.div>
                </motion.div>

                {/* Side Links */}
            <motion.div
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {/* Decorative circles */}
                  <div className="flex gap-2 mt-2">
                    <div className="w-3 h-3 bg-primary rounded-full"></div>
                    <div className="w-3 h-3 bg-primary/60 rounded-full"></div>
                  </div>

                </motion.div>
              </div>

              {/* Right Side - Circular Image Carousel and Book-like Form in Row */}
              <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
                {/* Circle + centered description wrapper */}
                <div className="flex flex-col items-center">
                <motion.div 
                  className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex-shrink-0"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  {/* Circular Container */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={imageIndex}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={carouselImages[imageIndex]}
                          alt={`Carousel image ${imageIndex + 1}`}
                          className="object-cover w-full h-full"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10"></div>

                    {/* In-circle placeholder pill */}
                    <motion.div
                      className="absolute inset-x-6 md:inset-x-10 top-1/2 -translate-y-1/2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    >
                      <div className="relative flex items-center justify-between gap-3 rounded-full px-4 md:px-6 py-3 bg-black/50 backdrop-blur-md border border-white/20 shadow-glow">
                        <div className="flex items-center gap-2 text-white/90 text-sm md:text-base">
                          <svg className="w-4 h-4 md:w-5 md:h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 5h18" /><path d="M7 3v4" /><path d="M17 3v4" /><rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                          </svg>
                          <span className="whitespace-nowrap overflow-hidden text-ellipsis">Write your first post...</span>
                        </div>

                        <button
                          className="shrink-0 w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-primary to-primary-dark text-black grid place-items-center shadow-md hover:shadow-glow focus:outline-none focus:ring-2 focus:ring-primary/60"
                          aria-label="Generate"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14" />
                            <path d="M12 5l7 7-7 7" />
                          </svg>
                        </button>

                        {/* subtle glow ring */}
                        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/10" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                {/* Text directly below the circle, centered */}
                <motion.div
                  className="mt-6 max-w-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <p className="text-white/70 text-sm leading-relaxed">
                    The free content creation tool you always deserved. From freelancers to big businesses — create stunning, engaging content that boosts reach, captures attention, and delivers AI-driven insights.
                  </p>
                </motion.div>
                </div>

                {/* Book-like Form Structure - Right Side */}
               
              </div>
            </div>
            
            {/* Bottom Description removed – now placed under the circle */}
          </div>

            {/* Nuraform-style Cards with Animated Stats */}
            <CardsSection carouselImages={carouselImages} />
          <div className="section-divider" />
        </div>
        
        {/* Connecting lines/ropes in the background */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <motion.path
            d="M100,100 Q300,200 500,150 T900,200"
            stroke="#FFC300"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />
          <motion.path
            d="M200,300 Q400,100 600,250 T1000,300"
            stroke="#FFC300"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", delay: 1 }}
          />
        </svg>
      </section>

      {/* Section 2: ChatGPT Line - Enhanced Dynamic Floating */}
      <section className="section-spacing px-4 relative z-10 overflow-hidden">
        {/* Enhanced floating background elements */}
        <motion.div
          className="absolute top-10 left-20 w-24 h-24 border-2 border-primary/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.6, 0.2],
            x: [-10, 10, -10],
            y: [-15, 15, -15]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div
          className="absolute top-32 right-16 w-16 h-16 bg-primary/10 rounded-lg transform rotate-45"
          animate={{
            rotate: [45, 225, 405],
            y: [-20, 20, -20],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/3 w-12 h-12 border border-primary/40 rounded-full"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360],
            x: [-8, 8, -8]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-[120rem] mx-auto">
          <motion.div
            className="glass rounded-3xl p-12 relative overflow-hidden shadow-modern-lg"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 50px rgba(59, 130, 246, 0.2)",
            }}
          >
            {/* Enhanced floating particles in widget */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute bg-primary/30 rounded-full"
                style={{
                  width: `${8 + (i % 3) * 4}px`,
                  height: `${8 + (i % 3) * 4}px`,
                  left: `${5 + i * 8}%`,
                  top: `${15 + (i % 4) * 20}%`
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-5, 5, -5],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [1, 1.5, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 4 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.2
                }}
              />
            ))}

            {/* Floating geometric shapes */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={`shape-${i}`}
                className="absolute border border-primary/20"
                style={{
                  width: `${12 + (i % 2) * 8}px`,
                  height: `${12 + (i % 2) * 8}px`,
                  left: `${10 + i * 15}%`,
                  top: `${10 + (i % 3) * 25}%`,
                  borderRadius: i % 2 === 0 ? '50%' : '0'
                }}
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.7, 0.3],
                  y: [-10, 10, -10]
                }}
                transition={{
                  duration: 6 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.3
                }}
              />
            ))}

            <div className="text-center mb-8 relative z-10" ref={headlineRef}>
              <motion.h2 
                className="text-4xl md:text-5xl font-heading font-bold text-white mb-2 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
              >
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activePhraseIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeInOut' }}
                  >
                    {scrollPhrases[activePhraseIndex].split(' ').map((word, idx) => (
                      <span key={`${word}-${idx}`} className={idx % 2 === 0 ? 'float3d' : 'float3d--alt'}>
                        {word}{' '}
                      </span>
                    ))}
                  </motion.span>
                </AnimatePresence>
              </motion.h2>
            </div>

            {/* Enhanced Testimonials Label */}
            <div className="text-center relative z-10">
              <motion.p 
                className="text-white/70 font-paragraph mb-6 text-base relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                animate={{
                  y: [-2, 2, -2]
                }}
                whileHover={{
                  color: "#FFC300",
                  scale: 1.1
                }}
              >
               
                {/* Floating underline */}
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.p>
            </div>

            {/* Enhanced connecting ropes within the widget */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
              <motion.path
                d="M50,50 Q150,100 250,80 T450,120"
                stroke="#FFC300"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
              />
              <motion.path
                d="M100,150 Q200,50 300,120 T500,80"
                stroke="#FFC300"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 5, repeat: Infinity, repeatType: "reverse", delay: 1 }}
              />
              <motion.path
                d="M0,100 Q100,200 200,150 T400,180"
                stroke="#FFC300"
                strokeWidth="1.5"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", delay: 2 }}
              />
            </svg>

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
        </div>
      </section>

      {/* Feature Boxes Section - Nuraform Style */}
      <Suspense fallback={null}>
        <FeatureBoxes />
      </Suspense>

      {/* Section 3: One Prompt Line - Following Wireframe */}
      

      {/* Section 4: Community Picture - Following Wireframe */}
      <section className="section-spacing px-4 relative z-10 overflow-hidden">
        {/* Floating background elements */}
        <motion.div
          className="absolute top-10 right-10 w-20 h-20 border border-primary/30 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute bottom-20 left-10 w-16 h-16 bg-primary/10 transform rotate-45"
          animate={{
            y: [-20, 20, -20],
            rotate: [45, 225, 45]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-[120rem] mx-auto relative">
          {/* Dynamic "Meet Our Community" Heading */}
          <motion.div
            className="text-center mb-16 relative"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Floating decorative elements around heading */}
            <motion.div
              className="absolute -top-8 left-1/4 w-6 h-6 border-2 border-primary/40 rounded-full"
              animate={{
                rotate: [0, 360],
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            <motion.div
              className="absolute -top-4 right-1/4 w-4 h-4 bg-primary/30 rounded-lg transform rotate-45"
              animate={{
                rotate: [45, 405],
                y: [-5, 5, -5],
                opacity: [0.3, 0.7, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            />

            <motion.div
              className="absolute -bottom-6 left-1/3 w-3 h-3 bg-primary/50 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                y: [-3, 3, -3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />

            <motion.h2
              className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 relative"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {/* Typewriter effect for each word */}
              {["meet", "our", "community"].map((word, wordIndex) => (
                <motion.span
                  key={wordIndex}
                  className="inline-block mr-4 relative"
                  variants={{
                    hidden: { opacity: 0, y: 30, rotateX: -90 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      rotateX: 0,
                      transition: {
                        type: "spring",
                        damping: 12,
                        stiffness: 200,
                        delay: wordIndex * 0.2
                      }
                    }
                  }}
                  whileHover={{
                    scale: 1.1,
                    color: "#3B82F6",
                    textShadow: "0 0 30px #3B82F6"
                  }}
                >
                  {word.split('').map((letter, letterIndex) => (
                    <motion.span
                      key={letterIndex}
                      className="inline-block"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: wordIndex * 0.3 + letterIndex * 0.05,
                        duration: 0.1
                      }}
                    >
                      {letter}
                    </motion.span>
                  ))}
                  
                  {/* Enhanced glowing effect for each word */}
                  <motion.div
                    className="absolute inset-0 text-primary opacity-30 blur-sm"
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scale: [1, 1.05, 1]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: wordIndex * 0.5
                    }}
                  >
                    {word}
                  </motion.div>
                </motion.span>
              ))}
              
              {/* Animated underline */}
              <motion.div
                className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: "300px", opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
              />
            </motion.h2>

            <motion.p
              className="text-xl font-paragraph text-medium-grey max-w-2xl mx-auto relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                color: "#3B82F6"
              }}
            >
              Discover the amazing people behind our innovative platform
              
              {/* Floating particles around the subtitle */}
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-primary/60 rounded-full"
                  style={{
                    left: `${10 + i * 25}%`,
                    top: `${20 + (i % 2) * 60}%`
                  }}
                  animate={{
                    y: [-8, 8, -8],
                    opacity: [0.4, 0.9, 0.4],
                    scale: [1, 1.4, 1]
                  }}
                  transition={{
                    duration: 2.5 + i * 0.3,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.4
                  }}
                />
              ))}
            </motion.p>

            {/* Connecting animated lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30">
              <motion.path
                d="M100,50 Q200,20 300,50 T500,40"
                stroke="#FFC300"
                strokeWidth="1"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.2, duration: 2, ease: "easeInOut" }}
              />
              <motion.path
                d="M150,80 Q250,110 350,80 T550,90"
                stroke="#FFC300"
                strokeWidth="0.8"
                fill="none"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.5, duration: 2.5, ease: "easeInOut" }}
              />
            </svg>

            {/* Pulsing glow effect behind the heading */}
            <motion.div
              className="absolute inset-0 bg-primary/5 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          {/* Community Picture Section */}
          <div className="grid md:grid-cols-5 gap-8 items-start">
            {/* Left Side - Community Image (3 columns) */}
            <motion.div
              className="md:col-span-3 relative overflow-hidden rounded-3xl"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/Commnity.jpg"
                alt="Our community team gathered together in the office"
                className="w-full h-auto rounded-3xl shadow-2xl"
                width={800}
              />
              
              {/* Glowing border effect */}
              <motion.div
                className="absolute inset-0 rounded-3xl border-2 border-primary/50"
                animate={{
                  boxShadow: [
                    "0 0 20px rgba(255, 195, 0, 0.3)",
                    "0 0 40px rgba(255, 195, 0, 0.6)",
                    "0 0 20px rgba(255, 195, 0, 0.3)"
                  ]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Silhouette Indicators - simple downward arrows above heads */}
              {silhouettes.map((silhouette) => (
                <motion.button
                  key={silhouette.id}
                  className={`absolute w-8 h-16 cursor-pointer transition-all duration-300 focus:outline-none focus:ring-0 ${
                    hoveredSilhouette === silhouette.id ? 'scale-125' : 'hover:scale-110'
                  }`}
                  style={{
                    left: `${silhouette.x}%`,
                    top: `${silhouette.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                  onClick={() => handleSilhouetteClick(silhouette.id)}
                  onKeyDown={(e) => handleKeyDown(e, silhouette.id)}
                  onMouseEnter={() => setHoveredSilhouette(silhouette.id)}
                  onMouseLeave={() => setHoveredSilhouette(null)}
                  tabIndex={0}
                  aria-label={`View testimonial from ${silhouette.name}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Downward arrow pointer character */}
                  <motion.div
                    className="absolute -top-12 left-1/2 -translate-x-1/2"
                    animate={{ y: [-4, 4, -4], opacity: [0.85, 1, 0.9] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="relative inline-block">
                      {/* White pill with subtle black outline for visibility */}
                      <div className="pointer-events-none absolute -inset-2 rounded-full bg-white/25 backdrop-blur-sm border border-black/40 shadow-[0_0_12px_rgba(0,0,0,0.35)]"></div>
                      <span className="relative text-6xl md:text-7xl leading-none text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.65)]">↓</span>
                    </div>
                  </motion.div>
                  
                  {/* Floating animation for the button itself */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      y: [-1, 1, -1]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </motion.button>
              ))}
              
              {/* Connecting ropes between bubbles */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                {silhouettes.map((silhouette, index) => {
                  if (index === silhouettes.length - 1) return null;
                  const nextSilhouette = silhouettes[index + 1];
                  return (
                    <motion.line
                      key={`connection-${index}`}
                      x1={`${silhouette.x}%`}
                      y1={`${silhouette.y}%`}
                      x2={`${nextSilhouette.x}%`}
                      y2={`${nextSilhouette.y}%`}
                      stroke="#FFC300"
                      strokeWidth="1"
                      opacity="0.3"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                  );
                })}
              </svg>
            </motion.div>
            <div className="md:col-span-2 relative flex items-start justify-center">
              <div className="text-center py-8 relative w-full">
                <motion.div 
                  className="text-6xl mb-4"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  ↓
                </motion.div>
                <h3 className="text-2xl font-heading font-semibold text-white mb-4">Click on the arrow</h3>
                <p className="text-lg font-paragraph text-white/70">Don't just take our word for it -hear from our community</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centered CTA below the community image */}
      <div className="mt-8 flex justify-center">
        <a
          href="/community"
          className="bg-primary/20 text-white border border-primary/50 py-3 px-8 rounded-2xl font-semibold hover:bg-primary/30 transition-all duration-300 relative overflow-hidden group text-lg"
        >
          <span className="relative z-10">know about the coummunity</span>
          <span className="absolute inset-0 bg-gradient-to-r from-primary/30 to-yellow-400/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </a>
      </div>

      {/* Section 5: Footer - Modern Design */}
      <footer className="bg-gradient-to-b from-background to-dark-grey section-spacing px-4 relative z-10 overflow-hidden">
        {/* Enhanced floating background elements */}
        <motion.div
          className="absolute top-10 left-10 w-32 h-32 border-2 border-primary/20 rounded-full"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <motion.div
          className="absolute top-20 right-20 w-20 h-20 bg-primary/10 rounded-lg transform rotate-45"
          animate={{
            rotate: [45, 405],
            y: [-15, 15, -15],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <motion.div
          className="absolute bottom-20 left-1/4 w-16 h-16 border border-primary/30 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.8, 0.4],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        <div className="max-w-[120rem] mx-auto relative">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* LinkedOut Brand Section */}
            <motion.div
              className="md:col-span-1"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <motion.div 
                className="flex items-center space-x-3 mb-6"
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                    <Image
    src="/LOGO.jpg"
                    alt="LinkedOut Logo"
                    width={24}
                    height={24}
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="text-white font-heading font-bold text-2xl gradient-text">linkedout</span>
              </motion.div>
              <p className="text-white/70 font-paragraph leading-relaxed">
                Building the future of community-driven content creation with AI-powered tools.
              </p>
            </motion.div>

            {/* Community Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h4 className="text-xl font-heading font-semibold text-white mb-6 relative">
                Community
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </h4>
              <div className="space-y-3">
                <motion.a 
                  href="/community" 
                  className="block text-white/70 font-paragraph hover:text-primary transition-colors"
                  whileHover={{ x: 5, color: "#FFC300" }}
                >
                  Join Community
                </motion.a>
                <motion.a 
                  href="#" 
                  className="block text-white/70 font-paragraph hover:text-primary transition-colors"
                  whileHover={{ x: 5, color: "#FFC300" }}
                >
                  Get Support
                </motion.a>
              </div>
            </motion.div>
            
            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h4 className="text-xl font-heading font-semibold text-white mb-6 relative">
                Features
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "60px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </h4>
              <div className="space-y-3">
                <motion.a 
                  href="#" 
                  className="block text-white/70 font-paragraph hover:text-primary transition-colors"
                  whileHover={{ x: 5, color: "#FFC300" }}
                >
                  AI Writing
                </motion.a>
              </div>
            </motion.div>
            
            {/* Get Started Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <h4 className="text-xl font-heading font-semibold text-white mb-6 relative">
                Get Started
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-primary"
                  initial={{ width: 0 }}
                  whileInView={{ width: "80px" }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                />
              </h4>
              <motion.div
                className="space-y-4"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="w-full gradient-primary text-primary-foreground hover:gradient-primary-hover transition-all duration-300 relative overflow-hidden group py-3 px-6 rounded-xl font-semibold shadow-modern"
                  >
                    <span className="relative z-10">Join Today</span>
                  </Button>
                </motion.div>
                <p className="text-white/60 font-paragraph text-sm">
                  Start creating amazing content in seconds
                </p>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Footer Bottom */}
          <motion.div 
            className="border-t border-white/20 pt-8 relative"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            {/* Enhanced connecting line animation */}
            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-px bg-gradient-to-r from-transparent via-primary to-transparent"
              initial={{ width: 0, opacity: 0 }}
              whileInView={{ width: "192px", opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9, duration: 1.5 }}
            />
            
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-white/50 font-paragraph">
                2025 LinkedOut. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
              </div>
            </div>
            
            {/* Enhanced floating particles */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1.5 h-1.5 bg-primary/40 rounded-full"
                style={{
                  left: `${20 + i * 15}%`,
                  top: "50%"
                }}
                animate={{
                  y: [-8, 8, -8],
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.4
                }}
              />
            ))}
          </motion.div>
        </div>
      </footer>
    </div>
  );
}