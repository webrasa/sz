import { FC } from "react";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';
import Link from "next/link";
import Router from "next/router";


interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {

  const {data: session, status} = useSession();

  if(status === 'unauthenticated'){
    Router.replace('/auth/login');
  }

  return <div>
    <div>
      admin
        <h1>Welcome! {session?.user?.email} Your role is {session?.user?.role}</h1>
        {/* <button onClick={()=> signOut()}>Sign out</button> */}
        <br></br>
        <Link href={'/invoices'}>Invoices</Link>
      </div>
  </div>;
};

export default Admin;