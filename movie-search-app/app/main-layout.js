'use client';

import React from 'react';
import { AppShell, Alert, Badge, Flex, Space, Title, Burger } from '@mantine/core';
import Link from 'next/link';
import '../styles/app.scss';
import { useEffect, useReducer, useState } from 'react';
import { favReducer, initialFavState, FavContext } from '../src/state/state';
import { usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export function MainLayout({ children }) {
  const pathname = usePathname();

  const [favState, favDispatch] = useReducer(favReducer, initialFavState);
  const [visibleAlert, setVisibleAlert] = useState(true);

  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    close();
  }, [pathname, close]);

  const hideAlert = () => {
    localStorage.setItem('visibleAlertLS', 'hidden');
    setVisibleAlert(false);
  };

  useEffect(() => {
    if (localStorage.getItem('visibleAlertLS')) {
      setVisibleAlert(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoritesId', JSON.stringify(favState.favoritesId));
    localStorage.setItem('favoritesInfo', JSON.stringify(favState.favoritesInfo));
    localStorage.setItem('favoritesRating', JSON.stringify(favState.favoritesRating));
  }, [favState]);

  return (
    <AppShell
      navbar={{
        width: 280,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      withBorder={false}
    >
      <AppShell.Navbar style={{ padding: '24px', backgroundColor: '#f2ecfa' }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" lineSize={3} color="#9854f6" style={{ position: 'absolute', left: '0', top: '0' }} />
        <Space h="20" hiddenFrom="sm" />
        <Link href="/movies" style={{ textDecoration: 'none' }}>
          <Flex gap={12}>
            <img src="/logo.svg" alt="logo" />
            <Title order={2} className="title">
              ArrowFlicks
            </Title>
          </Flex>
        </Link>
        <Space h="80" />
        <Flex gap={16} direction="column">
          <Link href="/movies" className={pathname == '/movies' ? 'nav-item active ' : 'nav-item'}>
            Movies
          </Link>
          <Link href="/rated-movies" className={pathname == '/rated-movies' ? 'nav-item active ' : 'nav-item'}>
            Rated movies
          </Link>
        </Flex>
        <Alert
          className="no-access-alert"
          variant="light"
          color="blue"
          withCloseButton
          closeButtonLabel="Dismiss"
          title="Список фильмов пустой?"
          hidden={!visibleAlert}
          onClose={() => setVisibleAlert(false)}
        >
          Сервис TMDB может быть недоступен в некоторых регионах. Может быть, стоит попробовать открыть сайт по-другому?🤔
          <Space h="10" />
          <Badge className="pointer" variant="light" fullWidth size="sm" radius="sm" onClick={hideAlert}>
            Больше не показывать
          </Badge>
        </Alert>
      </AppShell.Navbar>
      <AppShell.Main style={{ backgroundColor: '#f5f5f6' }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" lineSize={3} />
        <FavContext.Provider value={{ favDispatch, favState }}>{children}</FavContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}
