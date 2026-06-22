import CV from '@/sections/CV';
import Certificates from '@/sections/Certificates';
import Footer from '@/sections/Footer';
import Hero from '@/sections/Hero';
import Navigation from '@/sections/Navigation';
import NeuralCore from '@/sections/NeuralCore';
import Projects from '@/sections/Projects';

function App() {
  return (
    <div className="relative">
      {/* 3D Neural Network Background - Fixed behind hero */}
      <NeuralCore />

      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Transparent to show 3D effect */}
      <Hero />

      {/* Content Sections - White background overlays */}
      <div className="relative" style={{ zIndex: 2 }}>
        <Projects />
        <CV />
        <Certificates />
        <Footer />
      </div>
    </div>
  );
}

export default App;
