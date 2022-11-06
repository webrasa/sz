import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import GitHubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import prisma from '../../../lib/prisma';
import { signIn, signOut } from 'next-auth/react';

const options = {
    providers: [
        // NOTE: https://www.youtube.com/watch?v=ollnut-J47s
        CredentialsProvider({
            type: "credentials",
            credentials: {},
            async authorize(credentials, req) {
              const { email, password } = credentials as {
                email: string;
                password: string;
              };
              // perform you login logic
              // find out user from db
            //   if (email !== "john@gmail.com" || password !== "1234") {
            //     throw new Error("invalid credentials");
            //   }

            const user = await prisma.user?.findUnique({
                //   where: {email: 'test@gmail.com'}
                where: {
                    email: 'zivanovicratibor@gmail.com',
                },
            });
      
              // if everything is fine
            //   return {
            //     id: "1234",
            //     name: "John Doe",
            //     email: "john@gmail.com",
            //     role: "admin",
            //   };
            user.role = 'admin';
            return user;
            },
          }),
    ],
    // adapter: PrismaAdapter(prisma),
    secret: process.env.JWT_SECRET,
    callbacks: {
        // NOTE: This will work only if you work with JWT. So without persisting session in database
        // https://next-auth.js.org/configuration/callbacks#jwt-callback
        async jwt({ token, user, account, profile, isNewUser }) {
            console.log('JWT ');

            if(user){
                token.role = user.role;
            }
            return token
        },
        session: async ({ session, token }) => {
            console.log('SESSION ');
            session.user.role = token.role;
    
            return session;
            // return Promise.resolve(session);
        },
    },
    pages:{
      // https://next-auth.js.org/configuration/pages
      signIn: '/auth/login',
      error: '/auth/error',
      newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    }
  };

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

