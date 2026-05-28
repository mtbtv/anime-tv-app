import React from 'react';
import { Play } from 'lucide-react';
import { formatRating } from '../utils/helpers';

export default function AnimeCard({ anime, active }) {
  return (
    <div className={`snap-center min-w-[300px] h-[360px] rounded-2xl overflow-hidden relative transition-all duration-200 border-4 ${active ? 'border-cyan-400 scale-110 shadow-[0_0_40px_rgba(34,211,238,0.9)] z-20' : 'border-transparent scale-100 opacity-90'}`}>
      <img src={anime.coverImage?.extraLarge} alt={anime.title?.english || anime.title?.romaji} className='w-full h-full object-cover' />
      <div className='absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent' />
      <div className='absolute bottom-0 p-4 w-full'>
        <h3 className='font-bold text-xl line-clamp-2 mb-2'>{anime.title?.english || anime.title?.romaji}</h3>

        <div className='flex items-center justify-between text-base text-gray-200 mb-3'>
          <span>⭐ {formatRating(anime.averageScore)}</span>
          <span>{anime.episodes || '?'} eps</span>
        </div>

        {active && (
          <button className='w-full bg-cyan-400 text-black font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-lg'>
            <Play size={20} fill='black' />
            Watch Now
          </button>
        )}
      </div>
    </div>
  );
}
