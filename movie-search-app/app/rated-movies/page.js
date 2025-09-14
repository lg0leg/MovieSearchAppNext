'use client';

import { Button, Center, Container, Flex, Pagination, Space, TextInput, Title } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FavContext } from '../../src/state/state';
import MovieCard from '../../src/components/movie-card/movie-card';
import RatingPie from '../../src/components/diagrams/rating-pie';
import GenresBar from '../../src/components/diagrams/genres-bar';
import '../../styles/rated-movies.scss';

export default function RatedMovies() {
  const favContext = useContext(FavContext);
  const router = useRouter();
  const [genresLS, setGenresLS] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let itemPerPage = 4;

  const [ratingData, setRatingData] = useState(null); //для диаграммы оценок
  const [userSelectedRating, setUserSelectedRating] = useState(null);

  const [genresData, setGenresData] = useState(null); //для диаграммы жанров
  const [userSelectedGenre, setUserSelectedGenre] = useState(null);

  useEffect(() => {
    console.log('выбрал ' + userSelectedRating);
  }, [userSelectedRating]);

  useEffect(() => {
    console.log('выбрал ' + userSelectedGenre);
  }, [userSelectedGenre]);

  const searchFilter = (item) => item.original_title.toLowerCase().includes(searchQuery.toLowerCase());
  const pageFilter = (_, idx) => idx > (page - 1) * itemPerPage - 1 && idx < page * itemPerPage;

  useEffect(() => {
    const genres = JSON.parse(localStorage.getItem('genresList') || '[]');
    setGenresLS(genres);
    document.title = 'Rated movies | ArrowFlicks';
  }, []);

  useEffect(() => {
    searchQuery === ''
      ? setTotalPages(Math.ceil(favContext.favState.favoritesId.length / itemPerPage))
      : setTotalPages(Math.ceil(favContext.favState.favoritesInfo.filter(searchFilter).length / itemPerPage));
  }, [favContext.favState.favoritesId.length, favContext.favState.favoritesInfo, itemPerPage, searchQuery]);

  useEffect(() => {
    setPage(1);
  }, [totalPages]);

  useEffect(() => {
    const ratingCounts = {};
    favContext.favState.favoritesRating.forEach((item) => {
      const rating = item.itemRating;
      ratingCounts[rating] = (ratingCounts[rating] || 0) + 1;
    });

    const chartData = Object.entries(ratingCounts).map(([rating, count]) => ({
      // id: `Rating ${rating}`,
      id: rating,
      value: count,
    }));

    setRatingData(chartData);
  }, [favContext.favState.favoritesRating]);

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  //del
  const genData = [
    {
      genre: 'Action',
      count: 10,
      id: 1,
    },
    {
      genre: 'Adventure',
      count: 15,
      id: 2,
    },
    {
      genre: 'Comedy',
      count: 12,
      id: 3,
    },
    {
      genre: 'Drama',
      count: 20,
      id: 4,
    },
    {
      genre: 'Thriller',
      count: 15,
      id: 5,
    },
  ];

  return favContext.favState.favoritesId.length === 0 ? (
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
      <Space h="16" />
      <div className="favorites-container">
        {searchQuery === ''
          ? favContext.favState.favoritesInfo
              .filter(pageFilter)
              .map((item) => <MovieCard key={item.id} info={item} genres={genresLS}></MovieCard>)
          : favContext.favState.favoritesInfo
              .filter(searchFilter)
              .filter(pageFilter)
              .map((item) => <MovieCard key={item.id} info={item} genres={genresLS}></MovieCard>)}
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

      <Flex pt="10" gap="md" wrap="wrap">
        <div
          style={{
            flex: 1,
            height: '250px',
            minWidth: '250px',
            textAlign: 'center',
            // overflow: 'hidden',
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
            flex: 1,
            height: '250px',
            minWidth: '300px',
            textAlign: 'center',
            // overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Title order={4} className="bar-title">
            Genres
          </Title>
          <GenresBar data={genData} handler={setUserSelectedGenre} />
        </div>

        {/* <div
          style={{
            flex: 1,
            height: '250px',
            minWidth: '250px',
            textAlign: 'center',
            // overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Title order={4} className="pie-title">
            Genres
          </Title>
          <RatingPie data={ratingData} handler={setUserSelectedRating} />
        </div> */}
      </Flex>
    </Container>
  );
}
