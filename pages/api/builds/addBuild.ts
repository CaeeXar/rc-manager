import type { NextApiRequest, NextApiResponse } from 'next';
import { addUserBuild } from '../../../js/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { build } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let success = await addUserBuild(build);
        if (success) return res.status(200).json({ message: 'Build added.' });
        else return res.status(400).json({ message: 'Build could not be added!' });
    }
};
