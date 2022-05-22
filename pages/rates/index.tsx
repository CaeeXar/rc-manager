import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps, NextPage } from 'next';
import { useState } from 'react';
import {
    Button,
    Card,
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
import { Rate } from '../../js/types';
import { getDatetimeLocal, prepareTextSearch } from '../../js/util';
import { useRouter } from 'next/router';
import { RatePropsByType } from '../../js/const';
var _ = require('lodash');

const Rates: NextPage<{ rates: Rate[] }> = ({ rates }) => {
    const router = useRouter();
    const [show, setShow] = useState(false);
    const [selected, setSelected] = useState<Rate | null>(null);
    const [filteredRates, setFilteredRates] = useState<Rate[]>(rates);
    const [showError, setShowError] = useState<boolean>(false);

    const search = (input: string) => {
        setFilteredRates(
            rates.filter((rate: Rate) => {
                let rateString =
                    Object.values(rate)
                        .map((value) => '' + value)
                        .join(' ') + getDatetimeLocal(rate.modified);
                return prepareTextSearch(rateString).includes(
                    prepareTextSearch(input)
                );
            })
        );
    };

    const onShowHandler = (rate: Rate) => {
        setSelected(rate);
        setShow(true);
    };

    const refreshPage = () => {
        router.reload();
    };

    const onRemoveHandler = async () => {
        if (!selected) return;

        const res = await fetch('/api/rates/remove', {
            method: 'POST',
            body: JSON.stringify({ id: selected.id }),
        });

        if (res.ok) refreshPage();
        else setShowError(true);
    };

    const onEditHandler = async () => {
        if (!selected) return;
        router.push({ pathname: `/rates/[id]`, query: { id: selected.id } });
    };

    const onAddHandler = async () => {
        router.push({ pathname: `/rates/new`, query: {} });
    };

    return (
        <Container>
            <h1 className="title">Administer your rates!</h1>

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

            <div className="rate">
                <SimpleBar forceVisible="y" autoHide={false}>
                    <Row className="g-2">
                        {filteredRates.map((rate: Rate) => (
                            <Col sm="6" md="6" key={rate.id}>
                                <Card onClick={(e) => onShowHandler(rate)}>
                                    <Card.Body>
                                        <Card.Title>{rate.title}</Card.Title>

                                        <Card.Text>{rate.description}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </SimpleBar>
            </div>

            {!!selected ? (
                <Modal show={show} onHide={() => setShow(false)} size="lg">
                    <Modal.Header>
                        <Modal.Title>
                            <b>{selected.title}</b>
                        </Modal.Title>

                        <CloseButton
                            variant="white"
                            onClick={() => setShow(false)}
                        />
                    </Modal.Header>

                    <Modal.Body className="rate">
                        <div>
                            <span className="h5">Description:</span>

                            <p>{selected.description}</p>
                        </div>

                        <div>
                            <span className="h5">Information:</span>

                            <Row>
                                <Col>
                                    <p>
                                        Rate-Type is <b>{selected.rateType}.</b>
                                    </p>
                                </Col>
                            </Row>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th />

                                        <th>
                                            {
                                                RatePropsByType[selected.rateType]
                                                    .colName1
                                            }
                                        </th>

                                        <th>
                                            {
                                                RatePropsByType[selected.rateType]
                                                    .colName2
                                            }
                                        </th>

                                        <th>
                                            {
                                                RatePropsByType[selected.rateType]
                                                    .colName3
                                            }
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <b>ROLL</b>
                                        </td>

                                        {(
                                            RatePropsByType[selected.rateType]
                                                .roll as Array<keyof Rate>
                                        ).map((prop: keyof Rate) => {
                                            return (
                                                <td key={prop}>
                                                    {parseFloat(
                                                        '' + selected[prop]
                                                    ).toFixed(2)}
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    <tr>
                                        <td>
                                            <b>PITCH</b>
                                        </td>

                                        {(
                                            RatePropsByType[selected.rateType]
                                                .pitch as Array<keyof Rate>
                                        ).map((prop: keyof Rate) => {
                                            return (
                                                <td key={prop}>
                                                    {parseFloat(
                                                        '' + selected[prop]
                                                    ).toFixed(2)}
                                                </td>
                                            );
                                        })}
                                    </tr>

                                    <tr>
                                        <td>
                                            <b>YAW</b>
                                        </td>

                                        {(
                                            RatePropsByType[selected.rateType]
                                                .yaw as Array<keyof Rate>
                                        ).map((prop: keyof Rate) => {
                                            return (
                                                <td key={prop}>
                                                    {parseFloat(
                                                        '' + selected[prop]
                                                    ).toFixed(2)}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                </tbody>
                            </Table>
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

    const res = await fetch(process.env.NEXTAUTH_URL + '/api/rates/get', {
        method: 'POST',
        body: JSON.stringify({ username }),
    });

    const data = await res.json();
    const rates: Rate[] = data.rates;

    return {
        props: {
            rates: rates,
        },
    };
};

export default Rates;
