import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth(
  function middleware(req: NextRequest) {
    if(req.nextauth.token?.role !== 'admin'){
      return NextResponse.rewrite(new URL("/", req.url));
    }
    
    return NextResponse.rewrite(new URL("/admin", req.url));
  },
  {
    callbacks: {
      authorized({ token }) {
        // console.log("RASA ", token);
        return true;
        return token?.role === "admin";
      },
    },
  }
);

export const config = { matcher: ["/", "/admin"] };