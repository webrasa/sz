import { FC, useState, useEffect } from "react";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';
import Link from "next/link";


interface Props {}

const Invoices: FC<Props> = (props): JSX.Element => {

  const {data: session, status} = useSession();
  const [user, setUser] = useState({});

  
  // useEffect(()=>{
  //     if(status === 'authenticated'){
  //         setUser(session.user);
  //       }
        
  //   }, [status]);
    
    // console.log('USER ', user );
  return <div>
    <div>
      Invoices
        <h1>Welcome! {session?.user?.email}</h1>
        <Link href={'/admin'}>Admin</Link>
      </div>
  </div>;
};

export default Invoices;