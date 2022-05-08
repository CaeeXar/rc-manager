import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Image, NavLink, Row } from 'react-bootstrap';

export default function PageFooter() {
    return (
        <footer className="pt-3 footer text-center">
            <Container fluid>
                <Row>
                    <Col>
                        <span className="text-uppercase h5">Fly safe!</span>

                        <Image src="./drone.svg" fluid alt="RCM-Logo" />
                    </Col>

                    <Col className="text-start">
                        <span className="text-uppercase h5">Social media</span>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink
                                    href="https://www.instagram.com/erdosamuel/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>
                                        <FontAwesomeIcon
                                            icon={['fab', 'instagram']}
                                        />
                                    </span>

                                    <text>Check out my Instagram</text>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="https://github.com/CaeeXar?tab=repositories"
                                    target="_blank"
                                >
                                    <span>
                                        <FontAwesomeIcon icon={['fab', 'github']} />
                                    </span>

                                    <text>Check out my other projects</text>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="http://192.168.178.33:3000/"
                                    target="_blank"
                                >
                                    <span>
                                        <FontAwesomeIcon icon={['fab', 'discord']} />
                                    </span>

                                    <text>Join my discord-server</text>
                                </NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col className="text-start">
                        <span className="text-uppercase h5">Other</span>
                        <ul className="list-unstyled">
                            <li>
                                <NavLink
                                    href="https://www.instagram.com/erdosamuel/"
                                    target="_blank"
                                >
                                    <span>
                                        <FontAwesomeIcon icon={['fas', 'info']} />
                                    </span>

                                    <text>Legal notice</text>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href="http://192.168.178.33:3000/"
                                    target="_blank"
                                >
                                    <span>
                                        <FontAwesomeIcon
                                            icon={['fas', 'address-book']}
                                        />
                                    </span>

                                    <text>Contact me</text>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href="http://192.168.178.33:3000/"
                                    target="_blank"
                                >
                                    <span>
                                        <FontAwesomeIcon
                                            icon={['fas', 'table-columns']}
                                        />
                                    </span>

                                    <text>Goto project-dashboard</text>
                                </NavLink>
                            </li>
                        </ul>
                    </Col>
                </Row>

                <p className="footer-copyright">
                    ©2022 <b>CaeeXar</b>
                </p>
            </Container>
        </footer>
    );
}
