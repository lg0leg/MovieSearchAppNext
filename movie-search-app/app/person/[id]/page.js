'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { AspectRatio, Container, Divider, Flex, Group, Image, Space, Spoiler, Stack, Text, Title } from '@mantine/core';
import { getDataFromApi } from '../../../src/utils/api';
import { useMediaQuery } from '@mantine/hooks';
import '../../../styles/person-info.scss';

export default function Person() {
  const { id } = useParams();

  const isMobile = useMediaQuery('(max-width: 1024px)');

  const [personInfo, setPersonInfo] = useState(null);

  const getPersonInfo = async () => {
    if (!id) return;
    const baseURL = `https://api.themoviedb.org/3/person/${id}`;
    try {
      const data = await getDataFromApi(baseURL);
      setPersonInfo(data);
    } catch (error) {
      console.log('Невозможно получить информацию об актере!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  useEffect(() => {
    if (id) {
      getPersonInfo();
    }
  }, [id]);

  useEffect(() => {
    document.title = `${personInfo?.name} | ArrowFlicks`;
  }, [personInfo]);

  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const bdate = new Date(personInfo?.birthday);
  const birthday = bdate.toLocaleString('en-US', dateOptions);
  const ddate = new Date(personInfo?.deathday);
  const deathday = ddate.toLocaleString('en-US', dateOptions);

  return (
    <Container style={{ paddingTop: 40, paddingBottom: 40, justifyItems: 'center' }}>
      <Group className="person-Info-card" align="flex-start" w={'100%'} maw={800} wrap="nowrap">
        {isMobile ? (
          <Image
            className="person-Info-bg-image"
            src={`https://image.tmdb.org/t/p/w780/${personInfo?.profile_path}`}
            fallbackSrc="/noPoster.png"
            alt={`poster`}
          />
        ) : (
          <AspectRatio className="person-Info-image" ratio={2 / 3} w={300} miw={250}>
            <Image
              src={`https://image.tmdb.org/t/p/w500/${personInfo?.profile_path}`}
              fallbackSrc="/noPoster.png"
              alt={`${personInfo?.original_name} poster`}
            />
          </AspectRatio>
        )}
        <Stack>
          <Flex direction="column">
            <Title className="person-Info-title" order={2} c={'#9854f6'} lineClamp={3}>
              {personInfo?.name}
            </Title>
            <Spoiler maxHeight={150} showLabel="..." hideLabel="^^^">
              {personInfo?.also_known_as.map((name, idx) => (
                <Text size="sm" mt={4} c={'#7b7c88'} key={idx}>
                  {name}
                </Text>
              ))}
            </Spoiler>

            <Divider my="md" color={'#d5d6dc'} />
          </Flex>
          <div className="person-Info-details">
            {personInfo?.birthday && (
              <>
                <Text c={'#7b7c88'}>Birthday</Text>
                <Text>{birthday}</Text>
              </>
            )}
            {personInfo?.place_of_birth && (
              <>
                <Text c={'#7b7c88'}>Place of birth</Text>
                <Text>{`${personInfo?.place_of_birth}`}</Text>
              </>
            )}
            {personInfo?.deathday && (
              <>
                <Text c={'#7b7c88'}>Deathday</Text>
                <Text>{deathday}</Text>
              </>
            )}
            {personInfo?.imdb_id && (
              <>
                <Text c={'#7b7c88'}>IMDB profile</Text>
                <a
                  className="person-Info-link"
                  href={`https://www.imdb.com/name/${personInfo?.imdb_id}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  click
                </a>
              </>
            )}
          </div>
        </Stack>
      </Group>

      <Space h={20} />

      {personInfo?.biography && (
        <Flex className="person-Info-card" direction="column" w={'100%'} maw={800}>
          <>
            <Title order={3}>Biography</Title>
            <Space h={16} />
            <Text maw={725}>{personInfo.biography}</Text>
          </>
        </Flex>
      )}
    </Container>
  );
}
