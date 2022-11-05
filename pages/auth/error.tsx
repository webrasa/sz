import type { NextPage } from 'next';
import { useRouter } from 'next/router'


type Props = {
    role: []
  }

const Login: NextPage<Props> = (props) => {

    const router = useRouter();
    const {error} = router.query;

    console.log(router.query);
    return <h1>Error with message: {error}!</h1>
}

export default Login
