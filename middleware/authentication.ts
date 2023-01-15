import { NextApiRequest, NextApiResponse } from 'next';


const authentication = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // check for authentication
    console.log('Authentication middleware');
    
    // if (!req.headers.authorization) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    next();
};

export default authentication;