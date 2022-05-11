import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import {
    Button,
    CloseButton,
    Col,
    Container,
    FormControl,
    InputGroup,
    Modal,
    Row,
    Table,
    Toast,
    ToastContainer,
} from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import { getSession } from 'next-auth/react';
import { Battery } from '../../js/types';
import {
    getBatteryTypeText,
    getDateDiff,
    getDatetimeLocal,
    prepareTextSearch,
} from '../../js/util';
import { useRouter } from 'next/router';

type Age = {
    days?: number;
    months?: number;
};

const Builds: NextPage<{ batteries: Battery[] }> = ({ batteries }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Battery | null>(null);
    const [filteredBatteries, setFilteredBatteries] = useState<Battery[]>(batteries);
    const [age, setAge] = useState<Age | null>(null);
    const [showError, setShowError] = useState<boolean>(false);

    const search = (input: string) => {
        setFilteredBatteries(
            batteries.filter((battery: Battery) => {
                let batteryString =
                    Object.values(battery)
                        .map((value) => '' + value)
                        .join(' ') + getDatetimeLocal(battery.created);
                return prepareTextSearch(batteryString).includes(
                    prepareTextSearch(input)
                );
            })
        );
    };

    const onShowHandler = (battery: Battery) => {
        setSelected(battery);
        setShow(true);
    };

    const refreshPage = () => {
        router.reload();
    };

    const onRemoveHandler = async () => {
        if (!selected) return;

        const res = await fetch('/api/batteries/remove', {
            method: 'POST',
            body: JSON.stringify({ id: selected.id }),
        });

        if (res.ok) refreshPage();
        else setShowError(true);
    };

    const onEditHandler = async () => {
        if (!selected) return;
        router.push({ pathname: `/batteries/[id]`, query: { id: selected.id } });
    };

    const onAddHandler = async () => {
        router.push({ pathname: `/batteries/new`, query: {} });
    };

    useEffect(() => {
        const calcAge = (): Age => {
            if (!selected || !selected.created) return {};
            const days = getDateDiff(new Date(selected.created));

            // if age is >= than one month - display only months
            if (days >= 30) return { months: days / 30 };
            return { days };
        };

        setAge(calcAge());
    }, [selected]);

    return (
        <Container>
            <h1 className="title">Manage your LiPo-batteries!</h1>

            <InputGroup style={{ marginBottom: '25px' }}>
                <FormControl
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => search(e.target.value)}
                />
                <Button onClick={onAddHandler}>
                    <FontAwesomeIcon icon={['fas', 'add']} />
                </Button>
            </InputGroup>

            <div className="battery">
                <SimpleBar forceVisible="y" autoHide={false}>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Brand</th>
                                <th>Cells</th>
                                <th>Capacity</th>
                                <th>Date</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredBatteries.map((battery: Battery) => {
                                return (
                                    <tr
                                        key={battery.id}
                                        onClick={() => onShowHandler(battery)}
                                    >
                                        <td>{battery.brand}</td>
                                        <td>{battery.cells}</td>
                                        <td>{battery.capacity.toLocaleString()}</td>
                                        <td>{getDatetimeLocal(battery.created)}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </SimpleBar>
            </div>

            {!!selected && !!age ? (
                <Modal show={show} onHide={() => setShow(false)} size="lg">
                    <Modal.Header>
                        <Modal.Title>
                            <b>
                                #{selected.id} - {selected.brand}
                            </b>
                        </Modal.Title>

                        <CloseButton
                            variant="white"
                            onClick={() => setShow(false)}
                        />
                    </Modal.Header>

                    <Modal.Body>
                        <div>
                            <span className="h5">Description:</span>

                            <p>{selected.description}</p>
                        </div>

                        <div>
                            <span className="h5">Information:</span>

                            <ul className="list-unstyled">
                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">Brand:</b>
                                        </Col>

                                        <Col>
                                            <span>{selected.brand}</span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">Battery-type:</b>
                                        </Col>

                                        <Col>
                                            <span>
                                                {getBatteryTypeText(
                                                    selected.batteryType
                                                )}
                                            </span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">Cells:</b>
                                        </Col>

                                        <Col>
                                            <span>{selected.cells}</span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">Capacity:</b>
                                        </Col>

                                        <Col>
                                            <span>
                                                {selected.capacity.toLocaleString()}
                                            </span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">First bought:</b>
                                        </Col>

                                        <Col>
                                            <span>
                                                {getDatetimeLocal(selected.created)}
                                            </span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">
                                                Age (in{' '}
                                                {!!age.days ? 'days' : 'months'}
                                                ):
                                            </b>
                                        </Col>

                                        <Col>
                                            <span>
                                                {(!!age.days
                                                    ? age.days
                                                    : age.months
                                                )?.toFixed()}
                                            </span>
                                        </Col>
                                    </Row>
                                </li>

                                <li>
                                    <Row>
                                        <Col xs="6" sm="5" md="4" lg="3">
                                            <b className="spacer">Buy:</b>
                                        </Col>

                                        <Col>
                                            <a
                                                target="_blank"
                                                rel="noreferrer"
                                                href={selected.link || ''}
                                            >
                                                click here
                                            </a>
                                        </Col>
                                    </Row>
                                </li>
                            </ul>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <div>
                            <b>Edited: </b>

                            <span>{getDatetimeLocal(selected.modified)}</span>
                        </div>

                        <div>
                            <Button className="me-2" onClick={onEditHandler}>
                                <FontAwesomeIcon icon={['fas', 'edit']} />
                            </Button>

                            <Button variant="danger" onClick={onRemoveHandler}>
                                <FontAwesomeIcon icon={['fas', 'trash']} />
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            ) : null}

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
    if (!session) return { props: {} };
    const username = session.user?.name;

    const res = await fetch(process.env.NEXTAUTH_URL + '/api/batteries/get', {
        method: 'POST',
        body: JSON.stringify({ username }),
    });

    const data = await res.json();
    const batteries: Battery[] = data.batteries;

    return {
        props: {
            batteries: batteries,
        },
    };
};

export default Builds;
