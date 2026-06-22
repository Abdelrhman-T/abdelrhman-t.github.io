import { education, personalInfo, technicalSkills, workExperience } from '@/data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download } from 'lucide-react';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CV = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current, {
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

      gsap.from(rightRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
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

  return (
    <section
      id="cv"
      ref={sectionRef}
      className="relative"
      style={{ zIndex: 2, backgroundColor: '#FAFAFA' }}
    >
      <div className="section-padding">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column: About */}
            <div ref={leftRef}>
              <h2
                className="text-black font-bold mb-8"
                style={{
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
              >
                ABOUT &amp;
                <br />
                HISTORY
              </h2>

              <p className="text-lg leading-relaxed mb-8" style={{ color: '#767E8C' }}>
                {personalInfo.summary}
              </p>

              {/* Technical Skills */}
              <div className="mb-8">
                <span
                  className="text-xs tracking-wider block mb-4"
                  style={{ color: '#767E8C' }}
                >
                  TECHNICAL SKILLS
                </span>

                <div className="space-y-4">
                  {Object.entries(technicalSkills).map(([category, skills]) => (
                    <div key={category}>
                      <span className="text-sm font-medium text-black capitalize block mb-1">
                        {category.replace(/_/g, ' / ')}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 border transition-colors duration-300 hover:text-[#0044FF] hover:border-[#0044FF]"
                            style={{ borderColor: '#E5E5E5', color: '#767E8C' }}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download CV Button */}
              <a
                href="/cv/Abdelrhman_Tarek_Junior_AI_Engineer.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-black text-black text-sm font-medium transition-all duration-300 hover:bg-black hover:text-white"
              >
                <Download size={16} />
                DOWNLOAD CV
              </a>
            </div>

            {/* Right Column: Experience & Education */}
            <div ref={rightRef}>
              {/* Work Experience */}
              <div className="mb-12">
                <span
                  className="text-xs tracking-wider block mb-6"
                  style={{ color: '#767E8C' }}
                >
                  WORK EXPERIENCE
                </span>

                <div className="space-y-8">
                  {workExperience.map((exp, index) => (
                    <div
                      key={index}
                      className="border-t pt-6"
                      style={{ borderColor: '#E5E5E5' }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <h4 className="text-lg font-medium text-black">
                          {exp.role}
                        </h4>
                        <span className="text-sm" style={{ color: '#767E8C' }}>
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm mb-1" style={{ color: '#767E8C' }}>
                        {exp.company} | {exp.location}
                      </p>
                      <ul className="mt-3 space-y-2">
                        {exp.description.map((desc, i) => (
                          <li
                            key={i}
                            className="text-sm flex items-start gap-2"
                            style={{ color: '#767E8C' }}
                          >
                            <span
                              className="mt-1.5 block w-1 h-1 flex-shrink-0"
                              style={{ backgroundColor: '#0044FF' }}
                            />
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div>
                <span
                  className="text-xs tracking-wider block mb-6"
                  style={{ color: '#767E8C' }}
                >
                  EDUCATION
                </span>

                <div className="space-y-6">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="border-t pt-6"
                      style={{ borderColor: '#E5E5E5' }}
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                        <h4 className="text-lg font-medium text-black">
                          {edu.degree}
                        </h4>
                        <span className="text-sm" style={{ color: '#767E8C' }}>
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: '#767E8C' }}>
                        {edu.institution} | {edu.location}
                      </p>
                      <p className="text-sm mt-1" style={{ color: '#0044FF' }}>
                        Specialization: {edu.specialization}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CV;
