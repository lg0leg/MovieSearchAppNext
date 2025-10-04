'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import {
  AspectRatio,
  BackgroundImage,
  Container,
  Divider,
  Flex,
  Group,
  Image,
  Space,
  Spoiler,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { getDataFromApi } from '../../../src/utils/api';
import { useMediaQuery } from '@mantine/hooks';
import '../../../styles/tvinfo.scss';

export default function Series() {
  const { id } = useParams();

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [tvInfo, setTVInfo] = useState(null);
  const [trailer, setTrailer] = useState(false);

  const getSeriesInfo = async () => {
    if (!id) return;
    const baseURL = `https://api.themoviedb.org/3/tv/${id}?append_to_response=videos`;

    try {
      const data = await getDataFromApi(baseURL);
      setTVInfo(data);
    } catch (error) {
      console.log('Невозможно получить информацию о сериале!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  const checkTrailer = () => {
    if (tvInfo?.videos.results.length > 0) {
      if (tvInfo.videos.results.filter((mov) => mov.name === 'Official Trailer' && mov.site === 'YouTube').length > 0) {
        setTrailer(
          `https://www.youtube.com/embed/${
            tvInfo.videos.results.filter((mov) => mov.name === 'Official Trailer' && mov.site === 'YouTube')[0].key
          }`
        );
      } else if (tvInfo.videos.results.filter((mov) => mov.type === 'Trailer' && mov.site === 'YouTube').length > 0) {
        setTrailer(
          `https://www.youtube.com/embed/${
            tvInfo.videos.results.filter((mov) => mov.type === 'Trailer' && mov.site === 'YouTube')[0].key
          }`
        );
      }
    }
  };

  useEffect(() => {
    if (id) {
      getSeriesInfo();
    }
  }, [id]);

  useEffect(() => {
    checkTrailer();
    document.title = `${tvInfo?.original_name} | ArrowFlicks`;
  }, [tvInfo]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const date = new Date(tvInfo?.first_air_date);
  const premiereDate = date.toLocaleString('en-US', dateOptions);
  const lastAirdate = new Date(tvInfo?.last_air_date).toLocaleString('en-US', dateOptions);
  const seasons = `${tvInfo?.number_of_seasons}`;
  const episodes = `${tvInfo?.number_of_episodes}`;
  const lastEpisode = `${tvInfo?.last_episode_to_air?.name || ''} (${lastAirdate})`;
  const genres = tvInfo?.genres.map((item) => item.name).join(', ');

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40, justifyItems: 'center' }}>
      <Group className="tv-info-card" align="flex-start" w={'100%'} maw={800} wrap="nowrap">
        {isMobile ? (
          <Image
            className="tv-info-bg-image"
            src={`https://image.tmdb.org/t/p/w780/${tvInfo?.backdrop_path}`}
            fallbackSrc="/noPoster.png"
            alt={`poster`}
          />
        ) : (
          <AspectRatio className="tv-info-image" ratio={250 / 352} w={250} miw={250}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${tvInfo?.poster_path}`}
              fallbackSrc="/noPoster.png"
              alt={`${tvInfo?.original_name} poster`}
            />
          </AspectRatio>
        )}
        <Stack justify="space-between" mih={352}>
          <Flex direction="column">
            <Title className="tv-info-title" order={2} c={'#9854f6'} lineClamp={3}>
              {tvInfo?.original_name}
            </Title>
            <Text mt={8} mb={8} c={'#7b7c88'}>
              {tvInfo?.first_air_date.slice(0, 4)}
            </Text>
            <Flex gap={7}>
              <img src="/star.svg" alt="star" width={22} />
              <Text fw={600}>{tvInfo?.vote_average.toFixed(1)}</Text>
              <Text c={'#7b7c88'}>({tvInfo?.vote_count})</Text>
            </Flex>
            <Text mt={8} c={'#7b7c88'}>
              {tvInfo?.tagline}
            </Text>
          </Flex>
          <div className="tv-info-details">
            <Text c={'#7b7c88'}>Premiere</Text>
            <Text>{premiereDate}</Text>
            <Text c={'#7b7c88'}>Seasons</Text>
            <Text>{seasons}</Text>
            <Text c={'#7b7c88'}>Episodes</Text>
            <Text>{episodes}</Text>
            <Text c={'#7b7c88'}>Last episode</Text>
            <Text>{lastEpisode}</Text>
            <Text c={'#7b7c88'}>Genres</Text>
            <Text>{genres}</Text>
          </div>
        </Stack>
      </Group>

      <Space h={20} />

      <Flex className="tv-info-card" direction="column" w={'100%'} maw={800}>
        {trailer ? (
          <>
            <Title order={3}>Trailer</Title>
            <Space h={16} />
            <AspectRatio ratio={16 / 9} maw={500}>
              <iframe
                className="tv-info-trailer"
                src={trailer}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </AspectRatio>
            <Divider my="md" color={'#d5d6dc'} />
          </>
        ) : null}
        {tvInfo?.overview ? (
          <>
            <Title order={3}>Description</Title>
            <Space h={16} />
            <Text maw={725}>{tvInfo.overview}</Text>
            <Divider my="md" color={'#d5d6dc'} />
          </>
        ) : null}
        {tvInfo?.seasons.length > 0 ? (
          <>
            <Title order={3}>Seasons</Title>
            <Space h={16} />
            {tvInfo?.seasons.map((obj) => {
              if (obj.season_number > 0 && (obj.overview || obj.poster_path)) {
                return (
                  <Group key={obj.id} grow mih={150} mt={10} align="top">
                    <AspectRatio ratio={2 / 3} maw={100}>
                      <BackgroundImage src={`https://image.tmdb.org/t/p/w185/${obj.poster_path}`} radius="sm" p={10}>
                        <Text c={'white'} size="xs">{`${obj.episode_count} episodes`}</Text>
                        <Text c={'white'} size="xs">{`${obj.air_date?.slice(0, 4)}`}</Text>
                        <Text c={'white'} size="xs">{`★${obj.vote_average}`}</Text>
                      </BackgroundImage>
                    </AspectRatio>
                    <Spoiler maxHeight={120} showLabel="Show more" hideLabel="Hide">
                      <Text>{obj.overview}</Text>
                    </Spoiler>
                  </Group>
                );
              }
            })}
            <Divider my="md" color={'#d5d6dc'} />
          </>
        ) : null}
        {tvInfo?.production_companies ? (
          <>
            <Title order={3} pb={16}>
              Production
            </Title>
            <Flex direction="column" gap={12}>
              {tvInfo.production_companies.map((item) => (
                <Flex align={'center'} gap={8} key={item.id}>
                  <Image
                    fit="contain"
                    h={40}
                    w={40}
                    radius={'50%'}
                    src={`https://image.tmdb.org/t/p/w185/${item.logo_path}`}
                    fallbackSrc="/noVideo.png"
                    alt={`${item.name} poster`}
                  />
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
