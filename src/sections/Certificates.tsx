import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { certificates, awards } from '@/data/portfolio';
import { Award, Trophy, Medal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const certRefs = useRef<(HTMLDivElement | null)[]>([]);
  const awardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      certRefs.current.forEach((ref, i) => {
        if (!ref) return;
        gsap.from(ref, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 90%',
            once: true,
          },
        });
      });

      gsap.from(awardsRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: awardsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="certificates"
      ref={sectionRef}
      className="relative bg-white"
      style={{ zIndex: 2 }}
    >
      <div className="section-padding">
        <div className="container-main">
          <h2
            ref={headingRef}
            className="text-black font-bold mb-16"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            CERTIFICATIONS &amp; AWARDS
          </h2>

          {/* Certificates Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => { certRefs.current[index] = el; }}
                className="group border overflow-hidden transition-all duration-300 hover:border-[#0044FF]"
                style={{ borderColor: '#E5E5E5' }}
              >
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-medium text-black mb-1 line-clamp-2">
                    {cert.title}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="text-xs" style={{ color: '#767E8C' }}>
                      {cert.issuer}
                    </span>
                    <span className="text-xs" style={{ color: '#767E8C' }}>
                      {cert.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Awards Section */}
          <div id="awards" ref={awardsRef}>
            <span
              className="text-xs tracking-wider block mb-8"
              style={{ color: '#767E8C' }}
            >
              AWARDS
            </span>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {awards.map((award, index) => {
                const icons = [Trophy, Medal, Award];
                const Icon = icons[index % icons.length];
                return (
                  <div
                    key={index}
                    className="border p-6 transition-all duration-300 hover:border-[#0044FF]"
                    style={{ borderColor: '#E5E5E5' }}
                  >
                    <Icon
                      size={24}
                      className="mb-4"
                      style={{ color: '#0044FF' }}
                    />
                    <h4 className="text-lg font-medium text-black mb-2">
                      {award.title}
                    </h4>
                    <p className="text-sm mb-3" style={{ color: '#767E8C' }}>
                      {award.organization}
                    </p>
                    <p className="text-sm" style={{ color: '#767E8C' }}>
                      {award.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certificates;
