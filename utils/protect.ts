import { NextRequest, NextResponse } from "next/server";
import { getCookie } from "cookies-next";
import { verify } from "./jwt";


export const protect = async (req: NextRequest, res: NextResponse, next: Function) => {
    // console.log('req: ', req, ' res: ', res);
    const jwt = getCookie("sz-token");
    
    if(!jwt){
        console.log(jwt);
        next({name: "test"})
        return NextResponse.redirect("localhost:3000/auth/login");
    }
    const t = await verify(jwt, process.env.NEXTAUTH_SECRET || '');
    next(t);
    return NextResponse.redirect("localhost:3000/admin");
    next();
    
}