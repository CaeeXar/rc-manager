import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserPlaceById } from '../../../js/database';
import { Place } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, username } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let place: Place = await getUserPlaceById(username, id);
        if (!!place) return res.status(200).json({ ...place });
        else return res.status(400).json({ message: 'No place found' });
    }
}
