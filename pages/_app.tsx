import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../lib/Navigation';
import { SessionProvider } from "next-auth/react"
import { SSRProvider } from 'react-bootstrap';

function MyApp({
  Component, pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SSRProvider>
      <SessionProvider session={session}>
        <Navigation />

        <div className='content'>
          <Component {...pageProps} />
        </div>
      </SessionProvider>
    </SSRProvider>
  );
}

export default MyApp
