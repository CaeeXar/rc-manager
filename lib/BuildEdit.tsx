import { NextPage } from 'next';
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
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { Build } from '../js/types';
import { getDatetimeISO, getDatetimeLocal } from '../js/util';

const BuildEdit: NextPage<{
    build: Build;
    edit: boolean;
}> = ({ build, edit }) => {
    const [title, setTitle] = useState<string>(build.title);
    const [description, setDescription] = useState<string | null>(build.description);
    const [escName, setEscName] = useState<string>(build.escName);
    const [escLink, setEscLink] = useState<string | null>(build.escLink);
    const [fcName, setFcName] = useState<string>(build.fcName);
    const [fcLink, setFcLink] = useState<string | null>(build.fcLink);
    const [motorName, setMotorName] = useState<string>(build.motorName);
    const [motorLink, setMotorLink] = useState<string | null>(build.motorLink);
    const [frameName, setFrameName] = useState<string>(build.frameName);
    const [frameLink, setFrameLink] = useState<string | null>(build.frameLink);
    const [vtxName, setVtxName] = useState<string>(build.vtxName);
    const [vtxLink, setVtxLink] = useState<string | null>(build.vtxLink);
    const [antennaName, setAntennaName] = useState<string>(build.antennaName);
    const [antennaLink, setAntennaLink] = useState<string | null>(build.antennaLink);
    const [cameraName, setCameraName] = useState<string>(build.cameraName);
    const [cameraLink, setCameraLink] = useState<string | null>(build.cameraLink);
    const [receiverName, setReceiverName] = useState<string>(build.receiverName);
    const [receiverLink, setReceiverLink] = useState<string | null>(
        build.receiverLink
    );
    const [propellerName, setPropellerName] = useState<string>(build.propellerName);
    const [propellerLink, setPropellerLink] = useState<string | null>(
        build.propellerLink
    );
    const [showError, setShowError] = useState<boolean>(false);

    const router = useRouter();

    const onSaveHandler = async (event: FormEvent) => {
        event.preventDefault();
        event.stopPropagation();

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

        let apiUrl = edit ? '/api/builds/update' : '/api/builds/add';
        const res = await fetch(apiUrl, {
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
        if (!build || !build.id) {
            setShowError(true);
            return;
        }

        const res = await fetch('/api/builds/remove', {
            method: 'POST',
            body: JSON.stringify({ id: build.id }),
        });
        if (res.ok) router.push({ pathname: `/builds`, query: {} });
        else setShowError(true);
    };

    return (
        <Container>
            {edit ? (
                <div>
                    <h1>
                        <span>Editing: </span>
                        <b className="build-title">{build.title}</b>
                    </h1>

                    <small className="text-muted">
                        Last modified: <b>{getDatetimeLocal(build.modified)}</b>
                    </small>

                    <hr className="title" />
                </div>
            ) : (
                <div>
                    <h1>
                        <span>New</span>
                    </h1>

                    <hr className="title" />
                </div>
            )}

            <Form onSubmit={(e) => onSaveHandler(e)}>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm="2">
                        Title <span className="required">(*)</span>
                    </Form.Label>

                    <Col sm="10">
                        <Form.Control
                            type="text"
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

                            <th>
                                Name <span className="required">(*)</span>
                            </th>

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
                                    required
                                    onChange={(e) => setEscName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={escLink || ''}
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
                                    required
                                    onChange={(e) => setFcName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={fcLink || ''}
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
                                    required
                                    onChange={(e) => setMotorName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={motorLink || ''}
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
                                    required
                                    onChange={(e) => setFrameName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={frameLink || ''}
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
                                    required
                                    onChange={(e) => setVtxName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={vtxLink || ''}
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
                                    required
                                    onChange={(e) => setCameraName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={cameraLink || ''}
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
                                    required
                                    onChange={(e) => setAntennaName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={antennaLink || ''}
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
                                    required
                                    onChange={(e) => setReceiverName(e.target.value)}
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={receiverLink || ''}
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
                                    required
                                    onChange={(e) =>
                                        setPropellerName(e.target.value)
                                    }
                                />
                            </td>

                            <td>
                                <Form.Control
                                    value={propellerLink || ''}
                                    onChange={(e) =>
                                        setPropellerLink(e.target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </Table>

                <div className="text-end">
                    <Button variant="success" className="me-2" type="submit">
                        Save
                    </Button>

                    <Button
                        variant="secondary"
                        className="me-2"
                        onClick={onCloseHandler}
                    >
                        Cancel
                    </Button>

                    {edit && (
                        <Button
                            variant="danger"
                            className="me-2"
                            onClick={onDeleteHandler}
                        >
                            Delete
                        </Button>
                    )}
                </div>
            </Form>

            <ToastContainer position="middle-center" className="position-fixed">
                <Toast
                    show={!!showError}
                    onClose={() => setShowError(false)}
                    bg={'danger'}
                >
                    <Toast.Header>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>

                    <Toast.Body>Something went wrong!</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
};

export default BuildEdit;
