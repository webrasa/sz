import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Router from 'next/router';
import {SessionProvider} from 'next-auth/react';

import nProgress from 'nprogress';
import '../styles/nprogress.css'
import { Session } from 'next-auth'



function MyApp({ Component, pageProps }: AppProps<{session: Session}>) {
  
  Router.events.on('routeChangeStart', nProgress.start);
  Router.events.on('routeChangeComplete', nProgress.done);
  
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps}/>
    </SessionProvider>
  )
}

export default MyApp
