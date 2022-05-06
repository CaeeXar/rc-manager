import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../lib/Navigation';
import { SessionProvider } from "next-auth/react"
import { SSRProvider } from 'react-bootstrap';

function MyApp({
  Component, pageProps
}: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <SSRProvider>
        <Navigation />

        <div className='content'>
          <Component {...pageProps} />
        </div>
      </SSRProvider>
    </SessionProvider>
  );
}

export default MyApp
