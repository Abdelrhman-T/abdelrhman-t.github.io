import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { personalInfo } from '@/data/portfolio';
import { Mail, Phone, Linkedin, Github } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });

      gsap.from(gridRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const contactItems = [
    {
      icon: Mail,
      label: 'EMAIL',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: Phone,
      label: 'PHONE',
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
    },
    {
      icon: Linkedin,
      label: 'LINKEDIN',
      value: personalInfo.linkedin,
      href: `https://linkedin.com/in/${personalInfo.linkedin}`,
    },
    {
      icon: Github,
      label: 'GITHUB',
      value: personalInfo.github,
      href: `https://github.com/${personalInfo.github}`,
    },
  ];

  return (
    <footer
      id="footer"
      ref={sectionRef}
      className="relative bg-black"
      style={{ zIndex: 2 }}
    >
      <div className="section-padding flex flex-col justify-center min-h-screen">
        <div className="container-main">
          {/* Massive Title */}
          <h2
            ref={titleRef}
            className="text-white font-bold mb-20"
            style={{
              fontSize: 'clamp(48px, 10vw, 120px)',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            YOUR AI SYSTEM READY<span style={{ color: '#0044FF' }}>.</span>
          </h2>

          {/* Contact Grid */}
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <a
                  key={index}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    item.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  className="group block border-t pt-6 transition-colors duration-300"
                  style={{ borderColor: '#333333' }}
                >
                  <Icon
                    size={20}
                    className="mb-4 transition-colors duration-300 group-hover:text-[#0044FF]"
                    style={{ color: '#767E8C' }}
                  />
                  <span
                    className="text-xs tracking-wider block mb-2"
                    style={{ color: '#767E8C' }}
                  >
                    {item.label}
                  </span>
                  <span className="text-sm text-white transition-colors duration-300 group-hover:text-[#0044FF]">
                    {item.value}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Bottom Bar */}
          <div
            className="mt-20 pt-8 flex flex-wrap items-center justify-between gap-4"
            style={{ borderTop: '1px solid #333333' }}
          >
            <span className="text-xs" style={{ color: '#767E8C' }}>
              &copy; {new Date().getFullYear()} {personalInfo.name}. All rights
              reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
