import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../js/types';
import { getUserLogin } from '../../js/database';
import { compareSync } from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const user: User = req.body;
    if (req.method === 'POST') {
        let userLogin: User = await getUserLogin(user.username);

        if (!userLogin) return res.status(400).json({ message: "No such user!", status: 1 });

        // validation
        if (compareSync(user.password, userLogin.password)) return res.status(200).json(userLogin);
        else return res.status(400).json({ message: "Wrong password!", status: 2 });
    }
}