import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import Loader from '../lib/Loader';

const Layout: NextPage<{ children: any }> = ({ children }) => {
    const { data: session, status } = useSession();
    const loading = status === 'loading';

    if (loading) return <Loader />;

    return <div className="global-wrapper">{children}</div>;
};

export default Layout;
