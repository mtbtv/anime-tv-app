import React, { useEffect, useRef, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import AnimeRow from '../components/AnimeRow';
import { fetchAnimeByCategory, sections } from '../api/anilist';

export default function Home() {
  const [data, setData] = useState({});
  const [activeSection, setActiveSection] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const sectionRefs = useRef([]);
  const savedCards = useRef({});

  useEffect(() => {
    async function loadAnime() {
      const result = {};

      for (const section of sections) {
        result[section.key] = await fetchAnimeByCategory(section.key);
      }

      setData(result);
    }

    loadAnime();
  }, []);

  useEffect(() => {
    const activeElement = sectionRefs.current[activeSection];

    if (!activeElement) return;

    const rect = activeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const offset = rect.top + window.scrollY - viewportHeight / 2 + rect.height / 2;

    window.scrollTo({
      top: Math.max(offset, 0),
      behavior: 'smooth',
    });
  }, [activeSection]);

  useEffect(() => {
    function handleRemote(event) {
      const currentItems = data[sections[activeSection]?.key] || [];

      switch (event.key) {
        case 'ArrowRight':
          setActiveCard((prev) => {
            const next = Math.min(prev + 1, currentItems.length - 1);
            savedCards.current[activeSection] = next;
            return next;
          });
          break;

        case 'ArrowLeft':
          setActiveCard((prev) => {
            const next = Math.max(prev - 1, 0);
            savedCards.current[activeSection] = next;
            return next;
          });
          break;

        case 'ArrowDown': {
          const nextSection = Math.min(activeSection + 1, sections.length - 1);
          setActiveSection(nextSection);
          setActiveCard(savedCards.current[nextSection] || 0);
          break;
        }

        case 'ArrowUp': {
          const nextSection = Math.max(activeSection - 1, 0);
          setActiveSection(nextSection);
          setActiveCard(savedCards.current[nextSection] || 0);
          break;
        }

        case 'Enter':
          console.log('Selected section', activeSection, 'card', activeCard);
          break;

        default:
          break;
      }
    }

    window.addEventListener('keydown', handleRemote);

    return () => {
      window.removeEventListener('keydown', handleRemote);
    };
  }, [activeSection, activeCard, data]);

  const heroAnime = data[sections[0]?.key]?.[activeCard];

  return (
    <div className='min-h-screen bg-black text-white overflow-y-auto'>
      <div
        className={`transition-all duration-300 ${activeSection === 0 ? 'ring-4 ring-cyan-400' : ''}`}
      >
        <HeroBanner anime={heroAnime} />
      </div>

      <div className='px-6 pb-32 -mt-12 relative z-20'>
        {sections.map((section, index) => (
          <div
            key={section.key}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`rounded-3xl transition-all duration-300 mb-6 ${
              activeSection === index
                ? 'scale-[1.01] bg-white/5 ring-2 ring-cyan-400'
                : 'opacity-90'
            }`}
          >
            <AnimeRow
              title={section.title}
              items={data[section.key] || []}
              rowIndex={index}
              activeRow={activeSection}
              activeCard={activeCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
