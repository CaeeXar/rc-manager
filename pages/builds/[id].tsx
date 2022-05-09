import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Build } from '../../js/types';
import BuildEdit from '../../lib/BuildEdit';

const Edit: NextPage<{
    build: Build;
}> = ({ build }) => {
    return <BuildEdit build={build} edit={true} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.query;

    if (!session || !id)
        return {
            props: {},
        };

    const username = session.user?.name;
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/builds/getById', {
        method: 'POST',
        body: JSON.stringify({
            username,
            id: +id,
        }),
    });
    const build: Build = await res.json();

    return {
        props: {
            build,
        },
    };
};

export default Edit;
