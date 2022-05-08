import { GetServerSideProps, NextPage } from 'next';
import {
    Button,
    Col,
    Container,
    Form,
    Row,
    Table,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import { getSession, useSession } from 'next-auth/react';
import Unauthenticated from '../../lib/Unauthenticated';
import { Build } from '../../js/types';
import { useState } from 'react';
import { getDatetimeISO, getDatetimeLocal } from '../../js/util';
import { useRouter } from 'next/router';

const Edit: NextPage<{
    build: Build;
}> = ({ build }) => {
    const [title, setTitle] = useState<string>(build.title || '');
    const [description, setDescription] = useState<string | null>(build.description);
    const [escName, setEscName] = useState<string>(build.escName || '');
    const [escLink, setEscLink] = useState<string>(build.escLink || '');
    const [fcName, setFcName] = useState<string>(build.fcName || '');
    const [fcLink, setFcLink] = useState<string>(build.fcLink || '');
    const [motorName, setMotorName] = useState<string>(build.motorName || '');
    const [motorLink, setMotorLink] = useState<string>(build.motorLink || '');
    const [frameName, setFrameName] = useState<string>(build.frameName || '');
    const [frameLink, setFrameLink] = useState<string>(build.frameLink || '');
    const [vtxName, setVtxName] = useState<string>(build.vtxName || '');
    const [vtxLink, setVtxLink] = useState<string>(build.vtxLink || '');
    const [antennaName, setAntennaName] = useState<string>(build.antennaName || '');
    const [antennaLink, setAntennaLink] = useState<string>(build.antennaLink || '');
    const [cameraName, setCameraName] = useState<string>(build.cameraName || '');
    const [cameraLink, setCameraLink] = useState<string>(build.cameraLink || '');
    const [receiverName, setReceiverName] = useState<string>(
        build.receiverName || ''
    );
    const [receiverLink, setReceiverLink] = useState<string>(
        build.receiverLink || ''
    );
    const [propellerName, setPropellerName] = useState<string>(
        build.propellerName || ''
    );
    const [propellerLink, setPropellerLink] = useState<string>(
        build.propellerLink || ''
    );
    const [showError, setShowError] = useState<boolean>(false);

    const router = useRouter();
    const { data: session, status } = useSession();
    const authenticated = status === 'authenticated';
    if (!authenticated) return <Unauthenticated />;

    const onSaveHandler = async () => {
        let modified = getDatetimeISO();
        let newBuild: Build = {
            id: build.id,
            username: build.username,
            title,
            description,
            escName,
            escLink,
            fcName,
            fcLink,
            motorName,
            motorLink,
            frameName,
            frameLink,
            vtxName,
            vtxLink,
            antennaName,
            antennaLink,
            cameraName,
            cameraLink,
            receiverName,
            receiverLink,
            propellerName,
            propellerLink,
            modified,
        };

        const res = await fetch('/api/builds/update', {
            method: 'POST',
            body: JSON.stringify(newBuild),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) router.push({ pathname: `/builds`, query: {} });
        else setShowError(true);
    };

    const onCloseHandler = async () => {
        router.push({ pathname: `/builds`, query: {} });
    };

    const onDeleteHandler = async () => {
        const res = await fetch('/api/builds/remove', {
            method: 'POST',
            body: JSON.stringify({ id: build.id }),
        });

        if (res.ok) router.push({ pathname: `/builds`, query: {} });
        else setShowError(true);
    };

    return (
        <Container>
            <h1>
                <span>Editing: </span>
                <b className="build-title">{build.title}</b>
            </h1>

            <small className="text-muted">
                Last modified: <b>{getDatetimeLocal(build.modified)}</b>
            </small>

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
                            required
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
                            value={description || ''}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Col>
                </Form.Group>

                <Table responsive>
                    <thead>
                        <tr>
                            <th></th>

                            <th>Name</th>

                            <th>Link</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>
                                <b>ESC</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={escName}
                                    onChange={(e) => setEscName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={escLink}
                                    onChange={(e) => setEscLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>FC</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={fcName}
                                    onChange={(e) => setFcName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={fcLink}
                                    onChange={(e) => setFcLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Motor</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={motorName}
                                    onChange={(e) => setMotorName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={motorLink}
                                    onChange={(e) => setMotorLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Frame</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={frameName}
                                    onChange={(e) => setFrameName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={frameLink}
                                    onChange={(e) => setFrameLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>VTX</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={vtxName}
                                    onChange={(e) => setVtxName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={vtxLink}
                                    onChange={(e) => setVtxLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Camera</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={cameraName}
                                    onChange={(e) => setCameraName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={cameraLink}
                                    onChange={(e) => setCameraLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Antenna</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={antennaName}
                                    onChange={(e) => setAntennaName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={antennaLink}
                                    onChange={(e) => setAntennaLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Receiver</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={receiverName}
                                    onChange={(e) => setReceiverName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={receiverLink}
                                    onChange={(e) => setReceiverLink(e.target.value)}
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <b>Propellers</b>
                            </td>

                            <td>
                                <Form.Control
                                    value={propellerName}
                                    onChange={(e) =>
                                        setPropellerName(e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={propellerLink}
                                    onChange={(e) =>
                                        setPropellerLink(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="text-end">
                    <Button
                        variant="success"
                        className="me-2"
                        onClick={onSaveHandler}
                    >
                        Save
                    </Button>

                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={onCloseHandler}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        className="me-2"
                        onClick={onDeleteHandler}
                    >
                        Delete
                    </Button>
                </div>
            </Form>

            <ToastContainer position="middle-center">
                <Toast
                    show={!!showError}
                    onClose={() => setShowError(false)}
                    bg={'danger'}
                >
                    <Toast.Header>
                        <strong className="me-auto">Warning</strong>
                    </Toast.Header>

                    <Toast.Body>Something went wrong!</Toast.Body>
                </Toast>
            </ToastContainer>
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
    const res = await fetch(process.env.NEXTAUTH_URL + '/api/builds/getById', {
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
