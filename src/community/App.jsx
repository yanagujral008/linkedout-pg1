// @ts-nocheck
import Header from './components/Header';
import Hero from './components/Hero';
import SpeakerSessions from './components/SpeakerSessions';
import Statistics from './components/Statistics';
import PastEvents from './components/PastEvents';
import Community from './components/Community';
import Footer from './components/Footer';
import './components/animations.css';
import ScrollProgress from './components/ScrollProgress';
import ThreeBackground from './components/ThreeBackground';

export default function CommunityApp() {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-hidden">
      <ScrollProgress />
      <ThreeBackground />
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
