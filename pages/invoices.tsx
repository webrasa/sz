import { FC, useState, useEffect } from "react";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';
import Link from "next/link";
import Sidebar from "../src/layouts/Sidebar";
import Topbar from "../src/layouts/Topbar";


interface Props {}

const Invoices: FC<Props> = (props): JSX.Element => {

  const {data: session, status} = useSession();
  const [user, setUser] = useState({});

  // return <div>
  //   <div>
  //     Invoices
  //       <h1>Welcome! {session?.user?.email}</h1>
  //       <Link href={'/admin'}>Admin</Link>
  //     </div>
  // </div>;

  return (
    <div className="app">
      <Sidebar {...session?.user}/>
      <main className="content">
        
        <Topbar user={session?.user}/>
      </main>
      {/* admin
        <h1>Welcome! {session?.user?.email} Your role is {session?.user?.role}</h1> */}
        {/* <button onClick={()=> signOut()}>Sign out</button> */}
        {/* <br></br>
        <Link href={'/invoices'}>Invoices</Link> */}
      </div>
  )
};

export default Invoices;