import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SpeakerSessions from './components/SpeakerSessions.jsx';
import Statistics from './components/Statistics.jsx';
import VirtualSessions from './components/VirtualSessions.jsx';
import Community from './components/Community.jsx';
import Footer from './components/Footer.jsx';
import './components/animations.css';

function App() {
  return (
    <div className="bg-black min-h-screen">
      <Header />
      <Hero />
      <Statistics />
      <SpeakerSessions />
      <VirtualSessions />
      <Community />
      <Footer />
    </div>
  );
}

export default App;