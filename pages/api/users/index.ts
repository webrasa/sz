import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';
import authentication from '../../../middleware/authentication';
import authorization from '../../../middleware/authorization';


const handler = connect();

handler.use(authentication);
handler.use(authorization);

handler.get<NextApiRequest, NextApiResponse>((req, res) => {
    res.status(200).json({message: 'Hello Users!'});
});

module.exports = handler;