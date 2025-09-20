import React, { useContext, useEffect, useState } from 'react';
import { Flex, Title } from '@mantine/core';
import RatingPie from './rating-pie';
import GenresBar from './genres-bar';
import { FavContext } from '../../state/state';
import basicGenresList from '../../utils/genres-list';
import '../../../styles/rated-movies-diagrams.scss';

export default function RatedMoviesDiagrams({ genresLS, setUserSelectedRating, setUserSelectedGenre, setDefault }) {
  const favContext = useContext(FavContext);

  const [ratingData, setRatingData] = useState(null);
  const [genresData, setGenresData] = useState(null);

  useEffect(() => {
    const ratingCounts = {};
    favContext.favState.favoritesRating.forEach((item) => {
      const rating = item.itemRating;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    const chartData = Object.entries(ratingCounts).map(([rating, count]) => ({
      id: rating,
      value: count,
    }));

    setRatingData(chartData);
  }, [favContext.favState.favoritesRating]);

  useEffect(() => {
    const genreCounts = {};
    favContext.favState.favoritesInfo.forEach((movie) => {
      if (movie.genre_ids && Array.isArray(movie.genre_ids)) {
        movie.genre_ids.forEach((genreId) => {
          const genresArr = genresLS.length > 0 ? genresLS : basicGenresList;
          const genreName = genresArr.find((item) => item.id === genreId).name || `Unknown`;
          genreCounts[genreName] = (genreCounts[genreName] || 0) + 1;
        });
      }
    });

    const barData = Object.entries(genreCounts)
      .sort((a, b) => a[1] - b[1])
      .slice(-5)
      .map(([genre, value]) => ({
        id: genre,
        genre,
        count: value,
      }));

    setGenresData(barData);
  }, [favContext.favState.favoritesInfo, genresLS]);

  return (
    <Flex pt="20" gap="md" wrap="wrap">
      <div
        style={{
          flex: 1,
          height: '250px',
          minWidth: '250px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <RatingPie data={ratingData} handler={setUserSelectedRating} />
        <Title order={4} className="pie-title" onClick={() => setDefault()}>
          Rating
        </Title>
      </div>

      <div
        style={{
          flex: 2,
          height: '250px',
          minWidth: '280px',
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <GenresBar data={genresData} handler={setUserSelectedGenre} />
        <Title order={4} className="bar-title" onClick={() => setDefault()}>
          Top genres
        </Title>
      </div>
    </Flex>
  );
}
