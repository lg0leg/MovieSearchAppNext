'use client';

import { Button, Center, Container, Flex, Pagination, Space, TextInput, Title } from '@mantine/core';
import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FavContext } from '../../src/state/state';
import MovieCard from '../../src/components/movie-card/movie-card';
import '../../styles/rated-movies.scss';

export default function RatedMovies() {
  const favContext = useContext(FavContext);
  const router = useRouter();
  const [genresLS, setGenresLS] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let itemPerPage = 4;

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

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

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
    </Container>
  );
}
