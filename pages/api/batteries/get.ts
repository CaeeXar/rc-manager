import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserBatteries } from '../../../js/database';
import { Battery } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let batteries: Battery[] = await getUserBatteries(username);
        if (!!batteries) return res.status(200).json({ batteries });
        else return res.status(400).json({ message: 'No builds found' });
    }
}
