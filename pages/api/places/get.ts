import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserPlaces } from '../../../js/database';
import { Place } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let places: Place[] = await getUserPlaces(username);
        if (!!places) return res.status(200).json({ places });
        else return res.status(400).json({ message: 'No places found' });
    }
}
