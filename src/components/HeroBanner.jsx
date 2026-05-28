import React from 'react';
import { Play } from 'lucide-react';
import { cleanDescription, formatRating } from '../utils/helpers';

export default function HeroBanner({ anime }) {
  if (!anime) return null;

  return (
    <div className='relative h-screen w-full overflow-hidden'>
      <img
        src={anime.bannerImage || anime.coverImage?.extraLarge}
        alt={anime.title?.english}
        className='absolute inset-0 w-full h-full object-cover opacity-50 scale-105'
      />

      <div className='absolute inset-0 bg-gradient-to-r from-black via-black/65 to-transparent' />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20' />

      <div className='relative z-10 h-full flex flex-col justify-end px-16 pb-28 max-w-4xl'>
        <h1 className='text-7xl font-black mb-6 leading-tight'>
          {anime.title?.english || anime.title?.romaji}
        </h1>

        <div className='flex items-center gap-6 mb-5 text-xl text-gray-200'>
          <span>⭐ {formatRating(anime.averageScore)}</span>
          <span>{anime.episodes || '?'} Episodes</span>
        </div>

        <p className='text-gray-200 text-xl leading-relaxed mb-8 max-w-3xl'>
          {cleanDescription(anime.description)}
        </p>

        <button className='bg-cyan-400 hover:bg-cyan-300 text-black px-10 py-4 rounded-2xl font-bold text-2xl flex items-center gap-3 w-fit transition-all'>
          <Play fill='black' size={26} />
          Watch Anime
        </button>
      </div>
    </div>
  );
}
