import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Rate, RateType } from '../../js/types';
import RateEdit from '../../lib/RateEdit';

const Edit: NextPage = () => {
    const { data: session, status } = useSession();
    let username = '';

    if (session && session.user && session?.user.name)
        username = session?.user?.name;
    else return <small>Error</small>;

    let rate = {
        id: null,
        username,
        title: '',
        description: '',
        rateType: RateType.BETAFLIGHT,
        rollRcRate: 0.0,
        rollRate: 0.0,
        rollExpo: 0.0,
        pitchRcRate: 0.0,
        pitchRate: 0.0,
        pitchExpo: 0.0,
        yawRcRate: 0.0,
        yawRate: 0.0,
        yawExpo: 0.0,
        modified: null,
    } as Rate;

    return <RateEdit rate={rate} edit={false} />;
};

export default Edit;
