import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";

const wrongUsername: string = "Username can only contain characters and numbers!";
const validateUserName = (userName: string) => !!userName.match(/^[a-z0-9]+$/);

const Home: NextPage = () => {
    const { data: session, status } = useSession();
    const loggedIn = status === 'authenticated';

    const [userName, setUserName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleValidation = async () => {
        if (!validateUserName(userName)) {
            let newErrors = [...errors, wrongUsername];
            setErrors(newErrors);
            setShowError(true);
        }
        // TODO
    };

    const handleAlertClose = () => {
        setErrors([]);
        setShowError(false);
    }

    return (
        <Container>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>

                    <Form.Control
                        placeholder="Enter username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {/* <Form.Group style={{ textAlign: "right" }}> */}
                <Form.Group>
                    <Button onClick={handleValidation}>
                        Login
                    </Button>
                </Form.Group>
            </Form>

            <br />

            <Alert show={showError} variant="danger" onClose={handleAlertClose} dismissible>
                <Alert.Heading>Error!</Alert.Heading>
                {errors.map((error, idx) => <p key={idx}>{error}</p>)}
            </Alert>
        </Container>
    );
};

export default Home;