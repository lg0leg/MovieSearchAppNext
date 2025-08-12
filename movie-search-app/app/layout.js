import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { MainLayout } from './main-layout';
import '@mantine/core/styles.css';
import { theme } from '../theme';
import { inter, poppins } from '../src/fonts/fonts';

export const metadata = {
  // title: 'ArrowFlicks',
  title: {
    template: '%s | ArrowFlicks',
    default: 'ArrowFlicks',
  },
  description: 'Movie database application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps} className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <ColorSchemeScript />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no" />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <MainLayout>{children}</MainLayout>
        </MantineProvider>
      </body>
    </html>
  );
}
