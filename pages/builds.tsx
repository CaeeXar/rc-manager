import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import { Button, Card, CloseButton, Col, Container, FormControl, InputGroup, Modal, Row } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { getSession, useSession } from 'next-auth/react';
import Unauthenticated from '../lib/Unauthenticated';
import { Build } from '../js/types';

const Builds: NextPage<{ builds: Build[] }> = ({ builds }) => {
    const { data: session, status } = useSession();
    const authorized = status === 'authenticated';

    const [filteredBuilds, setFilteredBuilds] = useState(builds);
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Build | null>(null);

    const handleClose = () => setShow(false);

    const onBuildSelection = (build: Build) => {
        setSelected(build);
        setShow(true);
    }

    const prepare = (s: string) => {
        if (!s) return '';
        return s.toLowerCase().replace(/[\/\\#,+()$~%.:*?<>{}-]/gm, '');
    }

    const search = (input: string) => {
        setFilteredBuilds(
            builds.filter((build: Build) => {
                let buildString = Object.values(build).map(value => '' + value).join(' ');
                return prepare(buildString).includes(prepare(input));
            })
        );

    };

    if (!authorized) return <Unauthenticated />;

    return (
        <Container>
            <h1 className='title'>Manage your own builds!</h1>

            <div>
                <InputGroup style={{ marginBottom: '25px' }}>
                    <FormControl type='text' placeholder='Search...' onChange={e => search(e.target.value)} />
                    <Button>
                        <FontAwesomeIcon icon={faAdd} />
                    </Button>
                </InputGroup>

                <SimpleBar forceVisible='y' autoHide={false}>
                    <Row className='g-2'>
                        {filteredBuilds.map((build: Build) =>
                        (<Col sm='6' md='6' key={build.id}>
                            <Card onClick={e => onBuildSelection(build)}>
                                <Card.Body>
                                    <Card.Title>{build.title}</Card.Title>

                                    <Card.Text>
                                        {build.description}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>)
                        )}
                    </Row>
                </SimpleBar>
            </div>

            {!!selected ?
                <Modal show={show} onHide={handleClose} size='lg'>
                    <Modal.Header >
                        <Modal.Title>{selected.title}</Modal.Title>
                        <CloseButton variant='white' onClick={handleClose} />
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{ marginBottom: '10px' }}>
                            <b>Description:</b>
                            {selected.description}
                        </div>

                        <div>
                            <b>Specifications:</b>

                            <ul>
                                <li>
                                    <b>ESC:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.escLink}>
                                        {selected.escName}
                                    </a>
                                </li>

                                <li>
                                    <b>FC:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.fcLink}>
                                        {selected.fcName}
                                    </a>
                                </li>

                                <li>
                                    <b>Motor:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.motorLink}>
                                        {selected.motorName}
                                    </a>
                                </li>

                                <li>
                                    <b>Frame:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.frameLink}>
                                        {selected.frameName}
                                    </a></li>
                                <li>
                                    <b>VTX:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.vtxLink}>
                                        {selected.vtxName}
                                    </a>
                                </li>

                                <li>
                                    <b>Camera:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.cameraLink}>
                                        {selected.cameraName}
                                    </a>
                                </li>

                                <li>
                                    <b>Antenna/s:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.antennaLink}>
                                        {selected.antennaName}
                                    </a>
                                </li>

                                <li>
                                    <b>Receiver:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.receiverLink}>
                                        {selected.receiverName}
                                    </a>
                                </li>

                                <li>
                                    <b>Propellers:{' '}</b>

                                    <a target='_blank' rel='noopener noreferrer' href={selected.propellerLink}>
                                        {selected.propellerName}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>
                </Modal> : null}
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    if (!session) return { props: {} };
    const username = session.user?.name;

    const res = await fetch(process.env.NEXTAUTH_URL + '/api/builds', {
        method: 'POST',
        body: JSON.stringify({ username }),
    });

    const data = await res.json();
    const builds: Build[] = data.builds;

    return {
        props: {
            builds: builds,
        },
    }
};

export default Builds;