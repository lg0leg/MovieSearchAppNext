'use client';

import './movie-card.scss';
import { Image, Space } from '@mantine/core';
import { useRouter } from 'next/navigation';
import Favorites from '../favorites/favorites';

export default function MovieCard({ info, genres }) {
  const router = useRouter();
  const moviePath = `/movies/${info.id}`;

  //получение названий жанров из списка id отдельного фильма
  let genreTitles = genres
    ? info.genre_ids
        .map((genID) => genres.find((obj) => obj.id === genID))
        .map((val) => val?.name || '')
        .join(', ')
    : '';

  return (
    <>
      <div
        className="movie-card"
        onClick={() => {
          router.push(moviePath);
        }}
      >
        <Image className="movie-card-bg-image" src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} fallbackSrc="/noPoster.png" alt={`poster`} />
        <Image className="movie-image" src={`https://image.tmdb.org/t/p/original/${info.poster_path}`} fallbackSrc="/noPoster.png" alt={`${info.original_title} poster`} />
        <div className="movie-card-inner">
          <h2 className="movie-card-title">{info.original_title}</h2>
          <p>{info.release_date.slice(0, 4)}</p>
          <div className="movie-rating">
            <img src="/star.svg" alt="star" width={22} />
            <span>{info.vote_average.toFixed(1)}</span>
            <span>({info.vote_count})</span>
          </div>
          <Space h={40} />
          <p>{genreTitles}</p>
        </div>
        <div className="movie-star">
          <Favorites info={info} />
        </div>
      </div>
    </>
  );
}
