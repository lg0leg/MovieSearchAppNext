'use client';

import React, { useEffect, useState } from 'react';
import { getDataFromApi } from '../../src/utils/api';
import YoutubeContainer from '../../src/components/youtube-container/youtube-container';
import { Button, Center, Container, Flex, Space, Title } from '@mantine/core';
import '../../styles/new-trailers.scss';

export default function NewTrailers() {
  const [trailerURLList, setTrailerURLList] = useState([]);
  const [page, setPage] = useState(1);

  const getTrailers = async () => {
    const baseURL = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;
    // const baseURL = 'https://api.themoviedb.org/3/movie/now_playing';

    try {
      const data = await getDataFromApi(baseURL);
      const trailersIds = data.results.map((obj) => obj.id);
      trailersIds.forEach(async (id) => {
        const videosURL = `https://api.themoviedb.org/3/movie/${id}/videos`;
        const videosData = await getDataFromApi(videosURL);
        const offTrailers = videosData.results.filter(
          (mov) => mov.name === 'Official Trailer' && mov.site === 'YouTube'
        );
        if (offTrailers.length > 0) {
          const obj = { id: id, url: offTrailers[0].key };
          setTrailerURLList((prev) => (prev.some((item) => item.id === id) ? prev : [...prev, obj]));
        }
        // else {
        //   console.log('No trailer');
        // }
      });
    } catch (error) {
      console.log('Невозможно получить список трейлеров!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  useEffect(() => {
    getTrailers();
  }, [page]);

  const loadMore = () => {
    if (page < 5) {
      setPage(page + 1);
    }
  };

  return (
    <Container fluid className="new-trailers-container">
      <Title order={1}>New trailers</Title>
      <Space h={24} />
      <Flex gap={16} wrap="wrap" justify="center">
        {trailerURLList.map((obj) => (
          <YoutubeContainer obj={obj} key={obj.id} />
        ))}
      </Flex>
      <Space h={24} />
      {trailerURLList.length > 0 ? (
        <Center>
          <Button
            variant="light"
            color="#9854f6"
            size="md"
            w="300"
            onClick={loadMore}
            disabled={page < 5 ? false : true}
          >
            Load more
          </Button>
        </Center>
      ) : null}
    </Container>
  );
}
