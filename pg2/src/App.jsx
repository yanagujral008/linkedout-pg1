import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import SpeakerSessions from './components/SpeakerSessions.jsx';
import Statistics from './components/Statistics.jsx';
import PastEvents from './components/PastEvents.jsx';
import Community from './components/Community.jsx';
import Footer from './components/Footer.jsx';
import './components/animations.css';
import GlobalBackground from './components/GlobalBackground.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';

function App() {
  return (
    <div className="relative min-h-screen bg-black">
      <ScrollProgress />
      <GlobalBackground />
      <Header />
      <div className="relative z-10">
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