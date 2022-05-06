import { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next';
import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { Button, Container, Form, Toast, ToastContainer } from 'react-bootstrap';

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = ({ callbackUrl }) => {
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const matchUsername = () => !!username.toLowerCase().match(/^[a-z0-9]+$/);

    const onSubmitHandler = async (event: FormEvent) => {
        event.preventDefault();

        if (!matchUsername()) {
            setError(true);
            return;
        }

        const res = await signIn('credentials', {
            username,
            password,
            callbackUrl,
            redirect: true,
        });
    };

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
                <Toast show={error} onClose={() => setError(false)} bg={'danger'}>
                    <Toast.Header>
                        <strong className="me-auto">Warning</strong>
                    </Toast.Header>

                    <Toast.Body>
                        Username can only contain characters and numbers!
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export const getStaticProps: GetStaticProps = () => {
    return {
        props: {
            callbackUrl: process.env.NEXTAUTH_URL,
        },
    };
};

export default Home;