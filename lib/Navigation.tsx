import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from 'react-bootstrap';
import {
    Nav,
    Navbar,
    Offcanvas,
    Container,
    NavDropdown,
    Image,
    Form,
} from 'react-bootstrap';

export default function Navigation() {
    const { data: session, status } = useSession();
    const authenticated = status === 'authenticated';

    return (
        <Navbar expand="lg" variant="dark" className="my-navigation">
            <Container>
                <Navbar.Brand href="/">RC-Manager</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Manage" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                <span>(🏠)</span> - Home
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/builds">
                                <span>(🛠️)</span> - Manage your own builds
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/places">
                                <span>(🗺️)</span> - Look up your places
                            </NavDropdown.Item>

                            <NavDropdown.Item href="/batteries">
                                <span>(🔋)</span> - Review your LiPo-batteries
                            </NavDropdown.Item>

                            {/* <NavDropdown.Divider /> */}
                        </NavDropdown>

                        {/* <Nav.Link href="#link">Link</Nav.Link> */}
                    </Nav>

                    <Form className="d-flex">
                        {!authenticated && (
                            <Button onClick={() => signIn()}>Login</Button>
                        )}
                        {authenticated && (
                            <Button onClick={() => signOut()}>Logout</Button>
                        )}
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
