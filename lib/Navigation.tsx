import { Nav, Navbar, Offcanvas, Container } from "react-bootstrap";

export default function Navigation() {
    return (
        <div className="sidebar">
            <Navbar expand={false} variant="dark">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navSidebar" />

                    <Navbar.Offcanvas id="navSidebar">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>RC-Manager</Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">(😊) - Home</Nav.Link>
                                <Nav.Link href="/builds">(Builds) - Manage your own builds</Nav.Link>
                                <Nav.Link>(Rates) - Configure your rates</Nav.Link>
                                <Nav.Link>(Battery) - Review your LiPo-batteries</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </div>
    );
};