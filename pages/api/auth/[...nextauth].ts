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
        //   return true;
            // const user = await prisma.user?.findUnique({
            //     //   where: {email: 'test@gmail.com'}
            //     where: {
            //         email: profile.email,
            //     },
            // });
            // if(!user){ // This is potential new user
            //     console.log(user);
            //     return true;
            // }
            // else{
            //     if(user.active){// User exist and it's active
            //         return true;
            //     }
            //     console.log('User isn\'t active!');
            //     return false;
            //     // return '../../auth/login.tsx'
            // }
            const user = await prisma.user?.findUnique({
                //   where: {email: 'test@gmail.com'}
                where: {
                    email: profile.email,
                },
            });
            if(user?.active){
                console.log("Valid user", user.email);
                return true;
            }
            console.log('Invalid user');
            return false;
      },
    //   async redirect({ url, baseUrl }: {url:string, baseUrl:string}) {
    //       // Allows relative callback URLs
    //       console.log(`${baseUrl}${url}`);
    //       if (url.startsWith("/")) return `${baseUrl}${url}`
    //       // Allows callback URLs on the same origin
    //       else if (new URL(url).origin === baseUrl) return url
    //       return baseUrl
    //     }
        // NOTE: This will work only if you work with JWT. So without persisting session in database
        // https://next-auth.js.org/configuration/callbacks#jwt-callback
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('JWT callback ', user);
            return token
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

