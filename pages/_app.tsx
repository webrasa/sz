import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import {SessionProvider} from 'next-auth/react';

import nProgress from 'nprogress';
import '../styles/nprogress.css'
import { Session } from 'next-auth'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import createEmotionCache from '../src/utils/emotionCache/createEmotionCache';
import { SidebarProvider } from '../src/contexts/SidebarContext';
import lightThemeOptions from '../styles/theme/lightThemeOptions';
import '../styles/globals.css';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

// function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: AppProps<{session: Session}>) {
  const MyApp: React.FunctionComponent<MyAppProps> = (props) => {

    const { Component, emotionCache = clientSideEmotionCache, pageProps, session: Session } = props;
    const getLayout = Component.getLayout ?? ((page) => page);
  
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeError', nProgress.done);
  Router.events.on('routeChangeComplete', nProgress.done);
  
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Tokyo SZ</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <SidebarProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
      </CacheProvider>
      </SidebarProvider>
    </SessionProvider>
  )
}

export default MyApp
