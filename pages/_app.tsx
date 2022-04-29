import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../lib/Navigation';
import { SessionProvider } from "next-auth/react"

function MyApp({
  Component, pageProps: { session, ...pageProps }
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Navigation />

      <div className='content'>
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

export default MyApp
