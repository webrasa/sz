import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  // https://next-auth.js.org/configuration/options#session
  session: {
    strategy: "jwt",
    maxAge: 15 * 24 * 60 * 60, // 15 days
    // updateAge: 24 * 60 * 60, // 24 hours NOTE: Tis is ignored if you are using JWT
  },
  jwt:{

  },
  // https://next-auth.js.org/configuration/options#example
  cookies:{
    sessionToken:{
      name: 'test-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false
      }
    }
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        console.log('AUTHORIZE');
        
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        // if (email !== "john@gmail.com" || password !== "1234") {
        //   throw new Error("invalid credentials");
        // }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {

    // signIn({user, account, profile, email, credentials}){
    //   console.log(user);
    //   return true;
    // },

    jwt(params) {
      console.log('CALLBACK - JWT');

      // update token
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      return params.token;
    },
    session: async({session, token, user})=>{
      session.user.role = token.role;
      console.log('CALLBACK - SESSION');
      return session;
    }
  },
  // https://next-auth.js.org/configuration/options#events
  // events:{
  //   signIn(message) {
  //     console.log("EVENT Signin ", message);
  //   }
  // }
};

export default NextAuth(authOptions);