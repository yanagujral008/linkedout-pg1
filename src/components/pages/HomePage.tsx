import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { Testimonials } from '@/entities/testimonials';
import { AnimatePresence, motion, useScroll } from 'framer-motion';
import { Settings, Target, Zap } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BaseCrudService } from '../../../integrations';
import FeatureBoxes from '../ui/feature-boxes';

interface Silhouette {
  id: number;
  x: number;
  y: number;
  name: string;
}

// Positioned above standing people's heads to avoid hiding faces
const silhouettes: Silhouette[] = [
  { id: 1, x: 12, y: 15, name: "Alex Chen" },
  { id: 2, x: 22, y: 18, name: "Sarah Johnson" },
  { id: 3, x: 35, y: 12, name: "Marcus Williams" },
  { id: 4, x: 48, y: 16, name: "Elena Rodriguez" },
  { id: 5, x: 62, y: 14, name: "David Kim" },
  { id: 6, x: 75, y: 19, name: "Maya Patel" },
  { id: 7, x: 85, y: 17, name: "Jordan Taylor" }
];

export default function HomePage() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonials | null>(null);
  const [testimonials, setTestimonials] = useState<Testimonials[]>([]);
  const [hoveredSilhouette, setHoveredSilhouette] = useState<number | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const { items } = await BaseCrudService.getAll<Testimonials>('testimonials');
        setTestimonials(items);
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Create floating particles with glow effect
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 150;
    const posArray = new Float32Array(particlesCount * 3);
    const velocities = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 15;
      posArray[i + 1] = (Math.random() - 0.5) * 15;
      posArray[i + 2] = (Math.random() - 0.5) * 15;
      
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0xFFC300,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Create floating geometric shapes
    type ShapeObj = { mesh: THREE.Mesh; velocity: { x: number; y: number; z: number } };
    const shapes: ShapeObj[] = [];
    for (let i = 0; i < 20; i++) {
      const geometry = Math.random() > 0.5 
        ? new THREE.BoxGeometry(0.1, 0.1, 0.1)
        : new THREE.SphereGeometry(0.05, 8, 8);
      
      const material = new THREE.MeshBasicMaterial({
        color: 0xFFC300,
        transparent: true,
        opacity: 0.3,
        wireframe: true
      });
      
      const shape = new THREE.Mesh(geometry, material);
      shape.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      );
      
      shapes.push({
        mesh: shape,
        velocity: {
          x: (Math.random() - 0.5) * 0.01,
          y: (Math.random() - 0.5) * 0.01,
          z: (Math.random() - 0.5) * 0.01
        }
      });
      
      scene.add(shape);
    }

    // Create connecting lines/ropes between shapes
    type Connection = { line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>; from: number; to: number };
    const connections: Connection[] = [];
    for (let i = 0; i < shapes.length - 1; i++) {
      const points = [
        shapes[i].mesh.position,
        shapes[i + 1].mesh.position
      ];
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0xFFC300,
        transparent: true,
        opacity: 0.2
      });
      
      const line = new THREE.Line(geometry, material);
      connections.push({ line, from: i, to: i + 1 });
      scene.add(line);
    }

    camera.position.z = 5;

    let time = 0;

    // Enhanced animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      time += 0.01;
      
      // Animate particles with floating motion
      const positions = particlesMesh.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1] + Math.sin(time + i) * 0.001;
        positions[i + 2] += velocities[i + 2];
        
        // Boundary check
        if (Math.abs(positions[i]) > 7.5) velocities[i] *= -1;
        if (Math.abs(positions[i + 1]) > 7.5) velocities[i + 1] *= -1;
        if (Math.abs(positions[i + 2]) > 7.5) velocities[i + 2] *= -1;
      }
      particlesMesh.geometry.attributes.position.needsUpdate = true;
      
      // Animate floating shapes
      shapes.forEach((shape, index) => {
        shape.mesh.position.x += shape.velocity.x;
        shape.mesh.position.y += shape.velocity.y + Math.sin(time + index) * 0.002;
        shape.mesh.position.z += shape.velocity.z;
        
        shape.mesh.rotation.x += 0.01;
        shape.mesh.rotation.y += 0.01;
        
        // Boundary check
        if (Math.abs(shape.mesh.position.x) > 5) shape.velocity.x *= -1;
        if (Math.abs(shape.mesh.position.y) > 5) shape.velocity.y *= -1;
        if (Math.abs(shape.mesh.position.z) > 5) shape.velocity.z *= -1;
      });
      
      // Update connecting lines
      connections.forEach(connection => {
        const points = [
          shapes[connection.from].mesh.position,
          shapes[connection.to].mesh.position
        ];
        connection.line.geometry.setFromPoints(points);
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const handleSilhouetteClick = (silhouetteId: number) => {
    const testimonial = testimonials.find(t => t.silhouetteId === silhouetteId);
    if (testimonial) {
      setSelectedTestimonial(testimonial);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, silhouetteId: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleSilhouetteClick(silhouetteId);
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'features', label: 'Features' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact' }
  ];
  const phrases = [
    'Post smarter, faster',
    'Own your golden voice',
    'Create. Ship. Shine.'
  ];
  const [phraseIndex, setPhraseIndex] = useState<number>(0);
  const [imageIndex, setImageIndex] = useState<number>(0);
  const scrollPhrases = [
    'Stop struggling with generic tools — create what sounds like you.',
    'AI‑powered content in seconds — tailored to your voice.',
    'Write less, ship faster — keep your golden tone.',
  ];
  const [activePhraseIndex, setActivePhraseIndex] = useState<number>(0);
  const headlineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: headlineRef, offset: ["start end", "end start"] });
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      const clamped = Math.max(0, Math.min(0.999, v));
      const idx = Math.floor(clamped * scrollPhrases.length);
      if (idx !== activePhraseIndex) setActivePhraseIndex(idx);
    });
    return () => unsubscribe();
  }, [scrollYProgress, activePhraseIndex]);
  
  // Images for carousel - using the 4 images you provided
  const carouselImages = [
    '/first.png', // Community team image
    '/second.png', // Community member image  
    '/third.png', // Logo image
    '/fourth.png' // Additional logo for variety
  ];
  
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
      <div 
        ref={mountRef} 
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />

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

        {/* Fixed Navbar - Minimal Nuraform-like layout */}
        <div className="w-full">
          <motion.nav 
            className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-7xl mx-auto flex items-center">
              {/* Left: Logo + Brand */}
            <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.02 }}
            >
                <div className="w-10 h-10 rounded-xl overflow-hidden">
                <Image
    src="/LOGO.jpg"
                    alt="LinkedOut Logo"
                    width={40}
                    height={40}
                    className="object-cover w-10 h-10"
                  />
              </div>
                <span className="text-white font-heading font-bold text-2xl">linkedout</span>
            </motion.div>
            
              {/* Center: Simple text links */}
              <div className="hidden md:flex flex-1 justify-center gap-6">
                {navLinks.map((link) => (
                  <a
                    key={link.id}
                    href="#"
                    className="text-white/80 hover:text-white text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Right: CTA */}
              <div className="ml-auto">
                <motion.div
                  style={{ perspective: 800 }}
                  whileHover={{ rotateX: -6, rotateY: 6, translateZ: 6 }}
                  whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
                >
                  <Button 
                    size="sm"
                    className="btn-nura rounded-full px-5 py-2 text-sm font-semibold"
                  >
                    <span className="btn-nura__label">Get Started Now</span>
                    <span className="btn-nura__arrow">→</span>
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.nav>

          {/* Hero Content - Nuraform Style */}
          <div className="relative z-10 pt-24 md:pt-32 pb-16 min-h-screen flex items-center">
            <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Text Content */}
              <div className="space-y-8">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold text-white leading-tight"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Stunning, AI-Powered Content in Seconds.
            </motion.h1>
            
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  style={{ perspective: 900 }}
                  whileHover={{ rotateX: -8, rotateY: 8, translateZ: 8 }}
                  whileTap={{ scale: 0.98, rotateX: 0, rotateY: 0 }}
                >
                  <Button 
                    className="btn-nura px-8 py-4 rounded-full font-semibold text-lg flex items-center gap-2"
                  >
                    <span className="btn-nura__label">Test the Vibes</span>
                    <span className="btn-nura__arrow">→</span>
                  </Button>
                </motion.div>

                {/* Side Links */}
            <motion.div
                  className="flex flex-col gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  <a href="#" className="text-white/70 hover:text-primary text-lg flex items-center gap-2 group">
                    See example 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  <a href="#" className="text-white/70 hover:text-primary text-lg flex items-center gap-2 group">
                    Get in touch 
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
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
            <div className="mt-24 space-y-16 px-4">
              {[
                { 
                  title: 'Complete Post in Seconds', 
                  desc: 'One prompt. One click. Done.',
                  stats: ['2.3s', '1.8s', '2.1s', '1.9s'],
                  labels: ['Avg. Generation', 'Fastest Time', 'Quality Score', 'User Rating'],
                  gradient: 'from-pink-400 via-orange-400 to-yellow-400'
                },
                { 
                  title: 'Create Content, Sound Right', 
                  desc: 'Always on-tone with your golden voice.',
                  stats: ['2.4K', '89%', '156', '4.2K'],
                  labels: ['Avg. Engagement', 'Voice Match Rate', 'Posts Created', 'Community Members'],
                  gradient: 'from-purple-400 via-pink-400 to-orange-400'
                },
                { 
                  title: 'Get Multiple Agents', 
                  desc: 'Specialized assistants per workflow.',
                  stats: ['LinkedIn', 'Twitter', 'Instagram', 'TikTok'],
                  labels: ['Platform Focus', 'Content Type', 'Audience Size', 'Engagement Boost'],
                  gradient: 'from-blue-400 via-purple-400 to-pink-400'
                }
              ].map((card, idx) => (
                <div key={card.title} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                  {/* Text Content */}
                  <div className={`flex ${idx % 2 === 1 ? 'justify-end' : 'justify-start'} items-center`}>
                    <div className="max-w-lg">
                      <motion.h3 
                        className="text-3xl md:text-4xl font-heading font-bold text-white mb-4"
                        initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                      >
                        {card.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/70 text-lg mb-6"
                        initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                      >
                        {card.desc}
                      </motion.p>
            <motion.div
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: idx % 2 === 1 ? 50 : -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                      >
                        <Button className="bg-white text-black px-6 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors">
                          Try Now
                        </Button>
                        <button className="text-white/70 hover:text-white text-sm flex items-center gap-1">
                          Learn more 
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
            </motion.div>
                    </div>
          </div>

                  {/* Animated Stats Card */}
                  <motion.div
                    className="relative"
                    initial={{ opacity: 0, x: idx % 2 === 1 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    animate={{ y: [0, -6, 0], rotate: [0, 0.4, 0] }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.1,
                      y: { duration: 6, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: idx * 0.2 },
                      rotate: { duration: 10, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }
                    }}
                  >
                    <div className={`bg-gradient-to-br ${card.gradient} rounded-3xl p-8 shadow-2xl relative overflow-hidden`}>
                      {/* Floating background elements */}
                      <div className="absolute inset-0 bg-white/10 rounded-3xl" />
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl" />
                      <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/15 rounded-full blur-lg" />
                      
                      {/* Card Header */}
                      <div className="relative z-10 mb-6">
                        <h4 className="text-white font-bold text-xl mb-2">Live Stats</h4>
                        <p className="text-white/80 text-sm">Real-time performance metrics</p>
                    </div>

                      {/* Animated Stats Grid */}
                      <div className="relative z-10 grid grid-cols-2 gap-4">
                        {card.stats.map((stat, statIdx) => (
                          <motion.div
                            key={statIdx}
                            className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 border border-white/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 + statIdx * 0.1 }}
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.3)' }}
                          >
                            <motion.div
                              className="text-2xl font-bold text-white mb-1"
                              animate={{ 
                                scale: [1, 1.1, 1],
                                opacity: [0.8, 1, 0.8]
                              }}
                              transition={{ 
                                duration: 2 + statIdx * 0.5,
                                repeat: Infinity,
                                delay: statIdx * 0.3
                              }}
                            >
                              {stat}
                  </motion.div>
                            <div className="text-white/70 text-xs font-medium">
                              {card.labels[statIdx]}
                      </div>
                          </motion.div>
                        ))}
                    </div>

                      {/* Animated Progress Bar */}
                      <motion.div
                        className="relative z-10 mt-6"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <div className="text-white/80 text-sm mb-2">Overall Performance</div>
                        <div className="bg-white/20 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className="bg-white h-full rounded-full"
                            initial={{ width: 0 }}
                            whileInView={{ width: "85%" }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.6 }}
                          />
                  </div>
                      </motion.div>

                      {/* Floating particles */}
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-white/40 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 3 + i * 0.5,
                            repeat: Infinity,
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
          </div>
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
      <FeatureBoxes />

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
          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Side - Community Image (3 columns) */}
            <motion.div
              className="lg:col-span-3 relative overflow-hidden rounded-3xl"
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
                        duration: 2,
                        delay: index * 0.2,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  );
                })}
              </svg>

              {/* Community Description - Below Image as Button */}
              <motion.div
                className="text-center mt-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button 
                    className="bg-primary/20 text-white border border-primary/50 py-3 px-8 rounded-2xl font-semibold hover:bg-primary/30 transition-all duration-300 relative overflow-hidden group text-lg"
                    size="lg"
                  >
                    <span className="relative z-10">know about the community</span>
                    {/* Animated background */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-primary/30 to-yellow-400/30"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                    {/* Glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-primary/20 opacity-50 blur-md"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Right Side - Testimonial Display Area (2 columns) */}
            <div className="lg:col-span-2 relative min-h-[600px]">
              {/* Floating decorative elements */}
              <motion.div
                className="absolute -top-10 -right-5 w-12 h-12 border-2 border-primary/30 rounded-lg"
                animate={{
                  rotate: [0, 180, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              <div className="sticky top-8">
                <AnimatePresence mode="wait">
                  {selectedTestimonial ? (
                    <motion.div
                      key={selectedTestimonial._id}
                      initial={{ opacity: 0, x: 50, scale: 0.9, rotateY: 90 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                      exit={{ opacity: 0, x: -50, scale: 0.9, rotateY: -90 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full"
                    >
                      <Card className="bg-light-grey border-primary border-2 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        {/* Animated background gradient */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"
                          animate={{
                            opacity: [0.1, 0.3, 0.1]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        
                        <div className="relative z-10">
                          <div className="flex items-start space-x-4 mb-6">
                            {selectedTestimonial.authorImage && (
                              <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="relative"
                              >
                                <Image
                                  src="./Coummunity.jpg"
                                  alt={`${selectedTestimonial.authorName || 'Community member'} 
                                  profile picture`}
                                  className="w-16 h-16 rounded-full object-cover border-2 border-primary"
                                  width={64}
                                />
                                {/* Glowing ring */}
                                <motion.div
                                  className="absolute inset-0 rounded-full border-2 border-primary"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Infinity
                                  }}
                                />
                              </motion.div>
                            )}
                            <div>
                              <motion.h3 
                                className="text-xl font-heading font-semibold text-white"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                              >
                                {selectedTestimonial.authorName}
                              </motion.h3>
                              <motion.p 
                                className="text-primary font-paragraph"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                              >
                                {selectedTestimonial.authorTitle}
                              </motion.p>
                            </div>
                          </div>
                          
                          <motion.blockquote 
                            className="text-lg font-paragraph text-white leading-relaxed italic relative"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <span className="text-primary text-4xl absolute -top-2 -left-2">"</span>
                            {selectedTestimonial.testimonialText}
                            <span className="text-primary text-4xl">"</span>
                          </motion.blockquote>
                          
                          {selectedTestimonial.testimonialDate && (
                            <motion.p 
                              className="text-sm text-white/70 mt-4 font-paragraph"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.6 }}
                            >
                              {new Date(selectedTestimonial.testimonialDate).toLocaleDateString()}
                            </motion.p>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-16 relative w-full"
                    >
                      <motion.div 
                        className="text-6xl mb-4"
                        animate={{
                          scale: [1, 1.1, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        ↓
                      </motion.div>
                      <h3 className="text-2xl font-heading font-semibold text-white mb-4">
                        Click on the arrow
                      </h3>
                      <p className="text-lg font-paragraph text-white/70">
                      Don't just take our word for it -hear from our community
                      </p>
                      
                      {/* Floating particles around the placeholder */}
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-2 h-2 bg-primary/30 rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 20}%`
                          }}
                          animate={{
                            y: [-10, 10, -10],
                            opacity: [0.3, 0.8, 0.3]
                          }}
                          transition={{
                            duration: 2 + i * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: i * 0.3
                          }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

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
                  href="#" 
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
                  Share Stories
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
                <motion.a 
                  href="#" 
                  className="block text-white/70 font-paragraph hover:text-primary transition-colors"
                  whileHover={{ x: 5, color: "#FFC300" }}
                >
                  Voice Analysis
                </motion.a>
                <motion.a 
                  href="#" 
                  className="block text-white/70 font-paragraph hover:text-primary transition-colors"
                  whileHover={{ x: 5, color: "#FFC300" }}
                >
                  Project Management
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
                © 2025 LinkedOut. All rights reserved.
              </p>
              
              <div className="flex space-x-6">
                <motion.a 
                  href="#" 
                  className="text-white/50 hover:text-primary transition-colors font-paragraph text-sm"
                  whileHover={{ y: -2 }}
                >
                  Privacy Policy
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white/50 hover:text-primary transition-colors font-paragraph text-sm"
                  whileHover={{ y: -2 }}
                >
                  Terms of Service
                </motion.a>
                <motion.a 
                  href="#" 
                  className="text-white/50 hover:text-primary transition-colors font-paragraph text-sm"
                  whileHover={{ y: -2 }}
                >
                  Contact
                </motion.a>
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