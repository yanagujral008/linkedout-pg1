import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SpeakerSessions from './components/SpeakerSessions.jsx';
import Statistics from './components/Statistics.jsx';
import PastEvents from './components/PastEvents.jsx';
import Community from './components/Community.jsx';
import Footer from './components/Footer.jsx';
import './components/animations.css';

function App() {
  return (
    <div className="bg-gradient-to-br from-black via-neutral-950 to-black min-h-screen">
      <Header />
      <div className="pt-20">
        <Hero />
        <Statistics />
        <PastEvents />
        <SpeakerSessions />
        <Community />
        <Footer />
      </div>
    </div>
  );
}

export default App;