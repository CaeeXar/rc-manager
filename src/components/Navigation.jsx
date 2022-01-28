import { Nav, Navbar, NavDropdown, Offcanvas, Container } from "react-bootstrap";

export default function Navigation() {
    return (
        <div className="sidebar">
            <Navbar expand={false}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="navSidebar" />

                    <Navbar.Offcanvas id="navSidebar">
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="#action1">Home</Nav.Link>

                                <Nav.Link href="#action2">Link</Nav.Link>

                                <NavDropdown title="my dropdown">
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>

                                    <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>

                                    <NavDropdown.Divider />

                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
};