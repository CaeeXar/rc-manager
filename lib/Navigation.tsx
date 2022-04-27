import { Nav, Navbar, Offcanvas, Container } from "react-bootstrap";

export default function Navigation() {
    return (
        <div className="sidebar">
            <Navbar expand={false} variant="dark">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navSidebar" />

                    <Navbar.Offcanvas id="navSidebar">
                        <Offcanvas.Header closeButton>
                            <div style={{ width: "100%" }}>
                                <Offcanvas.Title>RC-Manager</Offcanvas.Title>
                            </div>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">
                                    <span>(🏠)</span> - Home
                                </Nav.Link>

                                <Nav.Link href="/builds">
                                    <span>(🛠️)</span> - Manage your own builds
                                </Nav.Link>

                                <Nav.Link>
                                    <span>(🎮)</span> - Configure your rates
                                </Nav.Link>

                                <Nav.Link>
                                    <span>(🔋)</span> - Review your LiPo-batteries
                                </Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div >
    );
};