'use client';

import React, { useEffect, useState } from 'react';
import { getDataFromApi } from '../../src/utils/api';
import YoutubeContainer from '../../src/components/youtube-container/youtube-container';
import { AspectRatio, Container, Flex, Image, Space, Title } from '@mantine/core';
import '../../styles/new-trailers.scss';

export default function NewTrailers() {
  const [trailersList, setTrailersList] = useState([]);
  const [trailerURLList, setTrailerURLList] = useState([]);

  const getTrailers = async () => {
    const baseURL = 'https://api.themoviedb.org/3/movie/now_playing';
    try {
      const data = await getDataFromApi(baseURL);
      // setTrailersList(data.results);
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
  }, []);

  // useEffect(() => {
  //   console.log(trailersList);
  // }, [trailersList]);

  // useEffect(() => {
  //   console.log(trailerURLList);
  // }, [trailerURLList]);

  return (
    <Container fluid className="new-trailers-container">
      <Title order={1}>New trailers</Title>
      <Space h={24} />
      <Flex gap={16} wrap="wrap" justify="center">
        {trailerURLList.map((obj) => (
          <YoutubeContainer obj={obj} key={obj.id} />
        ))}
      </Flex>
    </Container>
  );
}
