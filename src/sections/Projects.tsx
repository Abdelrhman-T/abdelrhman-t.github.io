import { projects } from '@/data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
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

      // Project blocks animation
      projectRefs.current.forEach((ref) => {
        if (!ref) return;
        gsap.from(ref, {
          y: 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ref,
            start: 'top 85%',
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-white"
      style={{ zIndex: 2 }}
    >
      <div className="section-padding">
        <div className="container-main">
          <h2
            ref={headingRef}
            className="text-black font-bold mb-20"
            style={{
              fontSize: 'clamp(36px, 5vw, 64px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            SELECTED PROJECTS
          </h2>

          <div className="space-y-32">
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => { projectRefs.current[index] = el; }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16"
              >
                {/* Left: Image + Title */}
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="mb-6 overflow-hidden">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${project.name} project`}
                      className="block"
                    >
                      <img
                        src={project.image}
                        alt={project.name}
                        className="w-full aspect-[4/3] object-cover cursor-pointer transition-transform duration-300 hover:scale-105"
                        style={{ borderRadius: '0px' }}
                      />
                    </a>
                  </div>

                  <div className="flex items-baseline gap-4">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <h3
                        className="text-black font-medium cursor-pointer hover:text-[#0044FF] transition-colors duration-300"
                        style={{ fontSize: '32px', lineHeight: 1.2 }}
                      >
                        {project.name}
                      </h3>
                    </a>

                    <span
                      className="text-sm"
                      style={{ color: '#767E8C' }}
                    >
                      {project.date}
                    </span>
                  </div>

                  <p
                    className="text-base mt-2"
                    style={{ color: '#767E8C' }}
                  >
                    {project.subtitle}
                  </p>
                </div>

                {/* Right: Tech Stack + Description */}
                <div
                  className={`flex flex-col justify-center ${index % 2 === 1 ? 'lg:order-1' : ''
                    }`}
                >
                  <div className="mb-8">
                    <span
                      className="text-xs tracking-wider block mb-4"
                      style={{ color: '#767E8C' }}
                    >
                      TECH STACK
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 8).map((tech, i) => (
                        <span
                          key={i}
                          className="text-sm px-3 py-1 border transition-colors duration-300 hover:text-[#0044FF] hover:border-[#0044FF]"
                          style={{ borderColor: '#E5E5E5', color: '#000000' }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="text-lg text-black mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="space-y-3">
                    {project.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-base flex items-start gap-3"
                        style={{ color: '#767E8C' }}
                      >
                        <span
                          className="mt-2 block w-1 h-1 flex-shrink-0"
                          style={{ backgroundColor: '#0044FF' }}
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
