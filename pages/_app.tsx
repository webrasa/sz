import type { AppProps } from 'next/app'
import Router from 'next/router';
import {SessionProvider} from 'next-auth/react';

import nProgress from 'nprogress';
import { Session } from 'next-auth'

import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';

import createEmotionCache from '../utils/createEmotionCache';
// import lightThemeOptions from '../styles/theme/lightThemeOptions';

import {ColorModeContext, useMode} from '../styles/theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import '../styles/globals.css';
import '../styles/nprogress.css';
interface MyAppProps<T> extends AppProps {
 emotionCache?: EmotionCache;
 session?: Session
}

const clientSideEmotionCache = createEmotionCache();

// const lightTheme = createTheme(lightThemeOptions);



function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps<{session: Session}>) {
  
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeComplete', nProgress.done);

  const [theme, colorMode] = useMode();

  
  return (
    // <SessionProvider session={pageProps.session}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ColorModeContext.Provider>
    // </SessionProvider>
  )
}

export default MyApp
