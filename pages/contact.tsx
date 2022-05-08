import { NextPage } from 'next';
import { Container } from 'react-bootstrap';

const Builds: NextPage = () => {
    return (
        <Container className="contact">
            <p className="h5 text-start">Address:</p>

            <ul className="list-unstyled text-start">
                <li>Max Mustermann</li>
                <li>Musterstrasse 1</li>
                <li>1234 Musterhausen, Österreich</li>
                <li>Mobile-number: +123456789</li>
                <li>E-Mail: max@muster.at</li>
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
