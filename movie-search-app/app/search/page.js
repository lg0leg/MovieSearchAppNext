'use client';

import { Box, Container, Paper, Space, Text, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import '../../styles/search.scss';
import { getDataFromApi } from '../../src/utils/api';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  const getSearchData = async () => {
    // const baseURL = `https://api.themoviedb.org/3/search/keyword?query=${searchQuery}t&page=1`;
    const baseURL = `https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1`;

    try {
      const data = await getDataFromApi(baseURL);
      setSearchData(data.results);
    } catch (error) {
      console.log('Проверьте доступ к tmdb');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getSearchData();
    }
    // console.log(`-${searchQuery}-`);
  }, [searchQuery]);

  useEffect(() => {
    console.log(searchData);
  }, [searchData]);

  return (
    <Container fluid className="search-movies-container">
      <Title order={1}>Search movies</Title>
      <Space h="24" />
      <TextInput
        className="search-input"
        leftSectionPointerEvents="none"
        leftSection={<img src="/search.png" alt="search icon" />}
        value={searchQuery}
        onChange={searchHandler}
        placeholder="What are you looking for?"
        size="xl"
        radius="md"
      />
      <Space h="24" />
      {searchQuery &&
        searchData.map((obj) => (
          <Box key={obj.id}>
            <Paper shadow="xs" p="md">
              <Text c="#541f9d">
                {obj.release_date ? `${obj.original_title} (${obj.release_date.slice(0, 4)})` : `${obj.original_title}`}
              </Text>
              <Text size="sm">{obj.overview} </Text>
            </Paper>
            <Space h="10" />
          </Box>
        ))}
    </Container>
  );
}
