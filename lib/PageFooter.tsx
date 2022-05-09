import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Image, NavLink, Row } from 'react-bootstrap';

export default function PageFooter() {
    return (
        <footer className="pt-3 footer text-center">
            <Container fluid>
                <Row>
                    <Col>
                        <span className="text-uppercase h5">Fly safe!</span>
                        
                        <Image src="/drone.svg" fluid alt="RCM-Logo" />
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
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon
                                            icon={['fab', 'instagram']}
                                        />
                                    </span>

                                    <span>Visit my Instagram</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="https://github.com/CaeeXar?tab=repositories"
                                    target="_blank"
                                >
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon icon={['fab', 'github']} />
                                    </span>

                                    <span>Check out my other projects</span>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    href="https://discord.gg/DTht8WpNEJ"
                                    target="_blank"
                                >
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon icon={['fab', 'discord']} />
                                    </span>

                                    <span>Join my discord-server</span>
                                </NavLink>
                            </li>
                        </ul>
                    </Col>

                    <Col className="text-start">
                        <span className="text-uppercase h5">Other</span>
                        <ul className="list-unstyled">
                            <li>
                                <NavLink href="/contact">
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon icon={['fas', 'info']} />
                                    </span>

                                    <span>Legal notice</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink href="/contact">
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon
                                            icon={['fas', 'address-book']}
                                        />
                                    </span>

                                    <span>Contact me</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href="http://192.168.178.33:3000/"
                                    target="_blank"
                                >
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon
                                            icon={['fas', 'table-columns']}
                                        />
                                    </span>

                                    <span>Goto project-dashboard</span>
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
