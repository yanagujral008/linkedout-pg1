import ImageCarousel from './ImageCarousel.jsx';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';


function VirtualSessions() {
  const slides = [image1, image2, image3];

  return (
    <section className="bg-black text-white min-h-screen flex items-center relative">
      <div className="container mx-auto px-4 flex items-center justify-center">
        {/* Left Column: Content */}
        <div className="w-full md:w-1/2">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-yellow-400">Virtual</span> Speaker Sessions
            </h2>

            <div className="w-full max-w-xl aspect-video mb-12">
              <ImageCarousel images={slides} />
            </div>

            <button className="border-2 border-yellow-400 px-6 py-3 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black text-xl transition-colors duration-300">
              Follow on LinkedIn
            </button>
            
          </div>
        </div>
        
      </div>
    </section>
  );
}

export default VirtualSessions;