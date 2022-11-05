import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link';
import { useRouter } from 'next/router';
import {signIn, signOut, useSession} from 'next-auth/react';

import prisma from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const role = await prisma.role.findMany({});
  console.log(role);
  return {
    props: { role },
    revalidate: 10,
  };
}

// fetch('http://localhost:3000/api/hello').then(response => response.json()).then(data => console.log(data));

type Props = {
  role: []
}
type Role = {
  name: String,
  id: Number
}

const Home: NextPage<Props> = (props) => {

  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;


  const {data: session, status} = useSession();

  let right = null;

  if(status === 'unauthenticated'){
    right = (
      <div>
        <p>You are not signed in!</p>
        <button onClick={() => signIn()}>Sign in</button>
      </div>
    )
  }

  if(status === 'authenticated'){
    right = (
      <div>
        <h1>Welcome! {session.user?.email}</h1>
        <button onClick={()=> signOut()}>Sign out</button>
      </div>
    )
  }

  if (status === 'loading') {
    return null;
  }

  return right;
}

export default Home
