import type { NextApiRequest, NextApiResponse } from 'next';
import { getRateTypes, getUserRates } from '../../../js/database';
import { RateType } from '../../../js/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET')
        return res.status(400).json({ message: 'Wrong method!' });

    let rateTypes: RateType[] = await getRateTypes();
    if (!!rateTypes) return res.status(200).json({ rateTypes });
    else return res.status(400).json({ message: 'No rates found' });
}
