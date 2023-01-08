import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "./utils/jwt";
import { getToken } from "next-auth/jwt";


export default withAuth(
  async function middleware(req: NextRequest) {

    const jwt = req.cookies.get("test-token");
    // const url = req.url;
    // const {pathname} = req.nextUrl;

    

    // console.log('COOKIE ', jwt);
    
    if(jwt === undefined){
      console.log('JWT UNDEF. ', jwt);
      req.nextUrl.pathname = '/auth/login';
      return NextResponse.redirect(req.nextUrl);
    }

    // try {
      let t = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5hbWUiOiJKb2huIERvZSIsInJvbGUiOiJhZG1pbiJ9LCJleHAiOjE2NzMxMzk4MDgsImlhdCI6MTY3MzEzNjIwOCwibmJmIjoxNjczMTM2MjA4fQ.VL6fMK5xv1szcCrpBpUul5FTqbsGsLwC4YQ3150heTI`;
      await verify(t, process.env.NEXTAUTH_SECRET || '');
    //   // return NextResponse.next();
    //   return NextResponse.rewrite(new URL("/admin", req.url));

    // } catch (error) {
    //   req.nextUrl.pathname = "/auth/login";
    //   return NextResponse.redirect(req.nextUrl);
    // }
    
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized({ req, token }) {
        return true;
        // return token?.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/", "/admin"] };