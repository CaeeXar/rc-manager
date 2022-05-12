import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Place } from '../../js/types';
import PlaceEdit from '../../lib/PlaceEdit';

const Edit: NextPage<{
    place: Place;
}> = ({ place }) => {
    return <PlaceEdit place={place} edit={true} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.query;

    if (!session || !id)
        return {
            props: {},
        };

    const username = session.user?.name;
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/places/getById', {
        method: 'POST',
        body: JSON.stringify({
            username,
            id: +id,
        }),
    });
    const place: Place = await res.json();

    return {
        props: {
            place,
        },
    };
};

export default Edit;
