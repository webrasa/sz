import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";
// import { verify } from "./utils/jwtVerify";

export default withAuth(
  async function middleware(req: NextRequest) {

    console.log(req);
    

    const jwt = req.cookies.get("test-token");
    const url = req.url;
    const {pathname} = req.nextUrl;

    console.log('COOKIE ', jwt);
    
    if(jwt === undefined){
      console.log('JWT UNDEF. ', jwt);
      req.nextUrl.pathname = '/auth/login';
      return NextResponse.redirect(req.nextUrl);
    }

    // try {
    //   // await verify(jwt, process.env.NEXTAUTH_SECRET);
    //   // return NextResponse.next();
    //   return NextResponse.rewrite(new URL("/admin", req.url));

    // } catch (error) {
    //   req.nextUrl.pathname = "/auth/login";
    //   return NextResponse.redirect(req.nextUrl);
    // }
    
    // return NextResponse.next();
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  // {
  //   callbacks: {
  //     authorized({ token }) {
  //       console.log("RASA ", token);
  //       return true;
  //       // return token?.role === "admin";
  //     },
  //   },
  // }
);

export const config = { matcher: ["/", "/admin"] };