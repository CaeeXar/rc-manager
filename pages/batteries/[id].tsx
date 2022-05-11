import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { Battery } from '../../js/types';
import BatteryEdit from '../../lib/BatteryEdit';

const Edit: NextPage<{
    battery: Battery;
}> = ({ battery }) => {
    return <BatteryEdit edit={true} battery={battery} />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.query;

    if (!session || !id)
        return {
            props: {},
        };

    const username = session.user?.name;
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/batteries/getById', {
        method: 'POST',
        body: JSON.stringify({
            username,
            id: +id,
        }),
    });
    const battery: Battery = await res.json();

    return {
        props: {
            battery,
        },
    };
};

export default Edit;
