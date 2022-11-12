import { FC } from "react";
import {getSession, signIn, signOut, useSession} from 'next-auth/react';


interface Props {}

const Admin: FC<Props> = (props): JSX.Element => {

  const {data: session, status} = useSession();

  console.log('SESSION ', session);

  return <div>admin</div>;
};

export default Admin;