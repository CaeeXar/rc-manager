import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { RestrictedPages } from '../js/const';
import Loader from '../lib/Loader';
import Unauthenticated from '../lib/Unauthenticated';

const Layout: NextPage<{ children: any }> = ({ children }) => {
    const router = useRouter();
    const { data: session, status } = useSession();
    const loading = status === 'loading';
    const authenticated = status === 'authenticated';

    if (loading) return <Loader />;

    if (!authenticated && RestrictedPages.includes(router.asPath))
        return <Unauthenticated />;

    return <div className="global-wrapper">{children}</div>;
};

export default Layout;
