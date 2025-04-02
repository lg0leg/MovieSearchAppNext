'use client';

import { Button, Container, Flex, Pagination, Select, Space, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import '../../styles/movies.scss';
import FilmList from '../../src/components/film-list/film-list';
import { getDataFromApi } from '../../src/utils/api';

export default function Movies() {
  const [genresList, setGenresList] = useState([]);
  const [genres, setGenres] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [ratingFrom, setRatingFrom] = useState('');
  const [ratingTo, setRatingTo] = useState('');

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('popularity.desc');

  const [moviesInfo, setMoviesInfo] = useState([]);

  //получение информации о фильмах с учетом фильтров, 20 штук на страницу
  const getMovies = async () => {
    const baseURL = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US';
    let year = releaseYear ? `&primary_release_year=${releaseYear}` : '';
    let rf = ratingFrom ? `&vote_average.gte=${ratingFrom}` : '';
    let rt = ratingTo ? `&vote_average.lte=${ratingTo}` : '';
    let gens = genres ? `&with_genres=${genresList.find((val) => val.name === genres).id}` : '';
    let query = `${baseURL}&page=${page}${year}&sort_by=${sort}${rf}${rt}${gens}`;
    try {
      const data = await getDataFromApi(query);
      data.total_pages > 500 ? setTotalPages(500) : setTotalPages(data.total_pages);
      setMoviesInfo(data.results);
    } catch (error) {
      console.log('Невозможно получить данные о  фильмах!\n' + error);
      console.log('Проверьте доступ к tmdb');
    }
  };

  // получение массива доступных жанров вида {"id": 28,"name": "Action"}
  const getGenres = async () => {
    try {
      const data = await getDataFromApi('https://api.themoviedb.org/3/genre/movie/list?language=en');
      setGenresList(data.genres);
      localStorage.setItem('genresList', JSON.stringify(data.genres));
    } catch (error) {
      console.log('Невозможно получить список жанров!\n' + error);
    }
  };

  const resetFilters = () => {
    setGenres(null);
    setReleaseYear(null);
    setRatingFrom(null);
    setRatingTo(null);
    setSort('popularity.desc');
  };

  useEffect(() => {
    getGenres();
  }, []);

  useEffect(() => {
    getMovies();
  }, [genres, releaseYear, ratingFrom, ratingTo, sort, page]);

  const years = Array.from({ length: 100 }, (_, index) => String(2024 - index));

  return (
    <Container fluid style={{ width: 1160, paddingLeft: 90, paddingRight: 90, paddingTop: 40, margin: 0 }}>
      <Title order={1}>Movies</Title>
      <Space h="40" />
      <Flex gap="16" wrap="wrap" align="flex-end">
        <Select className="filter-title" label="Genres" placeholder="Select genre" data={genresList.map((val) => val.name)} value={genres} onChange={setGenres} />
        <Select className="filter-title" label="Release year" placeholder="Select release year" data={years} value={releaseYear} onChange={setReleaseYear} />
        <Select
          className="filter-title filter-title-short"
          label="Ratings"
          placeholder="From"
          data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']}
          value={ratingFrom}
          onChange={setRatingFrom}
        />
        <Select className="filter-title filter-title-short" label=" " placeholder="To" data={['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10']} value={ratingTo} onChange={setRatingTo} />
        <Button pb={10} variant="transparent" color="rgb(123, 124, 136)" onClick={resetFilters}>
          Reset filters
        </Button>
      </Flex>
      <Flex style={{ marginTop: 10 }}>
        <Select
          className="filter-title"
          label="Sort by"
          data={[
            { value: 'popularity.desc', label: 'Most popular' },
            { value: 'title.desc', label: 'Title' },
            { value: 'vote_average.desc', label: 'Rating' },
          ]}
          value={sort}
          onChange={(_value, option) => setSort(option.value)}
        />
      </Flex>
      {moviesInfo.length > 0 ? (
        <>
          <FilmList moviesInfo={moviesInfo} genresList={genresList}></FilmList>
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
          <Space h="20" />
        </>
      ) : (
        <>
          <Space h="40" />
          <Flex gap="16" justify="center" align="center" direction="column">
            <img src="/lookfor.svg" alt="We don't have such movies, look for another one" />
            <p>We don't have such movies, look for another one</p>
          </Flex>
        </>
      )}
    </Container>
  );
}
