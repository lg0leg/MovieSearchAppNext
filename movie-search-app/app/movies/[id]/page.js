'use client';

import React, { useEffect, useState } from 'react';
import '../../../styles/movie.scss';
import { useParams } from 'next/navigation';
import { AspectRatio, Container, Divider, Flex, Grid, Group, Image, Space, Stack, Text, Title } from '@mantine/core';
import { getDataFromApi } from '../../../src/utils/api';
import Favorites from '../../../src/components/favorites/favorites';

const emptyInfo = {
  adult: false,
  backdrop_path: '/noPoster.png',
  genre_ids: [],
  id: 11111,
  original_language: 'en',
  original_title: '-',
  overview: '-',
  popularity: 1,
  poster_path: '/noPoster.png',
  release_date: '',
  title: '-',
  video: false,
  vote_average: 0,
  vote_count: '-',
  runtime: '',
  budget: '',
  revenue: '',
  genres: [],
  overview: '',
  video: false,
  videos: { results: [] },
};

export default function Movie() {
  const { id } = useParams();

  const [minInfo, setMinInfo] = useState(null);
  const [movieInfo, setMovieInfo] = useState(emptyInfo);

  const [trailer, setTrailer] = useState(false);

  const getMovieInfo = async () => {
    if (!id) return;
    const baseURL = `https://api.themoviedb.org/3/movie/${id}?append_to_response=videos`;
    try {
      const data = await getDataFromApi(baseURL);
      setMovieInfo(data);
    } catch (error) {
      console.log('Невозможно получить информацию о фильме!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  const checkTrailer = () => {
    if (movieInfo.videos.results.length > 0) {
      if (movieInfo.videos.results.filter((mov) => mov.name === 'Official Trailer').length > 0) {
        setTrailer(`https://www.youtube.com/embed/${movieInfo.videos.results.filter((mov) => mov.name === 'Official Trailer')[0].key}`);
      } else {
        setTrailer(`https://www.youtube.com/embed/${movieInfo.videos.results.filter((mov) => mov.type === 'Trailer')[0].key}`);
      }
    }
  };

  useEffect(() => {
    if (id) {
      getMovieInfo();
    }
  }, [id]);

  useEffect(() => {
    checkTrailer();

    const minObj = {
      adult: movieInfo.adult,
      backdrop_path: movieInfo.backdrop_path,
      genre_ids: movieInfo.genres.map((item) => item.id),
      id: movieInfo.id,
      original_language: movieInfo.original_language,
      original_title: movieInfo.original_title,
      overview: movieInfo.overview,
      popularity: movieInfo.popularity,
      poster_path: movieInfo.poster_path,
      release_date: movieInfo.release_date,
      title: movieInfo.title,
      video: movieInfo.video,
      vote_average: movieInfo.vote_average,
      vote_count: movieInfo.vote_count,
    };

    setMinInfo(minObj);
  }, [movieInfo]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const date = new Date(movieInfo.release_date);
  const premiereDate = date.toLocaleString('en-US', dateOptions);
  const duration = `${Math.floor(movieInfo.runtime / 60)}h  ${movieInfo.runtime % 60}m`;
  const budget = `$${movieInfo.budget.toLocaleString()}`;
  const revenue = `$${movieInfo.revenue.toLocaleString()}`;
  const genres = movieInfo.genres.map((item) => item.name).join(', ');

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40 }}>
      <Group className="movie-info-card" align="flex-start" w={800}>
        <AspectRatio ratio={250 / 352} w={250}>
          <Image src={`https://image.tmdb.org/t/p/original/${movieInfo.poster_path}`} fallbackSrc="/noPoster.png" alt={`${movieInfo.original_title} poster`} />
        </AspectRatio>
        <Stack justify="space-between" h={352}>
          <Flex direction="column">
            <Title order={2} c={'#9854f6'}>
              {movieInfo.original_title}
            </Title>
            <Text mt={8} mb={8} c={'#7b7c88'}>
              {movieInfo.release_date.slice(0, 4)}
            </Text>
            <Flex gap={7}>
              <img src="/star.svg" alt="star" width={22} />
              <Text fw={600}>{movieInfo.vote_average.toFixed(1)}</Text>
              <Text c={'#7b7c88'}>({movieInfo.vote_count})</Text>
            </Flex>
          </Flex>
          <Grid cols={2} w={442} gutter>
            <Grid.Col span={4}>
              <Flex direction="column" gap={12}>
                <Text c={'#7b7c88'}>Duration</Text>
                <Text c={'#7b7c88'}>Premiere</Text>
                <Text c={'#7b7c88'}>Budget</Text>
                <Text c={'#7b7c88'}>Gross worldwide</Text>
                <Text c={'#7b7c88'}>Genres</Text>
              </Flex>
            </Grid.Col>
            <Grid.Col span={'auto'}>
              <Flex direction="column" gap={12}>
                <Text>{duration}</Text>
                <Text>{premiereDate}</Text>
                <Text>{budget}</Text>
                <Text>{revenue}</Text>
                <Text>{genres}</Text>
              </Flex>
            </Grid.Col>
          </Grid>
        </Stack>
        {minInfo && <div className="movie-info-favorite">{<Favorites info={minInfo} />}</div>}
      </Group>
      <Space h={20} />
      <Flex className="movie-info-card" direction="column" w={800}>
        {trailer ? (
          <>
            <Title order={3}>Trailer</Title>
            <Space h={16} />
            <iframe
              className="movie-info-trailer"
              width="500"
              height="281"
              src={trailer}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
            <Divider my="md" color={'#d5d6dc'} />
          </>
        ) : null}
        {movieInfo.overview ? (
          <>
            <Title order={3}>Description</Title>
            <Space h={16} />
            <Text maw={725}>{movieInfo.overview}</Text>
            <Divider my="md" color={'#d5d6dc'} />
          </>
        ) : null}
        {movieInfo.production_companies ? (
          <>
            <Title order={3} pb={16}>
              Production
            </Title>
            <Flex direction="column" gap={12}>
              {movieInfo.production_companies.map((item) => (
                <Flex align={'center'} gap={8} key={item.id}>
                  <Image fit="contain" h={40} w={40} radius={'50%'} src={`https://image.tmdb.org/t/p/original/${item.logo_path}`} fallbackSrc="/noVideo.png" alt={`${item.name} poster`} />
                  <Text fw={700}>{item.name}</Text>
                </Flex>
              ))}
            </Flex>
          </>
        ) : null}
      </Flex>
    </Container>
  );
}
