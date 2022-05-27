import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Image, NavLink, Row } from 'react-bootstrap';

export default function PageFooter() {
    return (
        <footer className="pt-3 footer text-center">
            <Container fluid>
                <Row>
                    <Col className="text-center" xs="12" sm="6" md="6" lg="4">
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

                                    <span> Visit my Instagram</span>
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

                                    <span> Check out my other projects</span>
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

                                    <span> Join my discord-server</span>
                                </NavLink>
                            </li>
                        </ul>

                        {/* <hr /> */}
                    </Col>

                    <Col className="text-center" xs="12" sm="6" md="6" lg="4">
                        <span className="text-uppercase h5">Other</span>

                        <ul className="list-unstyled">
                            <li>
                                <NavLink href="/contact">
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon icon={['fas', 'info']} />
                                    </span>

                                    <span> Legal notice</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink href="/contact">
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon
                                            icon={['fas', 'address-book']}
                                        />
                                    </span>

                                    <span> Contact me</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    href="https://project-dashboard-samuelerd.pitunnel.com/"
                                    target="_blank"
                                >
                                    <span className="icon-spacer">
                                        <FontAwesomeIcon
                                            icon={['fas', 'table-columns']}
                                        />
                                    </span>

                                    <span> Goto project-dashboard</span>
                                </NavLink>
                            </li>
                        </ul>

                        {/* <hr /> */}
                    </Col>

                    <Col xs="12" sm="12" md="12" lg="3">
                        <span
                            className="text-uppercase h5 w-100"
                            style={{ float: 'left' }}
                        >
                            Fly safe!
                        </span>

                        <Image
                            src="/drone.svg"
                            alt="RCM-Logo"
                            className="footer-logo"
                            fluid
                        />
                    </Col>
                </Row>

                <Row className="footer-app-info mt-3 mb-3">
                    <Col xs={12} sm={7} md={6}>
                        ©2022 - All rights reserved by <b>Caesar</b>
                    </Col>

                    <Col xs={12} sm={5} md={6}>
                        Version: <b>v{process.env.NEXT_PUBLIC_APP_VERSION}</b>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}
