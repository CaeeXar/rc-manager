import {
    Nav,
    Navbar,
    Offcanvas,
    Container,
    NavDropdown,
    Image,
} from 'react-bootstrap';

export default function Navigation() {
    // return (
    //     <div className="sidebar">
    //         <Navbar expand={false} variant="dark">
    //             <Container fluid>
    //                 <Navbar.Toggle aria-controls="navSidebar" />

    //                 <Navbar.Offcanvas id="navSidebar">
    //                     <Offcanvas.Header closeButton>
    //                         <div style={{ width: "100%" }}>
    //                             <Offcanvas.Title>RC-Manager</Offcanvas.Title>
    //                         </div>
    //                     </Offcanvas.Header>

    //                     <Offcanvas.Body>
    //                         <Nav className="justify-content-end flex-grow-1 pe-3">
    //                             <Nav.Link href="/">
    //                                 <span>(🏠)</span> - Home
    //                             </Nav.Link>

    //                             <Nav.Link href="/builds">
    //                                 <span>(🛠️)</span> - Manage your own builds
    //                             </Nav.Link>

    //                             <Nav.Link>
    //                                 <span>(🎮)</span> - Configure your rates
    //                             </Nav.Link>

    //                             <Nav.Link>
    //                                 <span>(🔋)</span> - Review your LiPo-batteries
    //                             </Nav.Link>
    //                         </Nav>
    //                     </Offcanvas.Body>
    //                 </Navbar.Offcanvas>
    //             </Container>
    //         </Navbar>
    //     </div >
    // );

    return (
        <Navbar expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="/">RC-Manager</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="#link">Link</Nav.Link>

                        <NavDropdown title="Manage" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                <span>(🏠)</span> - Home
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/builds">
                                <span>(🛠️)</span> - Manage your own builds
                            </NavDropdown.Item>

                            <NavDropdown.Item href="">
                                <span>(🎮)</span> - Configure your rates
                            </NavDropdown.Item>

                            <NavDropdown.Item href="">
                                <span>(🔋)</span> - Review your LiPo-batteries
                            </NavDropdown.Item>

                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
