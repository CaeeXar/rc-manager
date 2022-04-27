import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navigation from '../lib/Navigation';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Navigation />

      <div className='content'>
        <Component {...pageProps} />
      </div>
    </>
  );
}

export default MyApp
