'use client';

import React from 'react';
import { AppShell, Flex, Space, Title, Burger } from '@mantine/core';
import Link from 'next/link';
import '../styles/app.scss';
import { useEffect, useReducer } from 'react';
import { favReducer, initialFavState, FavContext } from '../src/state/state';
import NoAccessAlert from '../src/components/alert/alert';
import { usePathname } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export function MainLayout({ children }) {
  const pathname = usePathname();

  const [favState, favDispatch] = useReducer(favReducer, initialFavState);

  const [opened, { toggle, close }] = useDisclosure();

  useEffect(() => {
    close();
  }, [pathname, close]);

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
        <Burger
          opened={opened}
          onClick={toggle}
          hiddenFrom="sm"
          size="sm"
          lineSize={3}
          color="#9854f6"
          style={{ position: 'absolute', left: '0', top: '0' }}
          data-testid="app-burger"
        />
        <Space h="20" hiddenFrom="sm" />
        <Link href="/movies" style={{ textDecoration: 'none' }} data-testid="logo-link">
          <Flex gap={12}>
            <img src="/logo.svg" alt="logo" />
            <Title order={2} className="title">
              ArrowFlicks
            </Title>
          </Flex>
        </Link>
        <Space h="80" />
        <Flex gap={16} direction="column">
          <Link
            href="/movies"
            className={pathname == '/movies' ? 'nav-item active ' : 'nav-item'}
            data-testid="movies-link"
          >
            Movies
          </Link>
          <Link
            href="/rated-movies"
            className={pathname == '/rated-movies' ? 'nav-item active ' : 'nav-item'}
            data-testid="rated-movies-link"
          >
            Rated movies
          </Link>
          <Link
            href="/new-trailers"
            className={pathname == '/new-trailers' ? 'nav-item active ' : 'nav-item'}
            data-testid="new-trailers-link"
          >
            New trailers
          </Link>
        </Flex>
        <NoAccessAlert />
      </AppShell.Navbar>
      <AppShell.Main style={{ backgroundColor: '#f5f5f6' }}>
        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" lineSize={3} data-testid="app-burger" />
        <FavContext.Provider value={{ favDispatch, favState }}>{children}</FavContext.Provider>
      </AppShell.Main>
    </AppShell>
  );
}
