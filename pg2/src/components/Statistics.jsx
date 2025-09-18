import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useLeftToRightShuffle(finalValue, duration = 4000, fps = 30) {
  const [displayValue, setDisplayValue] = useState(finalValue.replace(/\d/g, "0"));
  const [isShuffling, setIsShuffling] = useState(true);
  const characters = "0123456789";

  useEffect(() => {
    let frame = 0;
    const totalFrames = Math.round((duration / 1000) * fps);
    const digits = finalValue.split("");

    setIsShuffling(true);

    const interval = setInterval(() => {
      frame++;
      const shuffled = digits.map((ch, idx) => {
        if (!/\d/.test(ch)) return ch; // keep K, M, +
        // each digit gets its own settle time window
        const settleFrame = Math.floor(((idx + 1) / digits.length) * totalFrames);
        if (frame >= settleFrame) return ch; // digit settled
        return characters[Math.floor(Math.random() * 10)]; // still shuffling
      });

      setDisplayValue(shuffled.join(""));

      if (frame >= totalFrames) {
        setDisplayValue(finalValue);
        setIsShuffling(false);
        clearInterval(interval);
      }
    }, 1000 / fps);

    return () => clearInterval(interval);
  }, [finalValue, duration, fps]);

  return { value: displayValue, isShuffling };
}

function Statistics() {
  const stats = [
    { 
      number: "50K+", 
      label: "Active Users", 
      description: "Growing community of content creators",
      icon: "👥"
    },
    { 
      number: "100+", 
      label: "Expert Speakers", 
      description: "Industry leaders and professionals",
      icon: "🎤"
    },
    { 
      number: "200+", 
      label: "Sessions Conducted", 
      description: "Virtual and physical events",
      icon: "📅"
    },
    { 
      number: "1M+", 
      label: "Content Pieces", 
      description: "Generated through our platform",
      icon: "📝"
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-neutral-900 via-black to-neutral-900 text-white py-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(250,204,21,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(250,204,21,0.05),transparent_50%)]"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Impact</span> in Numbers
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transforming LinkedIn content creation through community-driven innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const { value: animatedNumber, isShuffling } = useLeftToRightShuffle(stat.number, 7000, 24);
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(250,204,21,0.2)"
                }}
                className="group relative"
              >
                {/* Card background with glass morphism */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl"></div>
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center p-8">
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                  
                  <motion.div
                    className="text-5xl lg:text-6xl font-bold text-yellow-400 mb-4 font-mono tracking-wide group-hover:text-yellow-300 transition-colors duration-300"
                    animate={ isShuffling ? { scale: [1, 1.06, 1] } : { scale: 1 } }
                    transition={ isShuffling ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : { duration: 0.2 } }
                  >
                    {animatedNumber}
                  </motion.div>
                  
                  <div className="text-xl lg:text-2xl font-bold mb-3 text-white group-hover:text-yellow-100 transition-colors duration-300">
                    {stat.label}
                  </div>
                  
                  <div className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {stat.description}
                  </div>
                </div>
                
                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ padding: '2px' }}>
                  <div className="h-full w-full bg-black/90 rounded-3xl"></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
