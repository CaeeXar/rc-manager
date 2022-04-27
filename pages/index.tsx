import { NextPage } from "next";
import { Container, Figure, Image } from "react-bootstrap";


const Home: NextPage = () => {
    return (
        <Container className="text-center" style={{ marginTop: "56px" }}>
            <Figure>
                <Figure.Image alt="Drone logo" src="/drone.svg" />

                <Figure.Caption>
                    Welcome to your personal RC-Manager! 😊
                </Figure.Caption>
            </Figure>
        </Container>
    );
};

export default Home;