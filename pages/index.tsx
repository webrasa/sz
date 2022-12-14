import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
// import styles from '../styles/Home.module.css'

import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import {getSession, signIn, signOut, useSession} from 'next-auth/react';

import prisma from '../lib/prisma';
import { useEffect, useState } from 'react';

// export const getStaticProps: GetStaticProps = async () => {
//   const role = await prisma.role.findMany({});
//   console.log(role);
//   return {
//     props: { role },
//     revalidate: 10,
//   };
// }

// fetch('http://localhost:3000/api/hello').then(response => response.json()).then(data => console.log(data));

type Props = {
  role: []
}
type Role = {
  name: String,
  id: Number
}

const Home: NextPage<Props> = (props) => {

  const [token, setToken] = useState('Loading...');

  // const [status, setStatus] = useState('Loading...');

  useEffect(()=>{
    const t = localStorage.getItem('sz-token');
    if(t){
      setToken(token);
      Router.replace('/admin');
    }
    else{
      setToken('no');
      Router.replace('/auth/login');
    }
  }, []);


  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

    // NOTE: This will be populated from server side getServerSideProps(). See at the bottom
    // console.log('PROPS for page ', props);


    // NOTE: Client side checking
  // const {data: session, status} = useSession();

  // let status = 'unauthenticated'
  // const token = localStorage.getItem('sz-token');
  // console.log(token);
  

  let right = null;

  // if(status === 'unauthenticated'){
  //   right = (
  //     <div>
  //       index
  //       <p>You are not signed in!</p>
  //       <button onClick={() => signIn()}>Sign in</button>
  //     </div>
  //   )
  // }

  // if(status === 'authenticated'){
  //   right = (
  //     <div className='app'>
  //       index
  //       <h1>Welcome! {session.user?.email} Your role is {session.user?.role}</h1>
  //       <button onClick={()=> signOut()}>Sign out</button>
  //       <br></br>
  //       <Link href={'/invoices'}>Invoices</Link>
  //       <br></br>
  //       <Link href={'/admin'}>Admin</Link>
  //     </div>
  //   )
  // }

  return <div>Loading...</div>;
}

export default Home

// export const getServerSideProps = async(context) => {
//   // console.log('CONTEXT ', context);
//   const session = await getSession(context);
//   console.log('SERVER check ', session);
//   return {
//     props: {session},
//   }
// }
