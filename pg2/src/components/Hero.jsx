import { motion } from 'framer-motion';
import octopusImage from '../assets/octopus.png';

function Hero() {
  return (
    <section className="text-white h-[calc(100vh-88px)] relative">
      <div className="container mx-auto h-full">
        <div className="flex h-full items-center">
          <div className="w-1/2">
            <h1 className="text-8xl font-bold mb-6">
              <span className="text-yellow-400">Linked</span>Out
            </h1>
            <p className="text-xl max-w-lg mb-10 text-gray-300">
              World's largest community for linkedin content creators
            </p>
            <button className="bg-white text-black font-bold py-4 px-10 rounded-lg text-lg hover:bg-yellow-400 transition-colors duration-300">
              Luna Calendar
            </button>
          </div>
        </div>
      </div>

      <motion.img 
        src={octopusImage} 
        alt="Floating Octopus" 
        className="floating-octopus"
        style={{
          right: '14%',
          top: '22%',
          width: '420px',
          height: 'auto'
        }}
        animate={{
          y: ["-15px", "15px"],
          rotate: [-2, 2]
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 2.5,
            ease: "easeInOut",
            repeatType: "reverse"
          },
          rotate: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
            repeatType: "reverse"
          }
        }}
      />
    </section>
  );
}

export default Hero;