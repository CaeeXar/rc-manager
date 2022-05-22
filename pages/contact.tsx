import { NextPage } from 'next';
import { Container } from 'react-bootstrap';

const Builds: NextPage = () => {
    return (
        <Container className="contact">
            <p className="h5 text-start">Contact:</p>

            <ul className="list-unstyled text-start">
                <li>Samuel Erdö</li>
                <li>2604 Theresienfeld, Österreich</li>
            </ul>

            <hr />

            <p className="h5">
                Currently the only way to get in touch is trough discord...
            </p>

            <span>So make sure to join my server! 😃</span>
        </Container>
    );
};

export default Builds;
