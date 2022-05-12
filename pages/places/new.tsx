import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { Place } from '../../js/types';
import PlaceEdit from '../../lib/PlaceEdit';

const Edit: NextPage = () => {
    const { data: session, status } = useSession();
    let username = '';

    if (session && session.user && session?.user.name)
        username = session?.user?.name;
    else return <small>Error</small>;

    const place: Place = {
        id: null,
        username,
        title: '',
        description: '',
        googleMapsLink: '',
        imgPath: null,
        modified: null,
    };
    return <PlaceEdit place={place} edit={false} />;
};

export default Edit;
