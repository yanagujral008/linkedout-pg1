import ImageCarousel from './ImageCarousel.jsx';

import image1 from '../assets/image1.png';
import image2 from '../assets/image2.png';
import image3 from '../assets/image3.png';


  
function SpeakerSessions() {
  const slides = [image1, image2, image3];

  return (
    <section className="bg-black text-white min-h-screen flex items-center relative">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-16">
          <div className="w-1/2">
            <div className="w-full aspect-video max-w-2xl">
              <ImageCarousel images={slides} />
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-5xl font-bold mb-8">Speaker <span className="text-yellow-400">Sessions</span></h2>
            <p className="text-2xl text-neutral-400 mb-6">
              Join us as a speaker for our upcoming events! We are looking for experts in:
            </p>
            <ul className="text-2xl space-y-6 mb-12">
              <li><span className="text-yellow-400">-</span> Corporate Training</li>
              <li><span className="text-yellow-400">-</span> Hackathon Sessions</li>
            </ul>
            <button className="border-2 border-yellow-400 px-6 py-3 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black text-xl transition-colors duration-300">
              Contact Us (Email)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SpeakerSessions;