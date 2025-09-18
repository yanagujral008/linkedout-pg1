import logo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Header() {
  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 text-white"
    >
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-bold"
        >
          <Link to="/">
            <img src={logo} alt="Logo" className="h-12 cursor-pointer transition-all duration-300 hover:drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
          </Link>
        </motion.div>

        <div className="flex items-center space-x-8">
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium tracking-wide group"
          >
            Post Generator
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, y: -2 }}
            className="relative text-gray-300 hover:text-yellow-400 transition-all duration-300 font-medium tracking-wide group"
          >
            Join Community
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-300"></span>
          </motion.a>
          
          <motion.a 
            href="#" 
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(250,204,21,0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-3 rounded-full font-semibold tracking-wide shadow-lg hover:shadow-yellow-400/25 transition-all duration-300 group"
          >
            <span className="relative z-10">Log In / Sign Up</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </motion.a>
        </div>
      </nav>
    </motion.header>
  );
}

export default Header;