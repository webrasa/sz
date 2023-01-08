import { setCookie } from 'cookies-next';
import { sign } from "../../../utils/jwt";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function Login(req: NextApiRequest, res: NextApiResponse, next: Function) {

    const t = await sign({name: 'John Doe', role: 'admin'}, process.env.NEXTAUTH_SECRET);

    setCookie('sz-token', t);

    console.log('JWT ', t);



  res.status(200).json({ token: t });

    
}
