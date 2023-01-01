// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// https://refine.dev/blog/next-js-api-routes/
import type { NextApiRequest, NextApiResponse } from 'next'

// import prisma from '../../lib/prisma';

// https://ultimatecourses.com/blog/deprecating-the-switch-statement-for-object-literals
// function getMethod(type: string): String{
//     const methods = {
//         'POST': 'NewUser()',
//         'GET': 'ValidateUser()',
//         'PUT': 'UpdateUser()',
//         'DELETE': 'DeleteUser()'
//     }
    
//     return methods[type];

// }

type Data = {
  name: String
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const role = await prisma.role.findMany({});
  // console.log(role);
  // return {
  //   props: { role },
  //   revalidate: 10,
  // };
  console.log(req.method);
  res.status(200).json({ name: "Hard coded name" })
}
