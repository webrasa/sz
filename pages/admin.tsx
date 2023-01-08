import { FC } from "react";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';
import Link from "next/link";
import Router from "next/router";

// import styles from '../styles/Home.module.css';

// import Topbar from '../src/layouts/Topbar';
// import Sidebar from "../src/layouts/Sidebar";
import Main from "../src/layouts/Main";
import Dashboard from "../src/layouts/Dashboard";
import { protect } from "../utils/protect";

export function getServerSideProps(context){
  let t;
  const user = protect(context.req, context.res, (user)=>{t=user;
  });
    console.log(t);
    
  return {
    props: {
      user: t
    }
  }
}

interface Props {user:{
  name: string,
  email:string,
  role:string
}}

const Admin: FC<Props> = (props): JSX.Element => {

  // const {data: session, status} = useSession();

  // console.log("STATUS ", status);
  // console.log("session ", session);
  

  // if(status === 'unauthenticated'){
  //   Router.replace('/auth/login');
  // }

  // if(status === 'authenticated'){
    return (
      <Main user={props.user}>
        <Dashboard/>
        {/* admin
          <h1>Welcome! {session?.user?.email} Your role is {session?.user?.role}</h1> */}
          {/* <button onClick={()=> signOut()}>Sign out</button> */}
          {/* <br></br>
          <Link href={'/invoices'}>Invoices</Link> */}
      </Main>
    )
  // }

};

export default Admin;