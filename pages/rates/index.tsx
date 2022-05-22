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
import { Rate, RateType } from '../../js/types';
import { getDatetimeLocal, prepareTextSearch } from '../../js/util';
import { useRouter } from 'next/router';
var _ = require('lodash');

const Rates: NextPage<{ rates: Rate[]; rateTypes: RateType[] }> = ({
    rates,
    rateTypes,
}) => {
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

    const getColumnProp = (prop: keyof RateType) => {
        if (!selected) return null;
        let rt = rateTypes.find((rt) => rt.rateType === selected.rateType);
        return rt?.[prop];
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
                                        Rate-Type is{' '}
                                        <b>{getColumnProp('rateTitle')}.</b>
                                    </p>
                                </Col>
                            </Row>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th />

                                        <th className="number">
                                            {getColumnProp('rateFieldName1')}
                                        </th>

                                        <th className="number">
                                            {getColumnProp('rateFieldName2')}
                                        </th>

                                        <th className="number">
                                            {getColumnProp('rateFieldName3')}
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <tr>
                                        <td>
                                            <b>ROLL</b>
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('roll' +
                                                        getColumnProp(
                                                            'rateFieldValue1'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('roll' +
                                                        getColumnProp(
                                                            'rateFieldValue2'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('roll' +
                                                        getColumnProp(
                                                            'rateFieldValue3'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <b>PITCH</b>
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('pitch' +
                                                        getColumnProp(
                                                            'rateFieldValue1'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('pitch' +
                                                        getColumnProp(
                                                            'rateFieldValue2'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('pitch' +
                                                        getColumnProp(
                                                            'rateFieldValue3'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <b>YAW</b>
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('yaw' +
                                                        getColumnProp(
                                                            'rateFieldValue1'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('yaw' +
                                                        getColumnProp(
                                                            'rateFieldValue2'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>

                                        <td className="number">
                                            {parseFloat(
                                                (selected[
                                                    ('yaw' +
                                                        getColumnProp(
                                                            'rateFieldValue3'
                                                        )) as keyof Rate
                                                ] || '0') as string
                                            ).toFixed(2)}
                                        </td>
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

    const res1 = await fetch(process.env.NEXTAUTH_URL + '/api/rates/getTypes', {
        method: 'GET',
    });
    const res2 = await fetch(process.env.NEXTAUTH_URL + '/api/rates/get', {
        method: 'POST',
        body: JSON.stringify({ username }),
    });

    const typesData = await res1.json();
    const ratesData = await res2.json();
    const rateTypes: RateType[] = typesData.rateTypes;
    const rates: Rate[] = ratesData.rates;

    return {
        props: {
            rates: rates,
            rateTypes: rateTypes,
        },
    };
};

export default Rates;
