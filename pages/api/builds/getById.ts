import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserBuildById } from '../../../js/database';
import { Build } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, username } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let build: Build = await getUserBuildById(username, id);
        if (!!build) return res.status(200).json({ ...build });
        else return res.status(400).json({ message: 'No builds found' });
    }
}
