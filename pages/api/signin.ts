import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../js/types';
import { getUserLogin } from '../../js/database';
import { compareSync } from 'bcrypt';
import { ERROR_WRONG_PASSWORD, ERROR_WRONG_USER } from '../../js/const';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user: User = req.body;
    if (req.method === 'POST') {
        let userLogin: User = await getUserLogin(user.username);
        if (!userLogin) return res.status(400).json({ error: ERROR_WRONG_USER });

        // validation
        if (compareSync(user.password, userLogin.password)) return res.status(200).json(userLogin);
        else return res.status(400).json({ message: "Wrong password given!", error: ERROR_WRONG_PASSWORD });
    }
}