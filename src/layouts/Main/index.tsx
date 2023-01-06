import { FC, ReactNode } from 'react';
import Sidebar from '../Sidebar';
import Topbar from '../Topbar';

interface SidebarProps {
    children?: ReactNode,
    user: {
      name: string,
      email: string,
      role: string
    }
}

const Main: FC<SidebarProps> = ({user, children}) => {
  
    return (
        <div className="app">
          <Sidebar user={user}/>
          <main className="content">
    
            <Topbar />
            <>
              {children}
            </>
          </main>
          {/* admin
            <h1>Welcome! {session?.user?.email} Your role is {session?.user?.role}</h1> */}
            {/* <button onClick={()=> signOut()}>Sign out</button> */}
            {/* <br></br>
            <Link href={'/invoices'}>Invoices</Link> */}
          </div>
      )
    };

export default Main;