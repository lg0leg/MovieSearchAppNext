'use client';

import { Button, Center, Container, Flex, Pagination, Space, TextInput, Title } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FavContext } from '../../src/state/state';
import MovieCard from '../../src/components/movie-card/movie-card';
import RatingPie from '../../src/components/diagrams/rating-pie';
import GenresBar from '../../src/components/diagrams/genres-bar';
import basicGenresList from '../../src/utils/genres-list';
import '../../styles/rated-movies.scss';

export default function RatedMovies() {
  const favContext = useContext(FavContext);
  const router = useRouter();
  const [genresLS, setGenresLS] = useState([]);
  const [isEmptyPage, setIsEmptyPage] = useState(true);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let itemPerPage = 4;

  const [ratingData, setRatingData] = useState(null); //для диаграммы оценок
  const [userSelectedRating, setUserSelectedRating] = useState(null);

  const [genresData, setGenresData] = useState(null); //для диаграммы жанров
  const [userSelectedGenre, setUserSelectedGenre] = useState(null);

  const [mainContent, setMainContent] = useState(favContext.favState.favoritesInfo);

  //фикс гидратации
  useEffect(() => {
    if (favContext.favState.favoritesId.length > 0) {
      setIsEmptyPage(false);
    } else {
      setIsEmptyPage(true);
    }
  }, [favContext.favState.favoritesId]);

  const searchFilter = (item) => item.original_title.toLowerCase().includes(searchQuery.toLowerCase());
  const pageFilter = (_, idx) => idx > (page - 1) * itemPerPage - 1 && idx < page * itemPerPage;

  //фильтрация карточек под выбранные параметры
  useEffect(() => {
    if (searchQuery.length > 0) {
      const data = favContext.favState.favoritesInfo.filter(searchFilter);
      setMainContent(data);
      setTotalPages(Math.ceil(data.length / itemPerPage));
    } else {
      setMainContent(favContext.favState.favoritesInfo);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (userSelectedRating) {
      const arr = favContext.favState.favoritesRating
        .filter((val) => val.itemRating == userSelectedRating)
        .map((obj) => obj.itemId);
      const data = favContext.favState.favoritesInfo.filter((item) => arr.includes(item.id));
      setMainContent(data);
      setTotalPages(Math.ceil(data.length / itemPerPage));
    }
  }, [userSelectedRating]);

  useEffect(() => {
    if (userSelectedGenre) {
      const genresArr = genresLS.length > 0 ? genresLS : basicGenresList;
      const idFromName = genresArr.find((item) => item.name === userSelectedGenre).id;
      const data = favContext.favState.favoritesInfo.filter((item) => item.genre_ids.includes(idFromName));
      setMainContent(data);
      setTotalPages(Math.ceil(data.length / itemPerPage));
    }
  }, [userSelectedGenre]);

  //загрузка списка жанров
  useEffect(() => {
    const genres = JSON.parse(localStorage.getItem('genresList') || '[]');
    setGenresLS(genres);
    document.title = 'Rated movies | ArrowFlicks';
  }, []);

  //обновление пагинации
  useEffect(() => {
    if (searchQuery === '' && !userSelectedRating && !userSelectedGenre) {
      setTotalPages(Math.ceil(favContext.favState.favoritesId.length / itemPerPage));
    }
  }, [favContext.favState.favoritesId.length, favContext.favState.favoritesInfo, itemPerPage, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [totalPages]);

  //обновление диаграмм
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

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  return isEmptyPage ? (
    <Center h="100vh">
      <Flex gap="16" justify="center" align="center" direction="column">
        <img className="favorites-empty-image" src="/loading.svg" alt="You haven't rated any films yet" />
        <h2 style={{ textAlign: 'center', padding: '16px' }}>You haven't rated any films yet</h2>
        <Button
          variant="filled"
          color="#9854f6"
          size="md"
          radius="md"
          onClick={() => {
            router.push('/movies');
          }}
        >
          Find movies
        </Button>
      </Flex>
    </Center>
  ) : (
    <Container fluid className="rated-movies-container ">
      <Flex justify={'space-between'} align={'center'} wrap={'wrap'} gap={30}>
        <Title order={1}>Rated movies</Title>
        <TextInput
          className="search-input"
          leftSectionPointerEvents="none"
          leftSection={<img src="/search.png" alt="search icon" />}
          value={searchQuery}
          onChange={searchHandler}
          placeholder="Search movie title"
          size="lg"
          radius="md"
        />
      </Flex>

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
          <Title order={4} className="pie-title">
            Rating
          </Title>
          <RatingPie data={ratingData} handler={setUserSelectedRating} />
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
          <Title order={4} className="bar-title">
            Top genres
          </Title>
          <GenresBar data={genresData} handler={setUserSelectedGenre} />
        </div>
      </Flex>

      <Space h="16" />
      <div className="favorites-container">
        {mainContent.filter(pageFilter).map((item) => (
          <MovieCard key={item.id} info={item} genres={genresLS}></MovieCard>
        ))}
      </div>

      <Center>
        <Pagination
          size={'lg'}
          defaultValue="1"
          radius="sm"
          color="rgb(152, 84, 246)"
          value={page}
          onChange={setPage}
          total={totalPages}
          styles={{
            control: {
              border: '1px solid rgb(213, 214, 220)',
            },
          }}
        />
      </Center>
    </Container>
  );
}
