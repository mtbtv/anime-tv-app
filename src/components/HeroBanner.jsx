import React from 'react';
import { Play } from 'lucide-react';
import { cleanDescription, formatRating } from '../utils/helpers';

export default function HeroBanner({ anime }) {
  if (!anime) return null;

  return (
    <div className='relative h-[70vh] w-full overflow-hidden'>
      <img
        src={anime.bannerImage || anime.coverImage?.extraLarge}
        alt={anime.title?.english}
        className='absolute inset-0 w-full h-full object-cover opacity-40'
      />

      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent' />

      <div className='relative z-10 h-full flex flex-col justify-end px-10 pb-20 max-w-3xl'>
        <h1 className='text-6xl font-black mb-4 leading-tight'>
          {anime.title?.english || anime.title?.romaji}
        </h1>

        <div className='flex items-center gap-5 mb-4 text-lg'>
          <span>⭐ {formatRating(anime.averageScore)}</span>
          <span>{anime.episodes || '?'} Episodes</span>
        </div>

        <p className='text-gray-200 text-lg leading-relaxed mb-6'>
          {cleanDescription(anime.description)}
        </p>

        <button className='bg-cyan-400 hover:bg-cyan-300 text-black px-8 py-4 rounded-2xl font-bold text-xl flex items-center gap-3 w-fit'>
          <Play fill='black' />
          Watch Anime
        </button>
      </div>
    </div>
  );
}
