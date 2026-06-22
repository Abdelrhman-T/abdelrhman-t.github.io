import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Hero = () => {
  const labelRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.3 });

    tl.from(labelRef.current, {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .from(
        titleRef.current,
        {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: 'power3.out',
        },
        '-=0.6'
      )
      .from(
        metaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.5'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full flex flex-col justify-between"
      style={{ height: '100vh', zIndex: 1 }}
    >
      {/* Top Label */}
      <div
        ref={labelRef}
        className="pt-24 px-4 sm:px-6 lg:px-8 container-main"
      >
        <span className="text-xl font-bold tracking-[0.2em]" style={{ color: '#767E8C' }}>
          AI ENGINEER
        </span>
      </div>

      {/* Center Title */}
      <div className="flex-1 flex items-center px-4 sm:px-6 lg:px-8 container-main">
        <h1
          ref={titleRef}
          className="text-white font-bold leading-none tracking-tight"
          style={{
            fontSize: 'clamp(60px, 12vw, 100px)',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Abdelrhman<span style={{ color: '#0044FF' }}>.</span>
        </h1>
      </div>

      {/* Bottom Metadata */}
      <div
        ref={metaRef}
        className="pb-12 px-4 sm:px-6 lg:px-8 container-main"
      >
        <div className="flex flex-wrap gap-x-12 gap-y-2">
          <div>
            <span className="text-xs tracking-wider block" style={{ color: '#767E8C' }}>
              LOCATION
            </span>
            <span className="text-sm text-white">CAIRO, EGYPT</span>
          </div>
          <div>
            <span className="text-xs tracking-wider block" style={{ color: '#767E8C' }}>
              SPECIALIZATION
            </span>
            <span className="text-sm text-white">AI SYSTEMS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
