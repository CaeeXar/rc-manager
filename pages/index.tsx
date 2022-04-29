import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Container, Figure } from "react-bootstrap";


const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const loggedIn = status === 'authenticated';

    return (
        <Container className="text-center" style={{ marginTop: "56px" }}>
            <Figure style={{ width: "100%" }}>
                <Figure.Image alt="Drone logo" src="/drone.svg" />

                <Figure.Caption>
                    Welcome to your personal RC-Manager! 😊
                </Figure.Caption>
            </Figure>

            {!loggedIn && <Button onClick={() => signIn()}>Login</Button>}
            {loggedIn && <Button onClick={() => signOut()}>Logout</Button>}
        </Container>
    );
};

export default Home;