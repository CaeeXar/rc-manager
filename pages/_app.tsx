import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Navigation from '../lib/Navigation';
import { SessionProvider } from 'next-auth/react';
import { SSRProvider } from 'react-bootstrap';
import PageFooter from '../lib/PageFooter';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
    faAdd,
    faAddressBook,
    faEdit,
    faInfo,
    faMapLocationDot,
    faTableColumns,
    faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Layout from '../components/Layout';

library.add(
    fab,
    faAdd,
    faEdit,
    faTrash,
    faTableColumns,
    faAddressBook,
    faInfo,
    faMapLocationDot
);

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <SessionProvider session={pageProps.session}>
            <SSRProvider>
                <Layout>
                    {/* <div className="global-wrapper"> */}
                    <Navigation />

                    <div className="content">
                        <Component {...pageProps} />
                    </div>

                    <PageFooter />
                    {/* </div> */}
                </Layout>
            </SSRProvider>
        </SessionProvider>
    );
}

export default MyApp;
