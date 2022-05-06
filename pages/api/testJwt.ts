// pages/api/getToken.js
// This is an example of how to read a JSON Web Token from an API route
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next';

const secret = process.env.NEXTAUTH_SECRET;

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const token = await getToken({ req, secret })
    if (token) {
        // Signed in
        res.json(token)
    } else {
        // Not Signed in
        res.status(401)
    }
    res.end()
}