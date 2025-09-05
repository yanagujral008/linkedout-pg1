function SpeakerSessions() {
  return (
    <section className="bg-black text-white min-h-screen flex items-center relative">
      <div className="container mx-auto px-4">
        <div className="w-full md:w-1/2 ml-auto">
          <h2 className="text-5xl font-bold mb-8">Speaker <span className="text-yellow-400">Sessions</span></h2>
          <ul className="text-2xl space-y-6 mb-12">
            <li><span className="text-yellow-400">-</span> Corporate Training</li>
            <li><span className="text-yellow-400">-</span> Hackathon Sessions</li>
          </ul>
          <button className="border-2 border-yellow-400 px-6 py-3 rounded-md text-yellow-400 hover:bg-yellow-400 hover:text-black text-xl transition-colors duration-300">
            Contact Us (Email)
          </button>
        </div>
      </div>
    </section>
  );
}

export default SpeakerSessions;