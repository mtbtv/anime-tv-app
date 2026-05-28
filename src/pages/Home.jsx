import React, { useEffect, useRef, useState } from 'react';
import HeroBanner from '../components/HeroBanner';
import AnimeRow from '../components/AnimeRow';
import { fetchAnimeByCategory, sections } from '../api/anilist';

export default function Home() {
  const [data, setData] = useState({});
  const [activeRow, setActiveRow] = useState(0);
  const [activeCard, setActiveCard] = useState(0);

  const rowRefs = useRef([]);

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
    if (rowRefs.current[activeRow]) {
      rowRefs.current[activeRow].scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeRow]);

  useEffect(() => {
    function handleRemote(event) {
      const currentItems = data[sections[activeRow]?.key] || [];

      switch (event.key) {
        case 'ArrowRight':
          setActiveCard((prev) => Math.min(prev + 1, currentItems.length - 1));
          break;

        case 'ArrowLeft':
          setActiveCard((prev) => Math.max(prev - 1, 0));
          break;

        case 'ArrowDown':
          setActiveRow((prev) => Math.min(prev + 1, sections.length - 1));
          setActiveCard(0);
          break;

        case 'ArrowUp':
          setActiveRow((prev) => Math.max(prev - 1, 0));
          setActiveCard(0);
          break;

        default:
          break;
      }
    }

    window.addEventListener('keydown', handleRemote);

    return () => {
      window.removeEventListener('keydown', handleRemote);
    };
  }, [activeRow, activeCard, data]);

  const heroAnime = data[sections[0]?.key]?.[activeCard];

  return (
    <div className='min-h-screen bg-black text-white overflow-y-auto'>
      <HeroBanner anime={heroAnime} />

      <div className='px-6 pb-20 -mt-12 relative z-20'>
        {sections.map((section, index) => (
          <div
            key={section.key}
            ref={(el) => (rowRefs.current[index] = el)}
          >
            <AnimeRow
              title={section.title}
              items={data[section.key] || []}
              rowIndex={index}
              activeRow={activeRow}
              activeCard={activeCard}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
