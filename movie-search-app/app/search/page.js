'use client';

import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Paper,
  SegmentedControl,
  Space,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import '../../styles/search.scss';
import { getDataFromApi } from '../../src/utils/api';
import Link from 'next/link';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchData, setSearchData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [checked, setChecked] = useState(false);
  const [searchType, setSearchType] = useState('movie');

  const searchHandler = (event) => {
    setSearchQuery(event.currentTarget.value);
  };

  const nextBtn = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const prevBtn = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const getSearchData = async () => {
    const baseURL = `https://api.themoviedb.org/3/search/${searchType}?query=${searchQuery}&include_adult=${checked}&language=en-US&page=${page}`;

    try {
      const data = await getDataFromApi(baseURL);
      setSearchData(data.results);
      setTotalPage(data.total_pages);
    } catch (error) {
      console.log('Проверьте доступ к tmdb');
    }
  };

  useEffect(() => {
    if (searchQuery) {
      getSearchData();
      setPage(1);
    }
  }, [searchQuery, searchType, checked]);

  useEffect(() => {
    if (searchQuery) {
      getSearchData();
    }
  }, [page]);

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
      <Space h="10" />
      <Flex align="center">
        <SegmentedControl
          size="xs"
          w={100}
          value={searchType}
          onChange={setSearchType}
          data={[
            { label: 'Movie', value: 'movie' },
            { label: 'TV', value: 'tv' },
            // { label: 'Person', value: 'person' },
          ]}
        />
        <Switch
          size="sm"
          radius="sm"
          checked={checked}
          label="18+"
          color="#d1b4f8"
          c="#db0b7dff"
          style={{
            marginLeft: '10px',
          }}
          onChange={(event) => setChecked(event.currentTarget.checked)}
        />
      </Flex>
      <Space h="20" />
      {searchQuery &&
        searchData.map((obj) => (
          <Box key={obj.id}>
            <Paper shadow="xs" p="md">
              <Text
                c="#541f9d"
                {...(searchType == 'movie' && { component: Link, href: `/movies/${obj.id}`, target: '_blank' })}
              >
                {/* <Text c="#541f9d" component={Link} href={`/movies/${obj.id}`}> */}
                {obj.release_date
                  ? `${obj.original_title || obj.original_name} (${obj.release_date.slice(0, 4)})`
                  : obj.first_air_date
                  ? `${obj.original_title || obj.original_name} (${obj.first_air_date.slice(0, 4)})`
                  : `${obj.original_title || obj.original_name}`}
              </Text>
              <Text size="sm">{obj.overview} </Text>
            </Paper>
            <Space h="10" />
          </Box>
        ))}
      {searchQuery.length > 0 ? (
        <Center>
          <Button
            variant="light"
            color="#9854f6"
            size="md"
            w="100"
            onClick={prevBtn}
            disabled={page > 1 ? false : true}
          >
            Prev
          </Button>
          <Space w="10" />
          <Button
            variant="light"
            color="#9854f6"
            size="md"
            w="100"
            onClick={nextBtn}
            disabled={page < totalPage ? false : true}
          >
            Next
          </Button>
        </Center>
      ) : null}
    </Container>
  );
}
