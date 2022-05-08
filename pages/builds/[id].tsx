import { GetServerSideProps, NextPage } from 'next';
import { Col, Container, Form, Row, Table } from 'react-bootstrap';
import { getSession, useSession } from 'next-auth/react';
import Unauthenticated from '../../lib/Unauthenticated';
import { Build } from '../../js/types';
import { useState } from 'react';

const Edit: NextPage<{
    build: Build;
}> = ({ build }) => {
    if (!build) return <>Error</>;

    const [title, setTitle] = useState<string>(build.title);
    const [description, setDescription] = useState<string | null>(build.description);

    const { data: session, status } = useSession();
    const authorized = status === 'authenticated';
    if (!authorized) return <Unauthenticated />;

    return (
        <Container>
            <h1>
                <span>Editing: </span>
                <b className="build-title">{build.title}</b>
            </h1>

            <hr className="title" />

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Title
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Description
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            as="textarea"
                            rows={2}
                            value={build.description}
                        />
                    </Col>
                </Form.Group>

                <Table responsive>
                    <tbody>
                        <tr>
                            <td>
                                <b>ESC:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>FC:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Motor:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Frame:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>VTX:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Camera:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Antenna:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Receiver:</b>
                            </td>

                            <td></td>
                        </tr>

                        <tr>
                            <td>
                                <b>Propellers:</b>
                            </td>

                            <td></td>
                        </tr>
                    </tbody>
                </Table>
            </Form>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const { id } = context.query;

    if (!session || !id)
        return {
            props: {},
        };

    const username = session.user?.name;
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/builds/getBuildById', {
        method: 'POST',
        body: JSON.stringify({
            username,
            id: +id,
        }),
    });
    const build: Build = await res.json();

    return {
        props: {
            build,
        },
    };
};

export default Edit;
