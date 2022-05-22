import type { NextApiRequest, NextApiResponse } from 'next';
import { getUserBatteryById } from '../../../js/database';
import { Battery } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, username } = JSON.parse(req.body);

    if (req.method === 'POST') {
        let battery: Battery = await getUserBatteryById(username, id);
        if (!!battery) return res.status(200).json({ ...battery });
        else
            return res
                .status(400)
                .json({ message: 'No battery found with given id.' });
    }
}
