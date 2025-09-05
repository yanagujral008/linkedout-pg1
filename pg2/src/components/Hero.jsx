function Hero() {
  return (
    <section className="text-white py-20 h-[80vh] flex items-center">
      <div className="container mx-auto">
        <div className="w-1/2 text-left">
          <h1 className="text-7xl font-bold mb-4"><span className="text-yellow-400">Linked</span>Out</h1>
          <p className="text-lg max-w-lg mb-8">
            World's largest community for linkedin content creators
          </p>
          <button className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-yellow-400">
            Luna Calendar
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;