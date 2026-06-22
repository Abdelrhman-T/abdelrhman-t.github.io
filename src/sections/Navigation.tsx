import { useEffect, useState } from 'react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
      setIsDark(scrollY < window.innerHeight * 0.8);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Projects', id: 'projects' },
    { label: 'CV', id: 'cv' },
    { label: 'Certificates', id: 'certificates' },
    { label: 'Awards', id: 'awards' },
    { label: 'Contact', id: 'footer' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full h-16 z-50 transition-all duration-500 ${
        scrolled
          ? isDark
            ? 'bg-black/80 backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="container-main h-full flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`text-sm font-medium tracking-wider transition-colors duration-300 ${
            isDark ? 'text-white' : 'text-black'
          } hover:text-[#0044FF]`}
        >
          Abdelrhman
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className={`text-sm font-normal transition-colors duration-300 ${
                isDark ? 'text-white/80' : 'text-black/80'
              } hover:text-[#0044FF]`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
