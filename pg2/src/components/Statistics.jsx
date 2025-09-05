function Statistics() {
  const stats = [
    {
      number: "50K+",
      label: "Active Users",
      description: "Growing community of content creators"
    },
    {
      number: "100+",
      label: "Expert Speakers",
      description: "Industry leaders and professionals"
    },
    {
      number: "200+",
      label: "Sessions Conducted",
      description: "Virtual and physical events"
    },
    {
      number: "1M+",
      label: "Content Pieces",
      description: "Generated through our platform"
    }
  ];

  return (
    <section className="bg-neutral-900 text-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold mb-16">
          Our <span className="text-yellow-400">Impact</span> in Numbers
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-lg bg-black/30 backdrop-blur-sm transform hover:scale-105 transition-transform duration-300"
            >
              <div className="text-5xl font-bold text-yellow-400 mb-3">
                {stat.number}
              </div>
              <div className="text-xl font-semibold mb-2">
                {stat.label}
              </div>
              <div className="text-neutral-400">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Statistics;
