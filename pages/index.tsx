import { NextPage } from 'next';
import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Container, Image } from 'react-bootstrap';

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const authenticated = status === 'authenticated';

    return (
        <Container>
            <h1 className="title">Welcome to your personal RC-Manager! 😊</h1>

            <div className="mb-5">
                <Image alt="Drone logo" src="/drone.svg" fluid />
            </div>

            {!authenticated && <Button onClick={() => signIn()}>Login</Button>}
            {authenticated && <Button onClick={() => signOut()}>Logout</Button>}
        </Container>
    );
};

export default Home;
