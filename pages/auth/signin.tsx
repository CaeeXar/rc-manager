import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";


const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const loggedIn = status === 'authenticated';

    return (
        <h1>Log die ei</h1>
    );
};

export default Home;