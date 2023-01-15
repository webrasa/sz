import { NextApiRequest, NextApiResponse } from 'next';
import connect from 'next-connect';


const handler = connect();

handler.get<NextApiRequest, NextApiResponse>((req, res) => {
    res.status(200).json({message: 'Entry point of API - Router!'});
});

module.exports = handler;