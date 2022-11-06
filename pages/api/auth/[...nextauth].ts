import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google'
import prisma from '../../../lib/prisma';
import { signIn, signOut } from 'next-auth/react';

const options = {
    providers: [
      // GitHubProvider({
      //   clientId: process.env.GITHUB_ID,
      //   clientSecret: process.env.GITHUB_SECRET,
      // }),
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
    ],
    // adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    callbacks: {
      // https://next-auth.js.org/configuration/callbacks
      async signIn({account, profile}: {account: Object, profile: Object}){
          // console.log('ACCOUNT ', account);
          // console.log('PROFILE ', profile);
            const user = await prisma.user?.findUnique({
                //   where: {email: 'test@gmail.com'}
                where: {
                    email: profile.email,
                },
            });
            if(user?.active){
                console.log("Valid user", user);
                return user;
            }
            console.log('Invalid user');
            return false;
      },
        // NOTE: This will work only if you work with JWT. So without persisting session in database
        // https://next-auth.js.org/configuration/callbacks#jwt-callback
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('JWT user ', user);
            // console.log('JWT token ', token);
            return token
        },
        session: async({session, token, user})=>{
          // console.log('SESSION ', session);
          // console.log('SESSION token ', user);
          return session;
        }
    },
    pages:{
      // https://next-auth.js.org/configuration/pages
      // signIn: '/auth/login',
      error: '/auth/error',
      newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
  };

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

