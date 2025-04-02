'use client';

import { createTheme, rem } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'purple',
  fontFamily: 'Inter, sans-serif',
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(18),
    xl: rem(20),
    xxl: rem(22),
  },
  colors: {
    white: ['#ffffff', '#e7e7e7', '#cdcdcd', '#b2b2b2', '#9a9a9a', '#8b8b8b', '#848484', '#717171', '#656565', '#575757'],
    purple: ['#f4effb', '#e5d5fa', '#d1b4f8', '#bd93f7', '#9854f6', '#541f9d', '#7a3fc5', '#6832ae', '#5c2c9b', '#4f2489'],
    yellow: ['#fab005', '#fff0cd', '#fde09d', '#fccf67', '#fbc13b', '#fab720', '#fab30e', '#df9d00', '#c78b00', '#ac7700'],
    gray: ['#f5f5f6', '#eaebed', '#d5d6dc', '#acadb9', '#7b7c88', '#868689', '#7f7f83', '#6d6d70', '#5f5f66', '#52525b'],
  },
});
