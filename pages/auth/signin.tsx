import { GetStaticProps, NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEvent, useEffect, useState } from 'react';
import { Button, Container, Form, Toast, ToastContainer } from 'react-bootstrap';
import { useRouter } from 'next/router';

const usernameMismatch: string = `Username can only contain characters and numbers!`;

const Home: NextPage<{ callbackUrl: string }> = ({ callbackUrl }) => {
    const router = useRouter();
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | string[]>('');

    const matchUsername = () => !!username.toLowerCase().match(/^[a-z0-9]+$/);

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (!matchUsername()) {
            setErrorMessage(usernameMismatch);
            setShowError(true);
            return;
        }

        await signIn('credentials', {
            username,
            password,
            callbackUrl,
            redirect: true,
        });
    };

    // if the error-message from the query updates -> show it
    useEffect(() => {
        setErrorMessage(router.query.error || '');
    }, [router]);

    useEffect(() => {
        setShowError(!!errorMessage);
    }, [errorMessage]);

    return (
        <Container>
            <Form onSubmit={e => onSubmitHandler(e)}>
                <Form.Group className='mb-3'>
                    <Form.Label>Username</Form.Label>

                    <Form.Control
                        name='username'
                        placeholder='Enter username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className='mb-3' >
                    <Form.Label>Password</Form.Label>

                    <Form.Control
                        name='password'
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                <Form.Group>
                    <Button type='submit'>
                        Login
                    </Button>
                </Form.Group>
            </Form>

            <ToastContainer position='middle-center'>
                <Toast show={!!showError} onClose={() => setShowError(false)} bg={'danger'}>
                    <Toast.Header>
                        <strong className='me-auto'>Warning</strong>
                    </Toast.Header>

                    <Toast.Body>
                        {errorMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export const getStaticProps: GetStaticProps = () => {
    let callbackUrl: string = process.env.NEXTAUTH_URL || '';
    return {
        props: {
            callbackUrl,
        },
    };
};

export default Home;