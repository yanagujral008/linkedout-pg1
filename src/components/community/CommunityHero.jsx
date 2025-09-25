import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function CommunityHero() {
  const navigate = useNavigate();

  return (
    <section className="relative text-white min-h-[90vh] overflow-hidden pt-24 md:pt-28">
      <div className="container mx-auto h-full relative z-10">
        <div className="flex items-center gap-8 md:gap-12 min-h-[70vh] lg:min-h-[80vh] flex-col md:flex-row">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full md:w-7/12 flex flex-col items-start px-6 md:px-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-400/30 bg-yellow-400/10 px-4 py-1.5 text-sm text-yellow-300"
            >
              <span className="h-2 w-2 rounded-full bg-yellow-400 animate-pulse" />
              The home for LinkedIn creators
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-[1.05] tracking-tight"
            >
              <motion.span
                className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Linked
              </motion.span>
              <span className="text-white">Out</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg md:text-xl lg:text-2xl max-w-2xl mb-10 text-gray-300 leading-relaxed"
            >
              World's largest community for <span className="text-yellow-400 font-semibold">LinkedIn content creators</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <motion.button
                onClick={() => navigate('/signup')}
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(250,204,21,0.35)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-4 px-8 rounded-2xl text-lg shadow-2xl group transition-all duration-300"
              >
                <span className="relative z-10 whitespace-nowrap">Join Community</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>

              <motion.button
                onClick={() => navigate('/past-events')}
                whileHover={{ scale: 1.05, borderColor: "rgb(250 204 21)" }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden bg-transparent text-yellow-400 font-bold py-4 px-8 rounded-2xl text-lg border-2 border-yellow-400/50 hover:bg-yellow-400/10 transition-all duration-300 group"
              >
                <span className="relative z-10 whitespace-nowrap">Explore Past Events</span>
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Animated octopus character */}
      <motion.div
        className="absolute right-10 lg:right-20 top-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
          y: ["-15px", "15px"],
          rotate: [-2, 2],
        }}
        transition={{
          opacity: { duration: 1, delay: 1 },
          scale: { duration: 1, delay: 1 },
          y: { repeat: Infinity, duration: 2.5, ease: "easeInOut", repeatType: "reverse" },
          rotate: { repeat: Infinity, duration: 3, ease: "easeInOut", repeatType: "reverse" },
        }}
        style={{ right: '8%', top: '60%' }}
      >
        {/* Octopus SVG */}
        <svg 
          width="400" 
          height="400" 
          viewBox="0 0 400 400" 
          className="w-[clamp(300px,40vw,520px)] h-auto drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]"
        >
          {/* Octopus body */}
          <circle cx="200" cy="180" r="80" fill="#FFC300" />
          
          {/* Eyes */}
          <circle cx="175" cy="160" r="15" fill="#000" />
          <circle cx="225" cy="160" r="15" fill="#000" />
          <circle cx="180" cy="155" r="5" fill="#FFF" />
          <circle cx="230" cy="155" r="5" fill="#FFF" />
          
          {/* Smile */}
          <path d="M 170 200 Q 200 220 230 200" stroke="#000" strokeWidth="4" fill="none" strokeLinecap="round" />
          
          {/* Tentacles */}
          <path d="M 140 240 Q 120 280 140 320 Q 160 340 180 320 Q 200 300 180 280" fill="#FFC300" />
          <path d="M 170 250 Q 150 290 170 330 Q 190 350 210 330 Q 230 310 210 290" fill="#FFC300" />
          <path d="M 200 260 Q 180 300 200 340 Q 220 360 240 340 Q 260 320 240 300" fill="#FFC300" />
          <path d="M 230 250 Q 250 290 230 330 Q 210 350 190 330 Q 170 310 190 290" fill="#FFC300" />
          <path d="M 260 240 Q 280 280 260 320 Q 240 340 220 320 Q 200 300 220 280" fill="#FFC300" />
          
          {/* Laptop on tentacle */}
          <g transform="translate(320, 200) rotate(15)">
            <rect x="0" y="0" width="60" height="40" rx="4" fill="#333" />
            <rect x="5" y="5" width="50" height="30" fill="#000" />
            <rect x="0" y="40" width="60" height="8" rx="2" fill="#666" />
          </g>
        </svg>
      </motion.div>
    </section>
  );
}

export default CommunityHero;
