import { NextApiRequest, NextApiResponse } from 'next';


const authorization = (req: NextApiRequest, res: NextApiResponse, next: any) => {
    // check for authentication
    console.log('Authorization middleware');
    
    // if (!req.headers.authorization) {
    //     return res.status(401).json({ message: 'Unauthorized' });
    // }
    next();
};

export default authorization;