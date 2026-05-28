import React, { useEffect, useRef } from 'react';
import AnimeCard from './AnimeCard';

export default function AnimeRow({ title, items, rowIndex, activeRow, activeCard }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (activeRow === rowIndex && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeCard * 320,
        behavior: 'instant'
      });
    }
  }, [activeCard, activeRow, rowIndex]);

  return (
    <section className='mb-10'>
      <h2 className='text-2xl font-bold px-2 mb-4'>{title}</h2>

      <div
        ref={scrollRef}
        className='flex gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-hide px-4 py-4'
      >
        {items.map((anime, index) => (
          <AnimeCard
            key={anime.id}
            anime={anime}
            active={activeRow === rowIndex && activeCard === index}
          />
        ))}
      </div>
    </section>
  );
}
